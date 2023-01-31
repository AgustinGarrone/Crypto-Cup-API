import mongoose from "mongoose";

const predictionSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users" ,
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

export const freePredictions = new mongoose.model("freePredictions", predictionSchema);