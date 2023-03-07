import {UserType} from "../../models/users/UserType";
import {AuthMeUserModel} from "../../models/AuthMeUserModel";


export const toAuthMeModel = (obj:UserType):AuthMeUserModel => {

    return {
        id:obj._id.toString(),
        login:obj.login,
        email:obj.email,
    }

}