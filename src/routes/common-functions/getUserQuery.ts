
import {UserInputQueryType} from "../../models/users/query/UserInputQueryType";
import {UserQueryType} from "../../models/users/query/UserQueryType";

export const getUserQuery = ({sortBy = "createdAt", sortDirection = "desc", pageNumber = 1, pageSize = 10,searchLoginTerm = null, searchEmailTerm = null}:UserInputQueryType):UserQueryType => {


    return {
        sortBy,
        sortDirection,
        searchLoginTerm,
        searchEmailTerm,
        pageNumber:Number(pageNumber) || 1,
        pageSize:Number(pageSize) || 10,
    }
}


