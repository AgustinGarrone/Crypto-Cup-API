import { Router } from "express";
import { buyDoubleBoost, buyQuintupleBoost, buyTripleBoost } from "../controllers/store.controller.js";
import { validatorBuyBoosts } from "../validators/store.validator.js";

const router = Router();

router.post('/buyDoubleBoost', validatorBuyBoosts , buyDoubleBoost);
router.post('/buyTripleBoost', validatorBuyBoosts , buyTripleBoost);
router.post('/buyQuintupleBoost', validatorBuyBoosts , buyQuintupleBoost);

export default router;