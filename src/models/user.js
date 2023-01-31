import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default: new Date()
    },
    address: {
        type: String,
        required: false,
        unique: false,
        default:undefined
    },
    email: {
        type: String,
        required:false,
        default:undefined ,
        unique:false,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    flag: {
        type: String,
        required: true,
        unique: false
    },
    freeLadderPoints: {
        type: Number,
        unique: false,
        default:0
    },
    inventory: {
        tokenBalance: {
            type: Number,
            required: true,
            unique: false,
            default:0
        },
        doubleBoosts: {
            type: Number,
            required: true,
            unique: false,
            default:0
        },
        tripleBoosts: {
            type: Number,
            required: true,
            unique: false,
            default:0
        },
        quintupleBoosts: {
            type: Number,
            required: true,
            unique: false,
            default:0
        },
    }
});

export const User = mongoose.model('user', userSchema);