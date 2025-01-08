import { Router } from "express";
import { FeesController } from "../controllers/fees.controller";

export const feesRouter = Router();
const feecontroller = new FeesController();

feesRouter
  .route("/")
  .get(feecontroller.getAllHandler)
  .post(feecontroller.addHandler);

feesRouter
  .route("/:id")
  .delete(feecontroller.deleteHandler)
  .get(feecontroller.getOneHandler)
  .put(feecontroller.updateHandler);
