const express = require("express");

const {
    getTestimonials,
    getTestimonial,
    addTestimonial,
    editTestimonial,
    removeTestimonial
} = require("../controllers/testimonialController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTestimonials);

router.get("/:id", getTestimonial);

router.post("/", protect, addTestimonial);

router.put("/:id", protect, editTestimonial);

router.delete("/:id", protect, removeTestimonial);

module.exports = router;