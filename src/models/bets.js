import mongoose from "mongoose";

const betSchema=new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "matches",
        required: true
    },    
    prediction: {
        type: String,
        required: true,
        trim: true
    },
    amount : {
        type: Number,
        required:true,
        unique:false
    },
    result: {
        type: String,
        required: false,
        trim: true
    }
});

export const Bets = new mongoose.model("bets", betSchema);