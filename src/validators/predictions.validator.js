import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validatorPlacePredicts = [
    check("ticketRef")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isMongoId(), 
    check("matchId")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
       .isMongoId(),
    check("prediction")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isString()
        .isLength({min:0,max:25}),
    (req, res, next) => {
        validateResult(req, res, next)
    } 
]
export const validatorFriendlyPredicts = [
    check("address")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check("matchId")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
       .isMongoId(),
    check("prediction")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isString()
        .isLength({min:0,max:25}),
    (req, res, next) => {
        validateResult(req, res, next)
    } 
]
