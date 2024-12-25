import { Router } from "express";
import { SemesterController } from "../controllers/semester.controller";

export const semesterRouter = Router();

semesterRouter.get("/", SemesterController.getAllSemester);
semesterRouter.get("/:id", SemesterController.getSemester);
semesterRouter.post("/", SemesterController.addNewSem);
semesterRouter.put("/:id", SemesterController.updateSemester )
semesterRouter.delete("/:id", SemesterController.deleteSemester)
