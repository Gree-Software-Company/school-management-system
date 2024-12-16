import type { Request, Router, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
const express = require("express");

export const authRouter: Router = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
