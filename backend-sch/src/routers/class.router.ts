import { ClassController } from "../controllers/class.controller";

const express = require("express");

export const classRouter = express.Router();

classRouter.get("/", ClassController.getAllClassPresent);
classRouter.post("/", ClassController.createNewClass);
classRouter.get("/:id", ClassController.viewClassDetails);
classRouter.delete("/:id", ClassController.removeAClass);
classRouter.put("/:id/assign", ClassController.setClassTeacher)