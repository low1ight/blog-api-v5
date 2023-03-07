import {Router, Response} from "express";
import {basicAuthorization} from "../middlewares/basic-authorization";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {usersValidationMiddleware} from "../middlewares/validators/users-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {UserInputQueryType} from "../models/users/query/UserInputQueryType";
import {getUserQuery} from "./common-functions/getUserQuery";
import {usersQueryRepository} from "../repositories/users/users-query-repository";
import {ViewUserModelWithPagination} from "../models/users/ViewUserModelWithPagination";
import {userService} from "../domain/user-service";
import {CreateUserModel} from "../models/users/CreateUserModel";


export const usersRouter = Router({})


usersRouter.get('/', basicAuthorization, async (req: RequestWithQuery<UserInputQueryType>, res: Response) => {

    const query = getUserQuery(req.query)

    const users: ViewUserModelWithPagination = await usersQueryRepository.getUsers(query)

    return res.json(users)
})


usersRouter.post('/', basicAuthorization, usersValidationMiddleware, inputValidationMiddleware, async (req: RequestWithBody<CreateUserModel>, res: Response) => {

    const createdUser = await userService.createUser(req.body)

    if (!createdUser) return res.sendStatus(404)

    return res.status(201).json(createdUser)

})


usersRouter.delete('/:id', basicAuthorization, async (req: RequestWithParams<UriIdParamsModel>, res: Response) => {

    const createdUser = await userService.deleteUser(req.params.id)

    if (!createdUser) return res.sendStatus(404)

    return res.sendStatus(204)
})