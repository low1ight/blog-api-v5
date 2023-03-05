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
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";
import {ViewPostModel} from "../models/posts/ViewPostModel";
import {postsQueryRepository} from "../repositories/posts/posts-query-repository";
import {postService} from "../domain/post-service";
import {ViewPostModelWithPagination} from "../models/posts/ViewPostModelWithPagination";
import {getPostQuery} from "./common-functions/getPostQuery";
import {PostQueryType} from "../models/posts/query/PostQueryType";
import {PostInputQueryType} from "../models/posts/query/PostInputQueryType";
import {PostIdUriParamsModel} from "../models/posts/PostIdUriParamsModel";
import {ViewCommentModelWithPagination} from "../models/comments/ViewCommentModelWithPagination";
import {CommentInputQueryType} from "../models/comments/query/CommentInputQueryType";
import {CommentQueryType} from "../models/comments/query/CommentQueryType";
import {getCommentQuery} from "./common-functions/getCommentQuery";
import {commentsQueryRepository} from "../repositories/comments-query-repository";



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



postsRouter.post('/', authorizationMiddleware, PostsValidationMiddleware, inputValidationMiddleware,async (req:RequestWithBody<CreatePostModel>, res:Response) => {

    const createdPostId:string | null = await postService.createPost(req.body)
    //wrong status
    if(!createdPostId) return res.sendStatus(404)

    const createdPost = await postsQueryRepository.getPostById(createdPostId)

    return res.status(201).json(createdPost)

})


postsRouter.put('/:id',authorizationMiddleware,idValidatorMiddleware,PostsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdatePostModel>, res:Response) => {

    const isPostUpdated:boolean = await postService.updatePost(req.params.id,req.body)

    if(!isPostUpdated) return res.sendStatus(404)

    return res.sendStatus(204)

})

postsRouter.delete('/:id',authorizationMiddleware,idValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isPostDeleted:boolean = await postService.deletePost(req.params.id)

    if(!isPostDeleted) return res.sendStatus(404)

   return res.sendStatus(204)

})


postsRouter.get('/:postId/comments', async (req:RequestWithParamsAndQuery<PostIdUriParamsModel,CommentInputQueryType>,res:Response) => {

    const query:CommentQueryType = getCommentQuery(req.query)

    const comments:ViewCommentModelWithPagination | null = await commentsQueryRepository.getPostsComments(query,req.params.postId)

    if(!comments) return res.sendStatus(404)

    return res.json(comments)
})