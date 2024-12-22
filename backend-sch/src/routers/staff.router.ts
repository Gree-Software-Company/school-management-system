import { StaffController } from "../controllers/staff.controller";

const express = require("express");

export const staffRouter = express.Router();

staffRouter.post("/", StaffController.addNewTeacher);
staffRouter.get("/:id", StaffController.getTeacherDetails)