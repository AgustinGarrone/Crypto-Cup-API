import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validatorDateMatchs = [
    check('dateFilter1')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isDate(), 
    check('dateFilter2')
        .escape()
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validatorTeamMatchs = [
    check('team')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isString()
        .isLength({min:0 , max:20}),
        (req, res, next) => {
            validateResult(req, res, next)
        }
]