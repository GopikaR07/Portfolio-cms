const express = require("express");

const {
    getExperience,
    getSingleExperience,
    addExperience,
    editExperience,
    removeExperience
} = require("../controllers/experienceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getExperience);

router.get("/:id", getSingleExperience);

router.post("/", protect, addExperience);

router.put("/:id", protect, editExperience);

router.delete("/:id", protect, removeExperience);

module.exports = router;