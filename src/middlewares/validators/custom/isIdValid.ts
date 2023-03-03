import {ObjectId} from "mongodb";
import {fieldErrorMessages} from "../err-messages/err-messages";

export const isIdValid = (id:string) => {
    try {
        new ObjectId(id)
        return true
    }
    catch {
        throw new Error(fieldErrorMessages.invalidId)
    }
}