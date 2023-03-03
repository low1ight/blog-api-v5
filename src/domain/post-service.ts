import {PostTypeForDb} from "../models/posts/PostType";
import {ObjectId} from "mongodb";
import {CreatePostModel} from "../models/posts/CreatePostModel";
import {postsRepository} from "../repositories/posts/posts-repository";
import {Blog} from "../models/blogs/Blog";
import {blogRepository} from "../repositories/blogs/blogs-repository";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";
import {getDate} from "../utils/getDate";



export const postService = {

    async createPost({title,shortDescription,content,blogId}: CreatePostModel):Promise<string | null> {

        const blog: Blog | null = await blogRepository.getBlogById(blogId)

        if(!blog) return null

        const newPost:PostTypeForDb = {
            title,
            shortDescription,
            content,
            blogId: new ObjectId(blogId),
            blogName:blog.name,
            createdAt:getDate()
        }

        return await postsRepository.createPost(newPost)

    },


    async updatePost(id: string, data: UpdatePostModel):Promise<boolean> {

        const postToUpdate = postsRepository.getPostById(id)

        if(!postToUpdate) return false

        return await postsRepository.updatePost(id,data)

    },

    async deletePost(id: string):Promise<boolean> {

        const postToDelete = postsRepository.getPostById(id)

        if(!postToDelete) return false

        return await postsRepository.deletePost(id)

    },
}