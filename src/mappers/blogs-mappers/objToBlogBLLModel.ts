import {BlogType} from "../../models/blogs/BlogType";
import {Blog} from "../../models/blogs/Blog";


export const objToBlogBLLModel = ( obj:BlogType ):Blog  => {

        return {
            id:obj._id.toString(),
            name: obj.name,
            description: obj.description,
            websiteUrl:	obj.websiteUrl,
            createdAt:obj.createdAt,
            isMembership:obj.isMembership
        }

}