import mongoose, { Mongoose } from "mongoose";
import { challengeRoom } from "../models/challengeRoom.js";
import { Match } from "../models/matches.js";
import { User} from "../models/user.js"

export const createRoom = async ( req , res ) => {
   try {
        const {ownerAddress , tokensRoom , matchId , ownerSelection } = req.body 
        const timeNow = new Date().getTime()

        //Validations
        const matchExists = await Match.findById( mongoose.Types.ObjectId(matchId))
        if (matchExists.startDate < timeNow) return res.status(400).json("Error. Match already finished")
        if (ownerSelection != matchExists.team1 && ownerSelection != matchExists.team2 && ownerSelection != "tie") return res.status(400).json("Error. Match does not exists")
        if (!matchExists) return res.status(400).json("Error. Match does not exists")

        const userExist = await User.findOne({ address : ownerAddress.toLowerCase() })
        if (!userExist) return res.status(400).json("Error. User does not exists.")

        if (userExist.inventory.tokenBalance < tokensRoom) return res.status(400).json("Error. You don't have tokens.")

        const challengeExist = await challengeRoom.findOne(
            { 
                $or : [
                        {ownerAddress , matchId: mongoose.Types.ObjectId(matchId)} ,
                        {opponentAddress : ownerAddress , matchId: mongoose.Types.ObjectId(matchId)}
                ]
            }
            )
        if (challengeExist) return res.status(400).json("Error. You already challenge the same match")

        //Update user balance
        const newUserBalance = userExist.inventory.tokenBalance - tokensRoom
        await User.updateOne({address : ownerAddress.toLowerCase() } , {"inventory.tokenBalance" : newUserBalance})
        
        //Create room
        await new challengeRoom({ownerAddress , ownerUsername : userExist.username , ownerSelection, tokensRoom , matchId  }).save() 
        res.status(200).json("Succesfull.")

   } catch (error) {
        return res.status(500).json(error)
   }

}

export const joinRoom = async ( req , res ) => {
    try {
        const {opponentAddress , opponentSelection ,challengeId } = req.body 

        //Validations
        const userExist = await User.findOne({ address : opponentAddress.toLowerCase() })
        if (!userExist) return res.status(400).json("Error. User does not exists.")

        let room = await challengeRoom.findById(mongoose.Types.ObjectId(challengeId))
        if (!room) return res.status(400).json("Error. Challenge does not exists.")
        if (room.status != "open") return res.status(400).json("Error. Challenge already finished.")
        if (room.opponentAddress) return res.status(400).json ("Error. Challenge full.")
        if (opponentAddress == room.ownerAddress) return res.status(400).json("Error. You are the room owner.")
        if (userExist.inventory.tokenBalance < room.tokensRoom) return res.status(400).json("Error. You don't have tokens.")

        const matchRelated = await Match.findById(mongoose.Types.ObjectId(room.matchId))
        if (opponentSelection != matchRelated.team1 && opponentSelection != matchRelated.team2 && opponentSelection != "tie") return res.status(400).json("Error. Match does not exists.")
        if (opponentSelection == room.ownerSelection) return res.status(400).json ("Error. Cant predict the same of the owner.")

        //Update user balance 
        const newUserBalance = userExist.inventory.tokenBalance - room.tokensRoom
        await User.updateOne({address : opponentAddress.toLowerCase() } , {"inventory.tokenBalance" : newUserBalance})
        //Update room
        await room.updateOne({opponentAddress , opponentSelection , opponentUsername: userExist.username , status : "close"})

        res.status(200).json("Succesfull.")
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Trae rooms open y llenas pero no terminadas
export const getRooms = async ( req , res ) => {
    try {
        const rooms = await challengeRoom.aggregate([
        {$match:{
            $or : [
                {
                    status:"open"        
                }, 
                {
                    status:"close"
                }

            ]
        }
           
        } ,
        {
            $lookup:
              {
                from: "matches",
                localField: "matchId",
                foreignField: "_id",
                as: "relatedMatch"
              }
         }
        ]
        
        )
        return res.json(rooms)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getRoom = async ( req , res ) => {
    try {
        const {roomId} = req.params
        const room = await challengeRoom.aggregate([
            {$match:
                {
                     "_id": mongoose.Types.ObjectId(roomId)
                }
            } ,
            {
                $lookup:
                  {
                    from: "matches",
                    localField: "matchId",
                    foreignField: "_id",
                    as: "relatedMatch"
                  }
             } 
            ]
        )
        return res.status(200).json(room)
    } catch (error) {
        return res.status(500).json(error)
    }
}