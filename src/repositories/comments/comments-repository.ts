import {CreateCommentModel} from "../../models/comments/CreateCommentModel";
import {getDate} from "../../utils/getDate";
import {commentsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UpdateCommentModel} from "../../models/comments/UpdateCommentModel";


export const commentsRepository = {

    async createCommentForPost({content}: CreateCommentModel, {
        userId,
        userLogin
    }: UserDataForNewComment, postId: string) {

        const newComment = {
            content: content,
            commentatorInfo: {
                userId: new ObjectId(userId),
                userLogin: userLogin
            },
            postId: new ObjectId(postId),
            createdAt: getDate()
        }

        const result = await commentsCollection.insertOne(newComment)

        if (result.insertedId) return result.insertedId.toString()

        return null

    },


    async updateComment({content}: UpdateCommentModel, commentId: string) {
        const result = await commentsCollection.updateOne(
            {
                _id: new ObjectId(commentId)
            },
            {
                $set: {
                    content:content
                }

            }
        )


        return result.matchedCount === 1
    },




    async deleteComment(commentId:string) {

        const result = await commentsCollection.deleteOne({_id:new ObjectId(commentId)})

        return result.deletedCount === 1
    }

}


type UserDataForNewComment = {
    userId: string,
    userLogin: string
}