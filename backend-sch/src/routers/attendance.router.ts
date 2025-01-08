import { Router } from "express";
import { AttendaceController } from "../controllers/attendance.controller";

export const attendaceRouter = Router();

const attendaceController = new AttendaceController()
attendaceRouter.route("/")
    .post(attendaceController.addHandler)
    .get(attendaceController.getHandler)

attendaceRouter.route("/:id")
    .get(attendaceController.getOneHandler)
    .delete(attendaceController.deleteHandler)
    .put(attendaceController.updateHandler)