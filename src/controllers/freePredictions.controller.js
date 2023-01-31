// Controller for friendly matches
import mongoose from "mongoose";
import { freePredictions } from "../models/freePrediction.js";
import { Match } from "../models/matches.js"
import { User } from "../models/user.js";


export const placeFreeBet = async (req,res) => {
    try {
        const {matchId} = req.params
        const {prediction} = req.body
        const userId = req.uid
        
        //Checks
        const matchExists = await Match.findById(mongoose.Types.ObjectId(matchId))
        if (!matchExists) return res.json("Error. Match does not exists")
        if (prediction != matchExists.team1 && prediction != matchExists.team2 && prediction !="tie") return res.json("Error. Match does not exists")
        const userExists = await User.findById(userId).lean()
        if (!userExists) return res.status(404).json("Error. User does not exists.")
        const existPrediction = await freePredictions.findOne({ userId , matchId })
            //Va code 400 pero tira error y no deja interactuar con el front correctamente al haber un error. Lo dejo asi x beta. IMPORT ACTUALIZAR FRONT
        if (existPrediction) return res.status(400).json( "prediction already made")

        await new freePredictions({userId , matchId , prediction}).save()
        await Match.findByIdAndUpdate( matchId , { $inc : { predictionsAmount : 1}})
        return res.status(200).json("Prediction Succesfully Created.")
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const getFreePredictionsAvailables = async (req,res) => {
    try {
        const userId = req.uid 

        const actualTime = new Date().getTime()

        // Get matches that are open to bet and where the user has not bet yet using joins.
        const matches = await Match.aggregate(
            [
                {$match : {$and :
                    [
                        {openPredictionDate: {$lte : actualTime } },
                        {startDate: { $gt: actualTime } }
                    ]}  
                } ,
                {
                    $lookup:
                      {
                        from: "freepredictions",
                        localField: "_id",
                        foreignField: "matchId",
                        as: "PrediccionesMatcheadas"
                      }
                 }  ,
                 {
                   $match: {
                        "PrediccionesMatcheadas.userId": {$ne :mongoose.Types.ObjectId(userId)}
                   }
                 }
            ]
        ); 
 
        return res.json(matches)
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const getFreePredictionsHistory = async (req, res) => {
    try {
        const userId = req.uid

        const userExists = await User.findById(userId) 
        if (!userExists) return res.status(404).json("user does not exists.") 
        
        //Get user predictions history and final result of the related match
        const predictions = await freePredictions.aggregate(
            [
                { $match : { userId : mongoose.Types.ObjectId(userId) } },
                {
                  $lookup:
                    {
                      from: "matches",
                      localField: "matchId",
                      foreignField: "_id",
                      as: "relatedGame"
                    }
               } ,
               {
                $project: {
                    address:1,
                    matchId:1,
                    prediction:1,
                    claimed:1,
                    "relatedGame.result":1,
                    "relatedGame.startDate":1,
                    "relatedGame.team1":1,
                    "relatedGame.team2":1
                }
               } 
             ]
        ).sort({"relatedGame.startDate": -1});
        
        return res.json(predictions);
    } catch (error) {
        res.status(500).json(error)
    }
}
    


    //VIEJO CON ADDRESS
/* 
export const placeFriendlyBet = async (req,res) => {
    try {
        const {matchId} = req.params
        let { address , prediction} = req.body
        address = address.toLowerCase() 
            
        //Checks
        const matchExists = await Match.findById(mongoose.Types.ObjectId(matchId))
        if (!matchExists) return res.json("Error. Match does not exists")
        console.log(prediction);
        console.log(matchExists.team1);
        if (prediction != matchExists.team1 && prediction != matchExists.team2 && prediction !="tie") return res.json("Error. Match does not exists")
        const userExists = await User.findOne({address}).lean()
        if (!userExists) return res.json("Error. User does not exists.")
        const existPrediction = await friendlyPrediction.findOne({ address , matchId })
            //Va code 400 pero tira error y no deja interactuar con el front correctamente al haber un error. Lo dejo asi x beta
        if (existPrediction) return res.status(200).json( "prediction already made")

        await new friendlyPrediction({address , matchId , prediction}).save()
        await Match.findByIdAndUpdate( matchId , { $inc : { predictionsAmount : 1}})
        return res.status(200).json("Prediction Succesfully Created.")
    } catch (error) {
        return res.status(500).json({error})
    }
} 
 */

