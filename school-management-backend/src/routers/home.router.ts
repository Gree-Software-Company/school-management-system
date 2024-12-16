import type { Router, Request, Response } from "express"
import { isAuthenticated } from "../middleware/auth.middleware"
import { HomeController } from "../controllers/home.controller"

const express = require('express')

export const homeRouter = express.Router()
homeRouter.get('/',isAuthenticated, HomeController.home )
