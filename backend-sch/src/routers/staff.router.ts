import { StaffController } from "../controllers/staff.controller";

const express = require("express");

export const staffRouter = express.Router();

staffRouter.post("/teachers", StaffController.addNewTeacher);
staffRouter.get("/teachers/:id", StaffController.getTeacherDetails);
staffRouter.put("/teachers/:id", StaffController.updateStaffById);
staffRouter.put("/teachers/:id/profile", StaffController.updateStaffProfile);
staffRouter.delete("/teachers/:id", StaffController.deleteStaffById);
staffRouter.get("/teachers", StaffController.getAllStaff);

staffRouter.post("/", StaffController.addNewNonTeachinStaff);
staffRouter.get("/:id", StaffController.getNonTeachingStaffById);
staffRouter.put("/:id", StaffController.updateNonTeachingStaff);
staffRouter.put("/:id/profile", StaffController.updateNonTeachingStaffProfile);
staffRouter.delete("/:id", StaffController.deleteNonTeachingStaff);
staffRouter.get("/", StaffController.getAllNonTeachingStaff);
