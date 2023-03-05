import {BlogType} from "../../models/blogs/BlogType";
import {blogsCollection} from "../../db/db";
import {ViewBlogModel} from "../../models/blogs/ViewBlogModel";
import {objToBlogViewModel} from "../../mappers/blogs-mappers/objToBlogViewModel";
import {arrToBlogViewModel} from "../../mappers/blogs-mappers/arrToBlogViewModel";
import {ObjectId} from "mongodb";
import {ViewBlogModelWithPagination} from "../../models/blogs/ViewBlogModelWithPagination";
import {getPaginatedAndSortedResults} from "../common-functions/getPaginatedAndSortedResults";
import {BlogQueryType} from "../../models/blogs/query/BlogQueryType";






export const blogQueryRepository = {

    async getBlogs(query:BlogQueryType): Promise<ViewBlogModelWithPagination> {



        return await getPaginatedAndSortedResults(query,blogsCollection,arrToBlogViewModel,{})

    },

    async getBlogById(id: string): Promise<ViewBlogModel | null> {

        const result:BlogType | null = await blogsCollection.findOne({_id: new ObjectId(id)})

        if(!result) return null

        return objToBlogViewModel(result)
    },

}

