import { Router } from "express";
import { ResultsController } from "../controllers/results.controller";

export const resultsRouter = Router();

resultsRouter
  .route("/")
  .get(ResultsController.getAllHandler)
  .post(ResultsController.addHandler);

resultsRouter
  .route("/:id")
  .get(ResultsController.getOneHandler)
  .put(ResultsController.updateHandler);
