import {getPaginatedAndSortedResults} from "./common-functions/getPaginatedAndSortedResults";
import {CommentQueryType} from "../models/comments/query/CommentQueryType";
import {commentsCollection} from "../db/db";
import {arrToCommentViewModel} from "../mappers/comments-mappers/arrToCommentViewModel";
import {ObjectId} from "mongodb";


export const commentsQueryRepository = {
    async getPostsComments(query:CommentQueryType,postId:string) {
        return await getPaginatedAndSortedResults(query,commentsCollection,arrToCommentViewModel,{_id:new ObjectId(postId)})
    }
}