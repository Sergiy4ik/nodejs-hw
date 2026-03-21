import { Router } from "express";

import { celebrate } from "celebrate";

import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { loginUser, logoutUser, refreshUserSession, registerUser, requestResetEmail } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/auth/logout', logoutUser);
authRouter.post('/auth/refresh', refreshUserSession);
authRouter.post('/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail);
authRouter.post('/auth/reset-password', celebrate(resetPasswordSchema),);

export default authRouter;
