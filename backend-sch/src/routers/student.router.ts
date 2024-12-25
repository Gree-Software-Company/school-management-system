import { Router } from "express";
import { StudentController } from "../controllers/student.controller";

export const studnetRouter = Router();

studnetRouter.get("/", StudentController.getStudents);
studnetRouter.post("/", StudentController.addStudent);
studnetRouter.get("/:id", StudentController.getStudent);
studnetRouter.put("/:id/pay", StudentController.payStudentFees);
studnetRouter.delete("/:id", StudentController.deleteStudent);
studnetRouter.put("/:id", StudentController.updateStudent)
