import {BlogType} from "../../models/blogs/BlogType";
import {Blog} from "../../models/blogs/Blog";


export const arrToBlogBLLModel = (arr:BlogType[] ): Blog[]  => {

    return arr.map(i => {

        return {
            id:i._id.toString(),
            name: i.name,
            description: i.description,
            websiteUrl:	i.websiteUrl,
            createdAt:i.createdAt,
            isMembership:i.isMembership
        }
    })
}