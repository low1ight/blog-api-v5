
export type ViewCommentModel = {
    _id?: string
    content:string
    commentatorInfo:CommentatorInfoViewModel
    createdAt:string

}

type CommentatorInfoViewModel = {
    userId:string,
    userLogin:string
}