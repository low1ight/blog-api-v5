
import {UserType} from "../../models/users/UserType";
import {ViewUserModel} from "../../models/users/ViewUserModel";


export const arrToUserViewModel = (arr:UserType[] ):ViewUserModel[]  => {

    return arr.map(i => {
        return {
            id:i._id.toString(),
            login:i.login,
            email:i.email,
            createdAt:i.createdAt,
        }
    })
}