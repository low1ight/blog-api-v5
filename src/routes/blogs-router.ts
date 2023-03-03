import {Router,Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery
} from "../request-types";
import {CreateBlogModel} from "../models/blogs/CreateBlogModel";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {UpdateBlogModel} from "../models/blogs/UpdateBlogModel";
import {BlogsValidationMiddleware} from "../middlewares/validators/blogs-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";
import {blogsService} from "../domain/blog-service";
import {blogQueryRepository} from "../repositories/blog-query-repository";
import {postForBlogValidationMiddleware} from "../middlewares/validators/post-for-blog-vaidation-middleware";
import {CreatePostModel} from "../models/posts/CreatePostModel";
import {postService} from "../domain/post-service";
import {postsQueryRepository} from "../repositories/posts-query-repository";
import {BlogInputQueryType} from "../models/blogs/query/BlogInputQueryType";
import {ViewBlogModelWithPagination} from "../models/blogs/ViewBlogModelWithPagination";

import {getBlogQuery} from "./common-functions/getBlogQuery";
import {BlogQueryType} from "../models/blogs/query/BlogQueryType";
import {PostInputQueryType} from "../models/posts/query/PostInputQueryType";
import {getPostQuery} from "./common-functions/getPostQuery";


export const blogsRouter = Router({})



blogsRouter.get('/', async (req:RequestWithQuery<BlogInputQueryType>, res:Response) => {

    let query:BlogQueryType = getBlogQuery(req.query)

    const blogs:ViewBlogModelWithPagination = await blogQueryRepository.getBlogs(query)

    return res.json(blogs)

})



blogsRouter.get('/:id',idValidatorMiddleware,inputValidationMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) =>  {


    const foundBlog:ViewBlogModel | null = await blogQueryRepository.getBlogById(req.params.id)

    if(!foundBlog) return res.sendStatus(404)

    return res.json(foundBlog)

})



blogsRouter.post('/', authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const createdBlogId:string | null = await blogsService.createBlog(req.body)

    if(!createdBlogId) return res.sendStatus(400)

    const createdBlog = await blogQueryRepository.getBlogById(createdBlogId)

    return res.status(201).json(createdBlog)

})

blogsRouter.get('/:id/posts',idValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParamsAndQuery<UriIdParamsModel,PostInputQueryType>, res:Response) => {

    const query = getPostQuery(req.query)

    const posts = await postsQueryRepository.getPostsByBlogId(query,req.params.id)

    if(!posts) return res.sendStatus(404)

    return res.json(posts)


})


blogsRouter.post('/:id/posts', authorizationMiddleware,idValidatorMiddleware,postForBlogValidationMiddleware,inputValidationMiddleware,async (req:RequestWithParamsAndBody<UriIdParamsModel,CreatePostModel>, res:Response) => {


    const createdPostId:string | null = await postService.createPost({...req.body,blogId:req.params.id})

    if(!createdPostId) return res.sendStatus(404)

    const createdPost = await postsQueryRepository.getPostById(createdPostId)

    return res.status(201).json(createdPost)

})




blogsRouter.put('/:id',authorizationMiddleware,idValidatorMiddleware,BlogsValidationMiddleware,inputValidationMiddleware, async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdateBlogModel>, res:Response) => {

    const isBlogUpdated:boolean = await blogsService.updateBlog(req.params.id,req.body)

     if(!isBlogUpdated) return res.sendStatus(404)

    return res.sendStatus(204)

})




blogsRouter.delete('/:id',authorizationMiddleware,idValidatorMiddleware,inputValidationMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isBlogDeleted:boolean = await blogsService.deleteBlog(req.params.id)

    if(!isBlogDeleted) return res.sendStatus(404)

    return res.sendStatus(204)

})



