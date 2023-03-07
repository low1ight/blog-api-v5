import jwt from 'jsonwebtoken'
import {settings} from "../settings";


export const jwtService = {


    async createJwt(userId:string) {

        const jwtToken = jwt.sign({userId}, settings.JWT_SECRET, { expiresIn: '1h' });

        return { accessToken:jwtToken }


    },

    async getUserIdByJwt(token:string) {
        try {
            const result:any = jwt.verify(token,settings.JWT_SECRET)

            return result.userId
        }
        catch {
            return null
        }

    }
}