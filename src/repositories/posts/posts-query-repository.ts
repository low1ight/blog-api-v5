import {blogsCollection, postsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {ViewPostModel} from "../../models/posts/ViewPostModel";
import {arrToPostViewModel} from "../../mappers/posts-mappers/arrToPostViewModel";
import {PostType} from "../../models/posts/PostType";
import {objToPostViewModel} from "../../mappers/posts-mappers/objToPostViewModel";
import {getPaginatedAndSortedResults} from "../_common-functions/getPaginatedAndSortedResults";
import {ViewPostModelWithPagination} from "../../models/posts/ViewPostModelWithPagination";
import {PostQueryType} from "../../models/posts/query/PostQueryType";


export const postsQueryRepository = {

    async getPosts(query:PostQueryType): Promise<ViewPostModelWithPagination> {

       return await getPaginatedAndSortedResults(query,postsCollection,arrToPostViewModel,{})
    },


    async getPostById(id: string): Promise<ViewPostModel | null> {

        const result:PostType | null = await postsCollection.findOne({_id: new ObjectId(id)})

        if(!result) return null

        return objToPostViewModel(result)
    },


    async getPostsByBlogId(query:PostQueryType,blogId: string): Promise<ViewPostModelWithPagination | null> {

        const isBlogExist = await blogsCollection.findOne({_id:new ObjectId(blogId)})

        if(!isBlogExist) return null

        return await getPaginatedAndSortedResults(query,postsCollection,arrToPostViewModel,{blogId: new ObjectId(blogId)})
    },

}

