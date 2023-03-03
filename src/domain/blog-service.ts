import {blogRepository} from "../repositories/blogs/blogs-repository";
import {CreateBlogModel} from "../models/blogs/CreateBlogModel";
import {UpdateBlogModel} from "../models/blogs/UpdateBlogModel";
import {getDate} from "../utils/getDate";




export const blogsService = {


    async createBlog({name,description,websiteUrl}:CreateBlogModel):Promise<string | null> {

        let newBlog = {
            name,
            description,
            websiteUrl,
            createdAt:getDate(),
            isMembership:false
        }

        return await blogRepository.createBlog(newBlog)

    },

    async deleteBlog(id:string):Promise<boolean> {

        const blogToDelete = await blogRepository.getBlogById(id)

        if(!blogToDelete) return false

        return await blogRepository.deleteBlog(id)

    },


    async updateBlog(id:string, newBlogData:UpdateBlogModel):Promise<boolean> {

        const blogToUpdate = await blogRepository.getBlogById(id)

        if(!blogToUpdate) return false

        return await blogRepository.updateBlog(id,newBlogData)

    },


}
