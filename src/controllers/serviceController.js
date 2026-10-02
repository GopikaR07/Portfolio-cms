const serviceModel = require("../models/serviceModel");

const getServices = async (req, res) => {
  try {
    const services = await serviceModel.getAllServices();

    res.json({
      success: true,
      services
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services"
    });
  }
};

const getService = async (req, res) => {
  try {
    const service = await serviceModel.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service"
    });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    const service = await serviceModel.createService({
      title,
      description,
      icon
    });

    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service"
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await serviceModel.updateService(
      req.params.id,
      req.body
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service"
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await serviceModel.deleteService(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service"
    });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};