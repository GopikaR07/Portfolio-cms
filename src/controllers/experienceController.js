const {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} = require("../models/experienceModel");

const getExperience = async (req, res) => {
    try {
        const experience = await getAllExperience();

        res.json({
            success: true,
            experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience",
            error: error.message
        });
    }
};

const getSingleExperience = async (req, res) => {
    try {
        const experience = await getExperienceById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience",
            error: error.message
        });
    }
};

const addExperience = async (req, res) => {
    try {
        const {
            company,
            role,
            description,
            start_date,
            end_date,
            is_current
        } = req.body;

        if (!company || !role) {
            return res.status(400).json({
                success: false,
                message: "Company and role are required"
            });
        }

        const experience = await createExperience(
            company,
            role,
            description,
            start_date,
            end_date,
            is_current || false
        );

        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create experience",
            error: error.message
        });
    }
};

const editExperience = async (req, res) => {
    try {
        const {
            company,
            role,
            description,
            start_date,
            end_date,
            is_current
        } = req.body;

        const experience = await updateExperience(
            req.params.id,
            company,
            role,
            description,
            start_date,
            end_date,
            is_current
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            message: "Experience updated successfully",
            experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update experience",
            error: error.message
        });
    }
};

const removeExperience = async (req, res) => {
    try {
        const experience = await deleteExperience(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.json({
            success: true,
            message: "Experience deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete experience",
            error: error.message
        });
    }
};

module.exports = {
    getExperience,
    getSingleExperience,
    addExperience,
    editExperience,
    removeExperience
};