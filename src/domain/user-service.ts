
import {CreateUserModel} from "../models/users/CreateUserModel";
import {usersRepository} from "../repositories/users/users-repository";
import {usersQueryRepository} from "../repositories/users/users-query-repository";
import {ViewUserModel} from "../models/users/ViewUserModel";




export const userService = {


    async createUser(newUserData:CreateUserModel):Promise<ViewUserModel | boolean> {

        const newUser:string | null = await usersRepository.createUser(newUserData)

        if(!newUser) return false

        return await usersQueryRepository.getUserById(newUser)



    },

    async deleteUser(id:string):Promise<boolean> {

        const isUserExist = await usersQueryRepository.getUserById(id)

        if(!isUserExist) return false

        return await usersRepository.deleteUser(id)

    },

}
