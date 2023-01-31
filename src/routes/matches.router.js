import { Router } from "express";
import { getMatches, getFileteredByDate, getFilteredByTeam, getLiveMatches , setGameResult, chargeGame, getFinishedMatches, getComingMatches} from "../controllers/matches.controller.js";
import { validatorDateMatchs , validatorTeamMatchs } from "../validators/matchs.validator.js";


const router = Router();

router.get('/getMatches', getMatches);
router.get('/getComingMatches' , getComingMatches)
router.get('/getLiveMatches' , getLiveMatches)
router.get('/getFinishedMatches' , getFinishedMatches)
router.get('/getFileteredByDate', validatorDateMatchs ,getFileteredByDate)
router.get('/getFileteredByTeam/:team', validatorTeamMatchs ,getFilteredByTeam)
router.post('/setGameResult' ,setGameResult )
router.post('/chargeGame' , chargeGame) 
export default router;