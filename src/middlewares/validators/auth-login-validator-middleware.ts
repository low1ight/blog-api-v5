import {body} from "express-validator";
import {fieldErrorMessages} from "./err-messages/err-messages";


const loginFields:string[] = ['loginOrEmail','password']

// temporary commented
//const [loginOrEmail,password] = loginFields

export const authLoginValidatorMiddleware = [

    body(loginFields)
        .exists().withMessage(fieldErrorMessages.dontExist)
        .isString().withMessage(fieldErrorMessages.wrongType('string'))
        .trim().notEmpty().withMessage(fieldErrorMessages.isEmpty),

]