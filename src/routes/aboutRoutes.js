const express = require("express");

const {
    getAboutInfo,
    saveAbout
} = require("../controllers/aboutController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAboutInfo);

router.put("/", protect, saveAbout);

module.exports = router;