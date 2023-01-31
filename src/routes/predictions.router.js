import { Router } from "express";
import {  placeBasicBet, placeBoostBet } from "../controllers/predictions.controller.js";
import {  placeFreeBet , getFreePredictionsAvailables , getFreePredictionsHistory} from "../controllers/freePredictions.controller.js";
import { requireToken } from "../middlewares/auth.mid.js";
import { validatorFriendlyPredicts, validatorPlacePredicts } from "../validators/predictions.validator.js";


const router = Router();

router.get('/getFreePredictions' , requireToken, getFreePredictionsAvailables);
router.get('/getFreePredictionsHistory' , requireToken , getFreePredictionsHistory)
router.post('/placeFreeBet/:matchId' ,  requireToken, /* validator*/ placeFreeBet)
router.post('/placeBasicBet/:matchId'  , validatorPlacePredicts ,placeBasicBet)
router.post('/placeBoostBet/:matchId' , validatorPlacePredicts , placeBoostBet)


export default router;