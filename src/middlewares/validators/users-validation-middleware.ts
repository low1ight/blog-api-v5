import {body} from "express-validator";
import {fieldErrorMessages} from "./err-messages/err-messages";
import {isLoginAvailable} from "./custom/isLoginAvailable";
import {isEmailAvailable} from "./custom/isEmailAvailable";


const usersFields:string[] = ["login","password","email"];

const [login,password,email] = usersFields



export const usersValidationMiddleware = [

    body(usersFields)
        .exists().withMessage(fieldErrorMessages.dontExist)
        .isString().withMessage(fieldErrorMessages.wrongType('string'))
        .trim().notEmpty().withMessage(fieldErrorMessages.isEmpty),


    body(login)
        .isLength({min:3}).withMessage(fieldErrorMessages.tooShort(3))
        .isLength({max:10}).withMessage(fieldErrorMessages.tooLong(10))
        .matches('^[a-zA-Z0-9_-]*$').withMessage(fieldErrorMessages.incorrectFieldFormat('login'))
        .custom(isLoginAvailable),


    body(password)
        .isLength({min:6}).withMessage(fieldErrorMessages.tooShort(6))
        .isLength({max:20}).withMessage(fieldErrorMessages.tooLong(20)),


    body(email)
        .matches("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").withMessage(fieldErrorMessages.incorrectFieldFormat('email'))
        .custom(isEmailAvailable),

]
