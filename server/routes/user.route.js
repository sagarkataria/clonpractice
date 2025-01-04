import { Router } from "express";
import {
    loginController,
    registerUserController,
    verifyEmailController
} from "../controllerls/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserController);
userRouter.route("/verify-email").post(verifyEmailController);
userRouter.route("/login").post(loginController);

export default userRouter;