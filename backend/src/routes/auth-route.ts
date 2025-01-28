import userRegister from "@main/controllers/auth-controller";
import { registerValidation } from "@main/utils/input-validation/is-auth-validate";
import { Router } from "express";
import { isClientAuthenticated } from "@main/middleware/auth";

const router = Router();


router.post("/register", isClientAuthenticated, registerValidation, userRegister);



export default router;