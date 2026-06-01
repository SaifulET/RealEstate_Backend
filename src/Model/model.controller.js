import {
  createModelService,
  getAllModelsService,
  getModelByIdService,
  updateModelService,
  deleteModelService
} from "./model.service.js";

// Create Model
export const createModel = async (req, res) => {
  try {
    const model = await createModelService(req.body);

    res.status(201).json({
      success: true,
      message: "Model created successfully",
      data: model
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Models
export const getAllModels = async (req, res) => {
  try {
    const projectId = req.params.projectid;
    const models = await getAllModelsService(projectId);

    res.status(200).json({
      success: true,
      count: models.length,
      data: models
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Model
export const getModelById = async (req, res) => {
  try {
    
    const model = await getModelByIdService(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.status(200).json({
      success: true,
      data: model
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Model
export const updateModel = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.area !== undefined) updateData.area = req.body.area;
    if (req.body.face !== undefined) updateData.face = req.body.face;
    if (req.body.model_price !== undefined) updateData.model_price = req.body.model_price;
    if (req.body.rooms_number !== undefined) updateData.rooms_number = req.body.rooms_number;

    const updatedModel = await updateModelService(
      req.params.id,
      updateData
    );

    if (!updatedModel) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Model updated successfully",
      data: updatedModel
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Model
export const deleteModel = async (req, res) => {
  try {
    const deletedModel = await deleteModelService(req.params.id);

    if (!deletedModel) {
      return res.status(404).json({
        success: false,
        message: "Model not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Model deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
