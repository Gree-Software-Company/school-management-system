import express from "express";
import { AnalyticsController } from "../controllers/analytics.controller";

export const analyticsRouter = express.Router();

// GET general analytics
analyticsRouter.get("/", AnalyticsController.getGeneralAnalytics);
