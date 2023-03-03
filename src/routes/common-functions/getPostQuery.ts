
import {PostInputQueryType} from "../../models/posts/query/PostInputQueryType";
import {PostQueryType} from "../../models/posts/query/PostQueryType";

export const getPostQuery = ({sortBy = "createdAt", sortDirection = "desc", pageNumber = 1, pageSize = 10}:PostInputQueryType):PostQueryType => {

    return {
        sortBy,
        sortDirection,
        pageNumber:Number(pageNumber) || 1,
        pageSize:Number(pageSize) || 10
    }
}


