
import {PostType} from "../../models/posts/PostType";
import {Post} from "../../models/posts/Post";


export const arrToPostBLLModel = (arr:PostType[] ):Post[]  => {

    return arr.map(i => {
        return {
            id:i._id.toString(),
            title:i.title,
            shortDescription:i.shortDescription,
            content:i.content,
            blogId:	i.blogId.toString(),
            blogName:i.blogName,
            createdAt:i.createdAt
        }
    })
}