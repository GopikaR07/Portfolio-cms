const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../models/projectModel");

const getProjects = async (req, res) => {
    try {
        const projects = await getAllProjects();

        res.json({
            success: true,
            projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await getProjectById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message
        });
    }
};

const addProject = async (req, res) => {
    try {
        const {
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const project = await createProject(
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url
        );

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message
        });
    }
};

const editProject = async (req, res) => {
    try {
        const {
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url
        } = req.body;

        const project = await updateProject(
            req.params.id,
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message
        });
    }
};

const removeProject = async (req, res) => {
    try {
        const project = await deleteProject(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message
        });
    }
};

module.exports = {
    getProjects,
    getProject,
    addProject,
    editProject,
    removeProject
};