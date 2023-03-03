import {ViewPostModel} from "../../models/posts/ViewPostModel";
import {PostType} from "../../models/posts/PostType";


export const objToPostViewModel = (obj:PostType):ViewPostModel  => {

        return {
            id:obj._id.toString(),
            title:obj.title,
            shortDescription:obj.shortDescription,
            content:obj.content,
            blogId:	obj.blogId,
            blogName:obj.blogName,
            createdAt:obj.createdAt
        }

}