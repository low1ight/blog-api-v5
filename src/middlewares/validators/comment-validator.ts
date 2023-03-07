import {body} from "express-validator";
import {fieldErrorMessages} from "./err-messages/err-messages";


const commentFields:string[] = ['content']
const [comment] = commentFields




export const commentValidator = [
    body(commentFields)
        .exists().withMessage(fieldErrorMessages.dontExist)
        .isString().withMessage(fieldErrorMessages.wrongType('string'))
        .trim().notEmpty().withMessage(fieldErrorMessages.isEmpty),


    body(comment)
        .isLength({min:20}).withMessage(fieldErrorMessages.tooShort(20))
        .isLength({max:300}).withMessage(fieldErrorMessages.tooLong(300))


]