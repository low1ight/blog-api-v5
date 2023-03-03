import {UpdatePostModel} from "../../models/posts/UpdatePostModel";
import {postsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {PostType, PostTypeForDb} from "../../models/posts/PostType";
import {arrToPostBLLModel} from "../../mappers/posts-mappers/arrToPostBLLModel";
import {objToPostBLLModel} from "../../mappers/posts-mappers/objToPostBLLModel";
import {Post} from "../../models/posts/Post";
import {Blog} from "../../models/blogs/Blog";
import {blogRepository} from "../blogs/blogs-repository";

export const postsRepository = {

    async getPosts():Promise<Post[]> {

        const posts: PostType[] = await postsCollection.find({}).toArray()
        return arrToPostBLLModel(posts)
    },

    async getPostById(id: string):Promise<Post | null> {


        const foundPost: PostType | null = await postsCollection.findOne({_id:new ObjectId(id)})

        if(!foundPost) return null

        return objToPostBLLModel(foundPost)
    },



    async createPost(postData: PostTypeForDb):Promise<string | null> {


        let result = await postsCollection.insertOne(postData)

        if (!result.insertedId) return null

        return result.insertedId.toString()

    },



    async deletePost(id: string):Promise<boolean> {

        let result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return result.deletedCount === 1;

    },



    async updatePost(id: string, {title,shortDescription,content,blogId}:UpdatePostModel):Promise<boolean> {


        const blog: Blog | null = await blogRepository.getBlogById(blogId)

        if(!blog) return false

        const result = await postsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    title,
                    shortDescription,
                    content,
                    blogId: new ObjectId(blogId),
                    blogName: blog.name
                }
            }
        )

        return result.matchedCount === 1
    }

}