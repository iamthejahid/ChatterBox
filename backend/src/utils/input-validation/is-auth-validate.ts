import Joi from "joi";
// import validateRequest from "./validation.error";




const registrationBody = {
    body: Joi.object().keys({
        username: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
};


const registerValidation = (req: any, res: any, next: any) => {
    const { error } = registrationBody.body.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


export { registerValidation };


