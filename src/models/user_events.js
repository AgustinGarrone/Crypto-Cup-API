import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        unique:false 
    },
    timestamp:{
        type:Date,
        default: new Date()
    },
    description: {
        type:String,
        required:true,
        unique:false
    },
    amount: {
        type:Number,
        required:true
    }
})



export const userEvents = model("User_Events", eventsSchema);