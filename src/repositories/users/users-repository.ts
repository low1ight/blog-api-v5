import {CreateUserModel} from "../../models/users/CreateUserModel";
import {UserTypeForDb} from "../../models/users/UserType";
import {getDate} from "../../utils/getDate";
import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";


export const usersRepository = {


    async createUser({login,email,password}:CreateUserModel):Promise<string | null> {

        const newUser:UserTypeForDb = {
            login,
            email,
            password,
            createdAt:getDate()
        }


        let result = await usersCollection.insertOne(newUser)

        if (!result.insertedId) return null

        return result.insertedId.toString()

    },


    async deleteUser(id:string):Promise<boolean> {

        let result = await usersCollection.deleteOne({_id:new ObjectId(id)})

        return result.deletedCount === 1

    },


}