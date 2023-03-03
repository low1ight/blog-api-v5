import {ViewPostModel} from "../../models/posts/ViewPostModel";
import {PostType} from "../../models/posts/PostType";


export const arrToPostViewModel = (arr:PostType[] ):ViewPostModel[]  => {

    return arr.map(i => {
        return {
            id:i._id.toString(),
            title:i.title,
            shortDescription:i.shortDescription,
            content:i.content,
            blogId:	i.blogId,
            blogName:i.blogName,
            createdAt:i.createdAt
        }
    })
}