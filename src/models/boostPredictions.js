import mongoose from "mongoose";

const predictionSchema=new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"tickets",
        required:true,
        unique:false
    },
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
    result: {
        type: String,
        required: false,
        trim: true
    }
});

export const boostPrediction = new mongoose.model("boostPredictions", predictionSchema);