import {CreateCommentModel} from "../models/comments/CreateCommentModel";
import {postsQueryRepository} from "../repositories/posts/posts-query-repository";
import {ViewPostModel} from "../models/posts/ViewPostModel";
import {commentsRepository} from "../repositories/comments/comments-repository";
import {ViewUserModel} from "../models/users/ViewUserModel";
import {usersQueryRepository} from "../repositories/users/users-query-repository";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {UpdateCommentModel} from "../models/comments/UpdateCommentModel";


export const commentService = {

    async createCommentForPost(newCommentData: CreateCommentModel, postId: string, userId: string) {

        const post: ViewPostModel | null = await postsQueryRepository.getPostById(postId)
        const user: ViewUserModel | null = await usersQueryRepository.getUserById(userId)

        if (!post || !user) return null

        const userDataForPost = {
            userId: userId,
            userLogin: user.login
        }


        const newCommentId: string | null = await commentsRepository.createCommentForPost(newCommentData, userDataForPost, postId)

        if (!newCommentId) return null

        return await commentsQueryRepository.getCommentById(newCommentId)


    },

    async updateComment(updateCommentData: UpdateCommentModel, commentId: string): Promise<boolean> {
        return await commentsRepository.updateComment(updateCommentData, commentId)


    },


    async deleteComment(commentId: string): Promise<boolean> {
        return await commentsRepository.deleteComment(commentId)
    }

}