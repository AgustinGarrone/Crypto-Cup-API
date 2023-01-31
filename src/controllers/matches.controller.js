import mongoose from "mongoose";
import { challengeRoom } from "../models/challengeRoom.js";
import { friendlyPrediction } from "../models/friendlyPredictions.js";
import { Match } from "../models/matches.js"
import { User } from "../models/user.js";

export const getMatches = async (req, res) => {
    try {
        const matches = await Match.find().sort({ startDate : -1} ).lean();
        console.log(matches);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500)
    }
}

export const getComingMatches = async (req, res ) => {
    try {
        const timeNow = new Date().getTime()   //Dar mas tiempo para la creacion de rooms ?
        const matches = await Match.find(
            {startDate: {
                $gt: timeNow
                }
            }
        )
        res.status(200).json(matches)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getLiveMatches = async (req , res) => {
    try {
        const timeNow = new Date().getTime()
        const matches = await Match.find({ 
            $and : [
                { startDate :  {$lte : timeNow} } ,
                {  finishDate : { $gte : timeNow } }
            ] 
        }).lean()
        res.status(200).json(matches)
    } catch (error) {
        res.status(500)
    }
}

export const getFinishedMatches = async (req , res) => {
    try {
        const timeNow = new Date().getTime()
        console.log(timeNow);
        const matches = await Match.find({
            finishDate : {$lt : timeNow*1000} 
        })
        res.status(200).json(matches)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFileteredByDate = async (req,res) => {
   try {
        const dayInMs =  60 * 60 * 24 * 1 * 1000
        const {dateFilter1,dateFilter2} = req.body 

        // Filtro por fechas, partidos de un dia en particular o entre dos fechas.
        if (!dateFilter2) {
            const finalDateFilter = new Date(dateFilter1).getTime() + dayInMs 
            const matches = await Match.find({$and: [{ startDate: { $gte:new Date(dateFilter1)}}, {startDate: {$lt: new Date(finalDateFilter)}} ]})
                .sort({startDate:1});
            res.status(200).json(matches)
        } else {
            const finalDateFilter = new Date(dateFilter2).getTime() + dayInMs 
            const matches = await Match.find({$and: [{ startDate: {$gte:new Date(dateFilter1)}}, {startDate: {$lt: new Date(finalDateFilter)}} ]})
                .sort({startDate:1}); 
            res.status(200).json(matches)
        }

   } catch (error) {
        res.status(500)
   }
}

export const getFilteredByTeam = async (req,res) => {
    try {
        const {team} = req.params 
        console.log(team);
        const matches = await Match.find({ $or: [{team1:{ $regex: team, $options:'i' }} , {team2:{ $regex: team, $options:'i' }}] })
        res.status(200).json(matches)
    } catch (error) {
        res.status(500)
    }
}

export const chargeGame = async (req , res ) => {
    try {
        let { adminPass , team1 , team2 , round , startDate } = req.body
        if (adminPass != process.env.ADMIN_PASS) return res.status(401).json("error")

        const twoHoursMS = 7200000 
        const openTime = 57600000 //16hs in MS

        startDate = new Date(startDate).getTime()
        const finishDate = startDate + twoHoursMS
        const openPredictionDate = startDate - openTime


        await new Match({team1 , team2 , round , openPredictionDate , startDate , finishDate}).save()
        res.status(200).json("Success")
    } catch (error) {
        res.status(500).json(error)
    }
} 

export const setGameResult = async (req,res) => {
    try {
        const { adminPass , matchId , matchResult} = req.body
        if (adminPass != process.env.ADMIN_PASS) return res.status(401).json("error")

        //Checks
        const matchExists = await Match.findByIdAndUpdate(matchId , {matchResult})
        if (!matchExists) return res.json("Error. Match does not exists")

        await Match.findByIdAndUpdate(matchId , {result : matchResult})

        //Trae a los usuarios que predijeron correctamente 
        const predictions = await friendlyPrediction.aggregate(
            [
                {$match : {$and :
                    [
                        {prediction: matchResult },
                        {matchId: new mongoose.Types.ObjectId(matchId) }
                    ]}  
                } ,
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "address",
                        foreignField: "address",
                        as: "usuario"
                      }
                 } ,
                 {
                  $project: {
                      address:1,
                      matchId:1,
                      prediction:1,
                      claimed:1,
                      "usuario.address":1,
                      "usuario.inventory.tokenBalance":1,
                  }
                 } 
            ])

        //Actualiza a los usuarios que predijeron correctamente y les otorga tokens
        predictions.forEach(async (doc)=> {
            console.log(doc.usuario[0]);
            await User.findOneAndUpdate({address : doc.usuario[0].address }, {
                $inc : {"inventory.tokenBalance" : 20 }
            })  
        })
    

            //PAGA CHALLENGES ROOMS
        const challengesRooms = await challengeRoom.find( {matchId: new mongoose.Types.ObjectId(matchId) })
       
        challengesRooms.forEach(async (room) => {
            console.log(room);
            
           if (matchResult == room.opponentSelection) {
                await User.findOneAndUpdate({address : room.opponentAddress} , { $inc: {"inventory.tokenBalance" : room.tokensRoom * 2 } } )
            } else if (matchResult == room.ownerSelection) {
                await User.findOneAndUpdate({address : room.ownerAddress} , { $inc: {"inventory.tokenBalance" : room.tokensRoom * 2 } })
            }  
        })  

        return res.status(200).json("Success") 
    } catch (error) {
        res.status(500).json(error)
    }
}