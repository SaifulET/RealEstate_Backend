import mongoose from "mongoose";
import Project from "../Project/Project.model.js";
import Model from "./model.model.js";

// Create
export const createModelService = async (data) => {
  return await Model.create(data);
};

// Get All
export const getAllModelsService = async (id) => {
  return await Model.find({ projectId: id });
};

export const getCompanyModelsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  const projects = await Project.find({ userId }).select("_id").lean();
  const projectIds = projects.map((project) => project._id);

  if (projectIds.length === 0) {
    return [];
  }

  return await Model.aggregate([
    { $match: { projectId: { $in: projectIds } } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: { $toLower: { $trim: { input: "$name" } } },
        model: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$model" } },
    { $sort: { name: 1 } },
  ]);
};

// Get By ID
export const getModelByIdService = async (id) => {
  return await Model.findById(id);
};

// Update
export const updateModelService = async (id, updateData) => {
  return await Model.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
};

// Delete
export const deleteModelService = async (id) => {
  return await Model.findByIdAndDelete(id);
};
