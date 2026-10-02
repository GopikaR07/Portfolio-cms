const express = require("express");

const {
    getBlogs,
    getBlog,
    addBlog,
    editBlog,
    removeBlog
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.post("/", protect, addBlog);

router.put("/:id", protect, editBlog);

router.delete("/:id", protect, removeBlog);

module.exports = router;