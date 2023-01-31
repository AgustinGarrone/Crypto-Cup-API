import { User } from "../models/user.js";
import Web3 from "web3";
import { generateRefreshToken, generateToken } from "../helpers/jwtManager.js";
import { changeNamePrice } from "../constants/prices.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


var web3 = new Web3(Web3.givenProvider || 'wss://fittest-solemn-wave.bsc.discover.quiknode.pro/e6ec1784345546d4425a828f0aad559800849ae8/');


export const createMetamaskUser = async (req, res) => {
    try {
        const {address, username, flag } = req.body;
        const user = await new User({address: address.toLowerCase(), username, flag}).save();

        
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(200).json({user , token , expiresIn})

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const createGoogleUser = async (req,res ) => {
    try {
        const { username, flag , email} = req.body;
        const user = await new User({ username, flag , email}).save();
        
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(200).json({user , token , expiresIn})

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


//Genera token de auth y token refresh.
export const metamaskLogin = async (req, res)=> {
   try {
        const {address} = req.body;
        const ONE_DAY_MS = 86400000 
       
        const user = await User.findOne({address});
        if (!user) return res.status(404).json("User does not exist."); 

        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);
    
        return res.status(200).json({user , token , expiresIn})

   } catch (error) {
        return res.status(500).json(error);
   }
}

export const googleLogin = async ( req , res) => {
    try {
        const {googleToken} = req.body 
        const {email} = jwt.decode(googleToken)
        console.log(email);
        const user = await User.findOne({email});
            //Si no existe retorna email para crear cuenta con el
        if (!user) return res.status(404).json(email); 

       
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(200).json({user , token , expiresIn})
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const connectAddress = async (req, res) => {
    try {
        const userId = req.uid 
        const address = req.body.address.toLowerCase()
        console.log(address)
        let user = await User.findOne({address : address}) 
        if (user) return res.status(400).json("Error . Address in use")
        user = await User.findById(mongoose.Types.ObjectId(userId))
        if (!user) return res.status(404).json("User not found.")

        await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId) , {address:address} ) 
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.status(200).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};


export const getUser = async(req, res) => {
    try {
        const user = await User.findById(mongoose.Types.ObjectId(req.uid)).lean();
        console.log(user);
        if (!user) return res.status(404).json("User not found.")
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error});
    }
}


export const logOut = (req, res) => {
   try {
        res.clearCookie("refreshToken")
        res.json({ok: true});
   } catch (error) {
        res.status(500)
   }
}

export const changeUsername = async (req,res) => {
    try {
        const {address , newName} = req.body
        const user = await User.findOne({address})

        if (!user) return res.status(400).json({ message: "User does not exist." });
        if (user.inventory.tokenBalance < changeNamePrice ) return res.status(400).json({ message: "Not enough tokens." }); 

        await User.findOneAndUpdate( {address} , {username: newName , $inc: {"inventory.tokenBalance" : - changeNamePrice } } )
        res.status(200).json({message: "Success."})
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
        console.log(error);
    }
}

