import {isIdValid} from "./custom/isIdValid";
import {param} from "express-validator";

export const idValidatorMiddleware =  param('id').custom(isIdValid)



