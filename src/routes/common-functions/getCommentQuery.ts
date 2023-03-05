import {CommentInputQueryType} from "../../models/comments/query/CommentInputQueryType";
import {CommentQueryType} from "../../models/comments/query/CommentQueryType";

export const getCommentQuery = ({sortBy = "createdAt", sortDirection = "desc", pageNumber = 1, pageSize = 10}:CommentInputQueryType):CommentQueryType => {


    return {
        sortBy,
        sortDirection,
        pageNumber:Number(pageNumber) || 1,
        pageSize:Number(pageSize) || 10
    }
}


