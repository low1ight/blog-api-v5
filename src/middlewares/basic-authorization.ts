import {NextFunction, Request, Response} from "express";


export const basicAuthorization = (req:Request, res:Response, next:NextFunction) => {

    const encodedData = Buffer.from("admin:qwerty").toString('base64')
    const correctLoginData = `Basic ${encodedData}`

    if(req.headers.authorization !== correctLoginData) return res.sendStatus(401)

    next()

}