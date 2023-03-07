import jwt from 'jsonwebtoken'
import {settings} from "../settings";


export const jwtService = {


    async createJwt(userId:string) {

        return jwt.sign({userId}, settings.JWT_SECRET, { expiresIn: '1h' });

    },

    async getUserIdByJwt(token:string) {
        try {
            const result:any = jwt.verify(token,settings.JWT_SECRET)

            return {accessToken:result.userId}
        }
        catch {
            return null
        }

    }
}