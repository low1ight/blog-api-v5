import {Router,Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery
} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {CreatePostModel} from "../models/posts/CreatePostModel";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";
import {PostsValidationMiddleware} from "../middlewares/validators/posts-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {basicAuthorization} from "../middlewares/basic-authorization";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";
import {ViewPostModel} from "../models/posts/ViewPostModel";
import {postsQueryRepository} from "../repositories/posts/posts-query-repository";
import {postService} from "../domain/post-service";
import {ViewPostModelWithPagination} from "../models/posts/ViewPostModelWithPagination";
import {getPostQuery} from "./common-functions/getPostQuery";
import {PostQueryType} from "../models/posts/query/PostQueryType";
import {PostInputQueryType} from "../models/posts/query/PostInputQueryType";
import {ViewCommentModelWithPagination} from "../models/comments/ViewCommentModelWithPagination";
import {CommentInputQueryType} from "../models/comments/query/CommentInputQueryType";
import {CommentQueryType} from "../models/comments/query/CommentQueryType";
import {getCommentQuery} from "./common-functions/getCommentQuery";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {CreateCommentModel} from "../models/comments/CreateCommentModel";
import {bearerAuthorization} from "../middlewares/bearer-authorization";
import {commentService} from "../domain/comment-service";
import {ViewCommentModel} from "../models/comments/ViewCommentModel";
import {commentValidator} from "../middlewares/validators/comment-validator";



export const postsRouter = Router({})


postsRouter.get('/', async (req:RequestWithQuery<PostInputQueryType>, res:Response) => {

    const query:PostQueryType = getPostQuery(req.query)

    const posts:ViewPostModelWithPagination = await postsQueryRepository.getPosts(query)

    res.json(posts)

})


postsRouter.get('/:id',idValidatorMiddleware,inputValidationMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res) => {

    const foundPost:ViewPostModel | null = await postsQueryRepository.getPostById(req.params.id)

    if(!foundPost) return res.sendStatus(404)

    return res.json(foundPost)

})



postsRouter.post('/', basicAuthorization, PostsValidationMiddleware, inputValidationMiddleware,async (req:RequestWithBody<CreatePostModel>, res:Response) => {

    const createdPostId:string | null = await postService.createPost(req.body)
    //wrong status
    if(!createdPostId) return res.sendStatus(404)

    const createdPost = await postsQueryRepository.getPostById(createdPostId)

    return res.status(201).json(createdPost)

})


postsRouter.put('/:id',basicAuthorization,idValidatorMiddleware,PostsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdatePostModel>, res:Response) => {

    const isPostUpdated:boolean = await postService.updatePost(req.params.id,req.body)

    if(!isPostUpdated) return res.sendStatus(404)

    return res.sendStatus(204)

})

postsRouter.delete('/:id',basicAuthorization,idValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isPostDeleted:boolean = await postService.deletePost(req.params.id)

    if(!isPostDeleted) return res.sendStatus(404)

   return res.sendStatus(204)

})


postsRouter.get('/:id/comments',idValidatorMiddleware,inputValidationMiddleware, async (req:RequestWithParamsAndQuery<UriIdParamsModel,CommentInputQueryType>,res:Response) => {

    const query:CommentQueryType = getCommentQuery(req.query)

    const post: ViewPostModel | null = await postsQueryRepository.getPostById(req.params.id)

    if(!post) return res.sendStatus(404)

    const comments:ViewCommentModelWithPagination | null = await commentsQueryRepository.getPostsComments(query,req.params.id)

    if(!comments) return res.sendStatus(404)

    return res.json(comments)
})

postsRouter.post('/:id/comments',bearerAuthorization,commentValidator,idValidatorMiddleware,inputValidationMiddleware, async (req:RequestWithParamsAndBody<UriIdParamsModel,CreateCommentModel>,res:Response) => {

    const comments:ViewCommentModel | null = await commentService.createCommentForPost(req.body,req.params.id,req.userId)

    if(!comments) return res.sendStatus(404)

    return res.status(201).json(comments)
})