import {ObjectId} from "mongodb";


export type ViewPostModel = {
    id: string
    title:	string
    shortDescription:string
    content:string
    blogId:	string | ObjectId
    blogName:	string
    createdAt: string
}