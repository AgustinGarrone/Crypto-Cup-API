import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validatorBuyBoosts = [
    check('address')  
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check('amount')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isInt(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]