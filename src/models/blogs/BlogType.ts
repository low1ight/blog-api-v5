import {ObjectId} from "mongodb";

export type BlogType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl:	string
    createdAt:string
    isMembership:boolean
}

export type BlogTypeForDb = {
    _id?: ObjectId
    name: string
    description: string
    websiteUrl:	string
    createdAt:string
    isMembership:boolean
}