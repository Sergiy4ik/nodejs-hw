import { Router } from "express";

import { celebrate } from "celebrate";

import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { loginUser, logoutUser, refreshUserSession, registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginSchema), loginUser);
authRouter.post('/auth/logout', logoutUser);
authRouter.post('/auth/refresh', refreshUserSession);

export default authRouter;
