import {CreateUserModel} from "../models/users/CreateUserModel";
import {usersRepository} from "../repositories/users/users-repository";
import {usersQueryRepository} from "../repositories/users/users-query-repository";
import {ViewUserModel} from "../models/users/ViewUserModel";
import bcrypt from 'bcrypt';
import {UserType} from "../models/users/UserType";



export const userService = {


    async createUser(newUserData:CreateUserModel):Promise<ViewUserModel | null> {

        const hashedPassword = await bcrypt.hash(newUserData.password,10)

        const newUser:string | null = await usersRepository.createUser({...newUserData,password:hashedPassword})

        if(!newUser) return null

        return await usersQueryRepository.getUserById(newUser)

    },

    async deleteUser(id:string):Promise<boolean> {

        const isUserExist = await usersQueryRepository.getUserById(id)

        if(!isUserExist) return false

        return await usersRepository.deleteUser(id)

    },

    async checkCredentials(EmailOrLogin:string,password:string):Promise<null | UserType> {

         const foundUser:null | UserType = await usersQueryRepository.findUserByEmailOrLogin(EmailOrLogin)

         if(!foundUser) return null

         const isLoginSuccessful = await bcrypt.compare(password,foundUser.password)

        if(!isLoginSuccessful) return null

        return foundUser


    },


}
