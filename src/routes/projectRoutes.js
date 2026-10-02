const express = require("express");

const {
    getProjects,
    getProject,
    addProject,
    editProject,
    removeProject
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProjects);

router.get("/:id", getProject);

router.post("/", protect, addProject);

router.put("/:id", protect, editProject);

router.delete("/:id", protect, removeProject);

module.exports = router;