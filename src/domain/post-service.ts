import {CreatePostModel} from "../models/posts/CreatePostModel";
import {postsRepository} from "../repositories/posts/posts-repository";
import {Blog} from "../models/blogs/Blog";
import {blogRepository} from "../repositories/blogs/blogs-repository";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";




export const postService = {

    async createPost(newPostData: CreatePostModel):Promise<string | null> {

        const blog: Blog | null = await blogRepository.getBlogById(newPostData.blogId)

        if(!blog) return null

        return await postsRepository.createPost(newPostData,blog.name)

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