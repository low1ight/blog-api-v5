import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {ObjectId} from "mongodb";


export const jwtService = {


    async createJwt(userId:string) {

        return jwt.sign({userId}, settings.JWT_SECRET, { expiresIn: '1h' });

    },

    async getUserIdByJwt(token:string) {
        try {
            const result:any = jwt.verify(token,settings.JWT_SECRET)
            //temp
            new ObjectId(result)

            return result.userId
        }
        catch {
            return null
        }

    }
}