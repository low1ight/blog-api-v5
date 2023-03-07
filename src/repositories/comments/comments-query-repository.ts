import {getPaginatedAndSortedResults} from "../_common-functions/getPaginatedAndSortedResults";
import {CommentQueryType} from "../../models/comments/query/CommentQueryType";
import {commentsCollection} from "../../db/db";
import {arrToCommentViewModel} from "../../mappers/comments-mappers/arrToCommentViewModel";
import {ObjectId} from "mongodb";
import {ViewCommentModelWithPagination} from "../../models/comments/ViewCommentModelWithPagination";
import {CommentType} from "../../models/comments/CommentType";
import {objToCommentViewModel} from "../../mappers/comments-mappers/objToCommentViewModel";


export const commentsQueryRepository = {

    async getPostsComments(query:CommentQueryType,postId:string):Promise<ViewCommentModelWithPagination> {


        return await getPaginatedAndSortedResults(query,commentsCollection,arrToCommentViewModel,{postId:new ObjectId(postId)})
    },

    async getCommentById(id:string) {

        const comment:CommentType | null = await commentsCollection.findOne({_id:new ObjectId(id)})

        if(!comment) return null

        return objToCommentViewModel(comment)



    }



}

