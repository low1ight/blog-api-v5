import {body} from "express-validator";
import {fieldErrorMessages} from "./err-messages/err-messages";


const allPostFieldsArr:string[] = ["title","shortDescription","content"]


const [title,shortDescription,content] = allPostFieldsArr





export const postForBlogValidationMiddleware = [


    body(allPostFieldsArr)
        .exists().withMessage(fieldErrorMessages.dontExist)
        .isString().withMessage(fieldErrorMessages.wrongType('string'))
        .trim().notEmpty().withMessage(fieldErrorMessages.isEmpty),


    body(title)
        .isLength({ max: 30 }).withMessage(fieldErrorMessages.tooLong(30)),


    body(shortDescription)
        .isLength({ max: 100 }).withMessage(fieldErrorMessages.tooLong(100)),


    body(content)
        .isLength({ max: 1000 }).withMessage(fieldErrorMessages.tooLong(1000)),

]