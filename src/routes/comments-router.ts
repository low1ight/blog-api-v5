import {Response, Router} from "express";
import {ViewCommentModel} from "../models/comments/ViewCommentModel";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {RequestWithParams, RequestWithParamsAndBody} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {UpdateCommentModel} from "../models/comments/UpdateCommentModel";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {commentService} from "../domain/comment-service";
import {commentValidator} from "../middlewares/validators/comment-validator";
import {bearerAuthorization} from "../middlewares/bearer-authorization";
import {isCommentOwner} from "../middlewares/isCommentOwner";


export const commentsRouter = Router()


commentsRouter.get('/:id',idValidatorMiddleware,inputValidationMiddleware,async (req:RequestWithParams<UriIdParamsModel>,res) => {

    const comment:ViewCommentModel | null = await commentsQueryRepository.getCommentById(req.params.id)

    if(!comment) return res.sendStatus(404)

    return res.json(comment)
})


commentsRouter.put('/:id',bearerAuthorization,idValidatorMiddleware,commentValidator,isCommentOwner,inputValidationMiddleware, async (req:RequestWithParamsAndBody<UriIdParamsModel, UpdateCommentModel>,res:Response) => {

    const isCommentUpdated:boolean = await commentService.updateComment(req.body,req.params.id)

    if(!isCommentUpdated) return res.sendStatus(404)

    return res.sendStatus(204)
})


commentsRouter.delete('/:id',bearerAuthorization,idValidatorMiddleware,isCommentOwner,inputValidationMiddleware,async (req:RequestWithParams<UriIdParamsModel>,res:Response) => {

    const isCommentDeleted:boolean = await commentService.deleteComment(req.params.id)

    if(!isCommentDeleted) return res.sendStatus(404)

    return res.sendStatus(204)
})