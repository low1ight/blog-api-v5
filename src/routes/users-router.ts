import {Router,Response} from "express";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {usersValidationMiddleware} from "../middlewares/validators/users-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";


export const usersRouter = Router({})


usersRouter.get('/',authorizationMiddleware,(req:RequestWithQuery<any>,res:Response) => {

})



usersRouter.post('/',authorizationMiddleware,usersValidationMiddleware,inputValidationMiddleware,(req:RequestWithBody<any>,res:Response) => {

})



usersRouter.delete('/',authorizationMiddleware,(req:RequestWithParams<UriIdParamsModel>,res:Response) => {

})