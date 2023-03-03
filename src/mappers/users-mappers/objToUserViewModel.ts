import {UserType} from "../../models/users/UserType";
import {ViewUserModel} from "../../models/users/ViewUserModel";


export const objToUserViewModel = (obj:UserType):ViewUserModel  => {

    return {
        id:obj._id.toString(),
        login:obj.login,
        email:obj.email,
        createdAt:obj.createdAt,
    }

}