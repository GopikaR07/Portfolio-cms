const {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
} = require("../models/skillModel");

const getSkills = async (req, res) => {
    try {
        const skills = await getAllSkills();

        res.json({
            success: true,
            skills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message
        });
    }
};

const getSkill = async (req, res) => {
    try {
        const skill = await getSkillById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            skill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skill",
            error: error.message
        });
    }
};

const addSkill = async (req, res) => {
    try {
        const {
            name,
            category,
            proficiency,
            icon_url
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required"
            });
        }

        const skill = await createSkill(
            name,
            category,
            proficiency,
            icon_url
        );

        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create skill",
            error: error.message
        });
    }
};

const editSkill = async (req, res) => {
    try {
        const {
            name,
            category,
            proficiency,
            icon_url
        } = req.body;

        const skill = await updateSkill(
            req.params.id,
            name,
            category,
            proficiency,
            icon_url
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill updated successfully",
            skill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update skill",
            error: error.message
        });
    }
};

const removeSkill = async (req, res) => {
    try {
        const skill = await deleteSkill(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
            error: error.message
        });
    }
};

module.exports = {
    getSkills,
    getSkill,
    addSkill,
    editSkill,
    removeSkill
};