import express from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/me", AuthController.getUser);
authRouter.put("/me", AuthController.updateUser);
