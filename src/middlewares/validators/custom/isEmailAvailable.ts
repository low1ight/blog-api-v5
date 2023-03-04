import {CustomValidator} from "express-validator";
import {fieldErrorMessages} from "../err-messages/err-messages";
import {usersCollection} from "../../../db/db";


export const isEmailAvailable: CustomValidator = async (email: string) => {

    const blogIndex = await usersCollection.findOne({email})

    if (!blogIndex) return true

    throw new Error(fieldErrorMessages.fieldAlreadyTaken('email'))

};