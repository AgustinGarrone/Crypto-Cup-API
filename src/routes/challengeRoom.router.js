import { Router } from "express";
import { createRoom, getRoom, getRooms, joinRoom } from "../controllers/challengeRoom.controller.js";
import { requireToken } from "../middlewares/auth.mid.js";
import { validatorCreateChallenge, validatorJoinRoom } from "../validators/challengeRoom.validator.js";

const router = Router()

router.post('/createRoom' , validatorCreateChallenge , requireToken ,createRoom) 
router.post('/joinRoom' , validatorJoinRoom , requireToken , joinRoom)
router.get('/getRooms' , getRooms)
router.get('/getRoom/:roomId' , getRoom)

export default router 