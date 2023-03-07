import {Router, Response, Request} from "express";
import {RequestWithParams} from "../request-types";
import {LoginInputModel} from "../models/auth/LoginInputModel";
import {userService} from "../domain/user-service";
import {authLoginValidatorMiddleware} from "../middlewares/validators/auth-login-validator-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {UserType} from "../models/users/UserType";
import {jwtService} from "../application/jwt-service";
import {bearerAuthorization} from "../middlewares/bearer-authorization";
import {usersQueryRepository} from "../repositories/users/users-query-repository";




export const authRouter = Router({})



authRouter.post('/login',authLoginValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParams<LoginInputModel>,res:Response) => {

    const user:null | UserType = await userService.checkCredentials(req.body.loginOrEmail,req.body.password)

    if(!user) return res.status(401).json("Wrong password or login")

     const token = await jwtService.createJwt(user._id.toString())

     return res.status(200).json(token)

})

authRouter.get('/me', bearerAuthorization, async (req:Request,res:Response) => {

    const currentUserData = await usersQueryRepository.findCurrentUserForAuthMe(req.userId)

    if(!currentUserData) return res.sendStatus(404)

    return res.json(currentUserData)

})
