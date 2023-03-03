import {ObjectId} from "mongodb";

export type UserType = {
    _id: ObjectId
    login:string
    email:string
    password:string
    createdAt:string

}


export type UserTypeForDb = {
    _id?: ObjectId
    login:string
    email:string
    password:string
    createdAt:string

}
