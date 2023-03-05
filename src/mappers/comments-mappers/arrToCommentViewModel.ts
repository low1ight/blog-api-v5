
import {CommentType} from "../../models/comments/CommentType";
import {ViewCommentModel} from "../../models/comments/ViewCommentModel";


export const arrToCommentViewModel = (arr:CommentType[] ):ViewCommentModel[]  => {

    return arr.map(i => {
        return {
            id:i._id.toString(),
            content:i.content,
            commentatorInfo: {
                userId:i.commentatorInfo.userId.toString(),
                userLogin:i.commentatorInfo.userLogin
            },
            createdAt:i.createdAt
        }
    })
}