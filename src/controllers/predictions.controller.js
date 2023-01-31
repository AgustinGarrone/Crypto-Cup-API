import mongoose from "mongoose"
import { basicPrediction } from "../models/basicPredictions.js"
import { boostPrediction } from "../models/boostPredictions.js"
import { friendlyPrediction } from "../models/friendlyPredictions.js"
import { Match } from "../models/matches.js"
import { Ticket } from "../models/tickets.js"
import { User } from "../models/user.js"



/* export const getPredictionsHistory = async (req, res) => {
    try {
  
        const address  = req.body.address.toLowerCase()

        const userExists = await User.findOne({ address }) 
        if (!userExists) return res.json("user does not exists.") 
        
        //Get user predictions history and final result of the related match
        const predictions = await friendlyPrediction.aggregate(
            [
                { $match : { address : address } },
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
    
 */

    //  VERSION CON ADDRESS 
/* export const getPredictionsAvailables = async (req,res) => {
    try {
        let address = req.body.address.toLowerCase()

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
                        from: "friendlypredictions",
                        localField: "_id",
                        foreignField: "matchId",
                        as: "PrediccionesMatcheadas"
                      }
                 }  ,
                 {
                   $match: {
                        "PrediccionesMatcheadas.address": {$ne :address}
                   }
                 }
            ]
        ); 
 
        return res.json(matches)
    } catch (error) {
        return res.status(500).json(error)
    }
}  */


export const placeBasicBet = async (req,res) => {
    try {
        const {matchId} = req.params
        const { ticketRef , prediction} = req.body
        
        const existPrediction = await basicPrediction.findOne({ ticketRef , matchId })
        if (existPrediction) return res.status(400).json({message: "prediction already made"})

        await new basicPrediction({ticketRef , matchId , prediction}).save()
        await Match.findByIdAndUpdate( matchId , { $inc : { predictionsAmount : 1}})
        return res.status(200).json("Prediction Succesfully Created.")
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const placeBoostBet = async (req,res) => {
    try {
        const {matchId} = req.params
        const { ticketRef , prediction} = req.body
        
        const existPrediction = await boostPrediction.findOne({ ticketRef , matchId })
        if (existPrediction) return res.status(400).json({message: "prediction already made"})

        await new boostPrediction({ticketRef , matchId , prediction}).save()
        await Match.findByIdAndUpdate( matchId , { $inc : { predictionsAmount : 1}})
        return res.status(200).json("Prediction Succesfully Created.")
    } catch (error) {
        return res.status(500).json(error)
    }
}
