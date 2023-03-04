import {CustomValidator} from "express-validator";
import {fieldErrorMessages} from "../err-messages/err-messages";
import {usersCollection} from "../../../db/db";


export const isLoginAvailable: CustomValidator = async (login: string) => {

    const blogIndex = await usersCollection.findOne({login})

    if (!blogIndex) return true

    throw new Error(fieldErrorMessages.fieldAlreadyTaken('login'))

};