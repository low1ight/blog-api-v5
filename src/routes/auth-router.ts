import {Router,Response} from "express";
import {RequestWithParams} from "../request-types";
import {LoginInputModel} from "../models/auth/LoginInputModel";
import {userService} from "../domain/user-service";
import {authLoginValidatorMiddleware} from "../middlewares/validators/auth-login-validator-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";



export const authRouter = Router({})



authRouter.post('/login',authLoginValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParams<LoginInputModel>,res:Response) => {

    const isLoginSuccessful:boolean = await userService.checkCredentials(req.body.loginOrEmail,req.body.password)

    if(!isLoginSuccessful) return res.status(401).json("Wrong password or login")

     return res.sendStatus(204)

})