import express from "express";
import {
  createModel,
  getAllModels,
  getCompanyModels,
  getModelById,
  updateModel,
  deleteModel
} from "./model.controller.js";

const modelRouter = express.Router();

modelRouter.post("/", createModel);
modelRouter.get("/company/:userId", getCompanyModels);
modelRouter.get("/model/:id", getModelById);
modelRouter.get("/:projectid", getAllModels);
modelRouter.patch("/:id", updateModel);
modelRouter.delete("/:id", deleteModel);

export default modelRouter;
