import {Response,Request,NextFunction} from "express";
import {jwtService} from "../application/jwt-service";


export const bearerAuthorization = async (req:Request,res:Response,next:NextFunction) => {

    //if no auth data, response 401
    if(!req.headers.authorization) return res.sendStatus(401)

    const [authType,token] = req.headers.authorization.split(' ')

    if(authType && token && authType === 'Bearer') {

        const result  = await jwtService.getUserIdByJwt(token)

        if(result) {
            req.userId = result

            return next()
        }



    }

    return res.sendStatus(401)



}