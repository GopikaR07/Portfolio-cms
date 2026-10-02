const express = require("express");

const {
    getSkills,
    getSkill,
    addSkill,
    editSkill,
    removeSkill
} = require("../controllers/skillController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSkills);

router.get("/:id", getSkill);

router.post("/", protect, addSkill);

router.put("/:id", protect, editSkill);

router.delete("/:id", protect, removeSkill);

module.exports = router;