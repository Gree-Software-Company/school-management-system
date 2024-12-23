import { StaffController } from "../controllers/staff.controller";

const express = require("express");

export const staffRouter = express.Router();

staffRouter.post("/", StaffController.addNewTeacher);
staffRouter.get("/:id", StaffController.getTeacherDetails);
staffRouter.put("/:id", StaffController.updateStaffById);
staffRouter.put("/:id/profile", StaffController.updateStaffProfile);
staffRouter.delete("/:id", StaffController.deleteStaffById);
staffRouter.get("/", StaffController.getAllStaff);
