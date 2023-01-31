import { Ticket } from "../models/tickets.js";

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({user_owner: req.uid});
        return res.json(tickets);
    } catch ({error}) {
        return res.status(500).json({error:'Error del servidor.'});
    }
}

export const chargeTicket = async(req, res) => {
    try {
        const {ticketsId} = req.body;
        console.log(ticketsId);
        if (ticketsId != []) {
             for (let i=0; i < ticketsId.length; i++) {
                let previoTicket = await Ticket.findOne({ticketID:ticketsId[i]});  //Esto lo podemos hacer en un middleware que saque del array los id de tickets ya cargados.
                if (previoTicket) console.log(`El ticket ${ticketsId[i]} ya existe.`);
                if (!previoTicket) {
                    let ticket = new Ticket({ticketID:ticketsId[i], user_owner:req.uid});
                    await ticket.save();
                }
            } 
        }
        const tickets = await Ticket.find({user_owner: req.uid});
        return res.json(tickets);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:'Error del servidor.'});
    }
}

