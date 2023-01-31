import { Router } from "express";
import { chargeTicket, getTickets } from "../controllers/tickets.controller.js";
import { requireToken } from "../middlewares/auth.mid.js";


const router = Router();

router.get('/', requireToken, getTickets);  //Show all owner tickets
router.post('/', requireToken, chargeTicket)  //Charge tickets owner

export default router;