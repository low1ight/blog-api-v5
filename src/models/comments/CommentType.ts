import {ObjectId} from "mongodb";

export type CommentType = {
    _id: ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:string

}


export type CommentTypeForDb = {
    _id?: ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:string

}

type CommentatorInfo = {
    userId:ObjectId,
    userLogin:string
}