import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true,
        trim: true
    },
    team2: {
        type: String,
        required: true,
        trim: true
    },
    scoreTeam1: {
        type: Number,
        trim: true ,
        default : 0
    },
    scoreTeam2: {
        type: Number,
        trim: true , 
        default : 0
    },
    round: {
        type: String,
        required: true,
        trim: true
    },
    openPredictionDate: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    finishDate: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: false,
        default:"",
        trim: true
    },
    predictionsAmount: {
        type: Number,
        required: false,
        default:0
    }
});

//FALTA AGREGAR FECHAS DE INICIO, FINALIZACION , Y RESULTADO FINAL.

export const Match = mongoose.model("Match", matchSchema);