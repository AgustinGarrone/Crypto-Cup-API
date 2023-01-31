import mongoose from "mongoose";

const predictionSchema=new mongoose.Schema({
    address: {
        type: String,
        required: true
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
    }
});

export const friendlyPrediction = new mongoose.model("friendlyPredictions", predictionSchema);