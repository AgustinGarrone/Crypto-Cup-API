import mongoose from "mongoose";

const challengeRoomSchema = new mongoose.Schema({
    ownerAddress: {
        type: String,
        required: true ,
        unique : false
    } , 
    ownerUsername : {
        type: String,
        required: true ,
        unique : false
    },
    ownerSelection : {
        type:String , 
        required:true,
        unique:false
    } , 
    tokensRoom : {
        type : Number ,
        required : true ,
        unique : false
    } ,
    matchId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "matches",
        required: true
    } ,
    opponentAddress : {
        type : String , 
        required : false ,
        default: undefined 
    } , 
    opponentUsername : {
        type: String , 
        required:false ,
        default :undefined
    } ,
    opponentSelection : {
        type : String,
        required:false, 
        unique:false ,
        default:""
    },
    status : {
        type : String , 
        required : true ,
        default: "open"
    },
    timestamp:{
        type:Date,
        default: new Date()
    },
})

export const challengeRoom = mongoose.model('challengeRoom' , challengeRoomSchema)