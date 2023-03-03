import {BlogInputQueryType} from "../../models/blogs/query/BlogInputQueryType";
import {BlogQueryType} from "../../models/blogs/query/BlogQueryType";

export const getBlogQuery = ({searchNameTerm = null, sortBy = "createdAt", sortDirection = "desc", pageNumber = 1, pageSize = 10}:BlogInputQueryType):BlogQueryType => {



    return {
        searchNameTerm,
        sortBy,
        sortDirection,
        pageNumber:Number(pageNumber) || 1,
        pageSize:Number(pageSize) || 10
    }
}


