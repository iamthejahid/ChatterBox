import Joi from "joi";
import validateRequest from "./validation.error";




const registrationBody = {
    body: Joi.object().keys({
        username: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
};


export const registrationValidation = validateRequest(registrationBody);

