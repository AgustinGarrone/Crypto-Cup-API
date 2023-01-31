import Web3 from "web3";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";


/* export const requireToken = async (req, res, next) => {
    var web3 = new Web3('wss://fittest-solemn-wave.bsc.discover.quiknode.pro/e6ec1784345546d4425a828f0aad559800849ae8/');
    
    const signature = req.body.signature;
    const user = req.body.address;

    if(!signature) return res.status(401).json({error:'Bad request: No signature Provided.'});
    if(Web3.utils.isAddress(user) === false) return res.status(401).json({error:'Bad request: Invalid User Address.'});

    const currBlock = await web3.eth.getBlockNumber();
    const { timestamp } = await web3.eth.getBlock(currBlock);

    const currentDayTimestamp = timestamp - (timestamp % 86400);
    console.log(currentDayTimestamp);

  

    const signatureValue = (await web3.eth.accounts.recover(currentDayTimestamp.toString(), signature)).toLowerCase();

    if(user.toLowerCase() != signatureValue.toLowerCase()) res.status(401).json({error:'Bad request: Invalid Signature Address.'});

    next();
      
} */

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No existe el token");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json(error);
    }
};

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("Token doesnt exists");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .send(error);
    }
};

export const setCookies = async (req , res , next) => {
    try {
        var web3 = new Web3('wss://fittest-solemn-wave.bsc.discover.quiknode.pro/e6ec1784345546d4425a828f0aad559800849ae8/');
        const currBlock = await web3.eth.getBlockNumber();
        const { timestamp } = await web3.eth.getBlock(currBlock);

        const currentDayTimestamp = timestamp - (timestamp % 86400);

        res.cookie("address", req.body.address, {
            httpOnly: true,
            secure: true, 
            sameSite: 'none', 
            expires: new Date(timestamp*1000) 
        });
        res.cookie("signature", req.body.signature , {
            httpOnly: true,
            secure: true, 
            sameSite: 'none', 
            expires: new Date(timestamp*1000) 
        }); 

        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

export const verifyUsername = async(req, res,next)=>{
    try {
        const {username} = req.body;
        console.log(username);
        let user = await User.findOne({username}).lean();
        if (user) return res.status(200).json("Username Already Registered.");;;
        console.log(user);
        next()
    
    } catch (error) {
        return res.status(500).json(error);
    }
}

