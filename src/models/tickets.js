import mongoose from "mongoose";


const { model, Schema } = mongoose;

const ticketSchema = Schema({
    ticketID: {
        type: Number,
        required: true,
        unique:true
    },
    points: {
        type : Number ,
        default:0 ,
        required:true
    }
});

export const Ticket = model("Ticket", ticketSchema);