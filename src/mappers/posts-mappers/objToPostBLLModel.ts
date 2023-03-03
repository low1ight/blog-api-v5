import {PostType} from "../../models/posts/PostType";
import {Post} from "../../models/posts/Post";


export const objToPostBLLModel = (obj:PostType ):Post  => {

        return {
            id: obj._id.toString(),
            title: obj.title,
            shortDescription: obj.shortDescription,
            content: obj.content,
            blogId: obj.blogId.toString(),
            blogName: obj.blogName,
            createdAt: obj.createdAt
        }
}