import { check , body } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validatorCreateChallenge = [
    body('ownerAddress', "Error. Connect your address to your profile")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check('tokensRoom')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .isInt(),
    check("matchId")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
       .isMongoId(),
    check('ownerSelection')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isString()
        .isLength({min:0 , max:20}),
    (req , res , next) => {
        validateResult(req , res , next)
    }
]
export const validatorJoinRoom = [
    check('opponentAddress')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check("challengeId")
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
       .isMongoId(),
    check('opponentSelection')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isString()
        .isLength({min:0 , max:20}),
    (req , res , next) => {
        validateResult(req , res , next)
    }
]
