import {NextFunction, Response} from "express";
import {RequestWithParams} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {ViewCommentModel} from "../models/comments/ViewCommentModel";


export const isCommentOwner = async (req:RequestWithParams<UriIdParamsModel>,res:Response,next:NextFunction) => {

    const comment:ViewCommentModel | null = await commentsQueryRepository.getCommentById(req.params.id)

    if(!comment) return res.sendStatus(404)

    if(comment.commentatorInfo.userId === req.userId) return next()

    return res.sendStatus(403)
}