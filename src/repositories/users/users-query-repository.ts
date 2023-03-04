import {getPaginatedAndSortedResults} from "../common-functions/getPaginatedAndSortedResults";
import {UserQueryType} from "../../models/users/query/UserQueryType";
import {usersCollection} from "../../db/db";
import {arrToUserViewModel} from "../../mappers/users-mappers/arrToUserViewModel";
import {ObjectId} from "mongodb";
import {objToUserViewModel} from "../../mappers/users-mappers/objToUserViewModel";
import {UserType} from "../../models/users/UserType";


export const usersQueryRepository = {
    async getUsers(query:UserQueryType) {
        return await getPaginatedAndSortedResults(query,usersCollection,arrToUserViewModel,{})
    },


    async getUserById(id:string) {
        const foundUser: UserType | null = await usersCollection.findOne({_id:new ObjectId(id)})
        if(!foundUser) return false
        return objToUserViewModel(foundUser)
    },


    async findUserByEmailOrLogin(emailOrLogin:string) {
        return await usersCollection.findOne({ $or: [ {email:emailOrLogin}, {login:emailOrLogin} ] })
    }


}