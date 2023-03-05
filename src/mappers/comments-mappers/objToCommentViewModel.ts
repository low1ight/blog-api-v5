import {CommentType} from "../../models/comments/CommentType";
import {ViewCommentModel} from "../../models/comments/ViewCommentModel";


export const objToCommentViewModel = (obj:CommentType):ViewCommentModel  => {

    return {
        id:obj._id.toString(),
        content:obj.content,
        commentatorInfo: {
            userId:obj.commentatorInfo.userId.toString(),
            userLogin:obj.commentatorInfo.userLogin
        },
        createdAt:obj.createdAt
    }

}