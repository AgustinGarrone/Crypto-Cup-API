import { check } from "express-validator"
import { validateResult } from "../helpers/validateHelper.js"

export const validatorIniciarSesion = [
    check('address')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check('signature')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim(),
    check('message')
        .exists()
        .not()
        .isEmpty()
        .escape(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validatorCrearUsuario = [
    check('address')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isEthereumAddress(),
    check('username')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .trim()
        .isLength({min:3,max:12}) 
        .isString(),
    check('flag')
        .exists()
        .not()
        .isEmpty()
        .escape()
        .isLength({min:0,max:30})
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validatorChangeName = [
    check('address')
    .exists()
    .not()
    .isEmpty()
    .escape()
    .trim()
    .isEthereumAddress(),
check('username')
    .exists()
    .not()
    .isEmpty()
    .escape()
    .trim()
    .isLength({min:0,max:10})
    .isString()
]

