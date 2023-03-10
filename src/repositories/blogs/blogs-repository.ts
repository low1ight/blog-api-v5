import {blogsCollection, postsCollection} from "../../db/db";
import {ObjectId} from 'mongodb'
import {UpdateBlogModel} from "../../models/blogs/UpdateBlogModel";
import {BlogType} from "../../models/blogs/BlogType";
import {arrToBlogBLLModel} from "../../mappers/blogs-mappers/arrToBlogBLLModel";
import {Blog} from "../../models/blogs/Blog";
import {objToBlogBLLModel} from "../../mappers/blogs-mappers/objToBlogBLLModel";
import {getDate} from "../../utils/getDate";
import {CreateBlogModel} from "../../models/blogs/CreateBlogModel";





export const blogRepository = {

    async getBlogs(): Promise<Blog[]> {

        const response:BlogType[] = await blogsCollection.find({}).toArray()

        return arrToBlogBLLModel(response)

    },

    async getBlogById(id: string): Promise<Blog | null> {

        const response: BlogType | null = await blogsCollection.findOne({_id: new ObjectId(id)})

        if(!response) return null

        return objToBlogBLLModel(response)

    },


    async createBlog({name,description,websiteUrl}: CreateBlogModel): Promise<string | null> {


        let newBlog = {
            name,
            description,
            websiteUrl,
            createdAt:getDate(),
            isMembership:false
        }

        const result = await blogsCollection.insertOne(newBlog)

        if (!result.insertedId) return null

        return result.insertedId.toString()

    },

    async deleteBlog(id: string): Promise<boolean> {

        const response = await blogsCollection.deleteOne({_id: new ObjectId(id)})

        return response.deletedCount === 1

    },


    async updateBlog(id: string, {name,description,websiteUrl}: UpdateBlogModel): Promise<boolean> {

        const result = await blogsCollection.updateOne(
            {
                _id: new ObjectId(id)
            },

            {
                $set:
                    {
                        name,
                        description,
                        websiteUrl
                    }
            })


        if (result.matchedCount !== 1) return false

        await postsCollection.updateMany({blogId:new ObjectId(id)}, {$set: {blogName: name}})
        //????
        return true

    }

}
