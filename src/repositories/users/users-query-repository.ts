import {getPaginatedAndSortedResults} from "../_common-functions/getPaginatedAndSortedResults";
import {UserQueryType} from "../../models/users/query/UserQueryType";
import {usersCollection} from "../../db/db";
import {arrToUserViewModel} from "../../mappers/users-mappers/arrToUserViewModel";
import {ObjectId} from "mongodb";
import {objToUserViewModel} from "../../mappers/users-mappers/objToUserViewModel";
import {UserType} from "../../models/users/UserType";
import {toAuthMeModel} from "../../mappers/users-mappers/toAuthMeModel";
import {AuthMeUserModel} from "../../models/AuthMeUserModel";
import {ViewUserModel} from "../../models/users/ViewUserModel";


export const usersQueryRepository = {
    async getUsers(query:UserQueryType) {
        return await getPaginatedAndSortedResults(query,usersCollection,arrToUserViewModel,{})
    },


    async getUserById(id:string): Promise<ViewUserModel | null> {
        const foundUser: UserType | null = await usersCollection.findOne({_id:new ObjectId(id)})
        if(!foundUser) return null
        return objToUserViewModel(foundUser)
    },


    async findUserByEmailOrLogin(emailOrLogin:string): Promise<UserType | null> {
        const foundUser: UserType | null = await usersCollection.findOne({ $or: [ {email:emailOrLogin}, {login:emailOrLogin} ] })
        if(!foundUser) return null
        return foundUser

    },

    async findCurrentUserForAuthMe(userId:string):Promise<AuthMeUserModel | null> {

        const foundUser: UserType | null = await usersCollection.findOne({_id:new ObjectId(userId)})

        if(!foundUser) return null

        return toAuthMeModel(foundUser)
    }


}