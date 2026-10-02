const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require("../models/blogModel");

const getBlogs = async (req, res) => {
    try {
        const blogs = await getAllBlogs();

        res.json({
            success: true,
            blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message
        });
    }
};

const getBlog = async (req, res) => {
    try {
        const blog = await getBlogById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blog",
            error: error.message
        });
    }
};

const addBlog = async (req, res) => {
    try {
        const {
            title,
            slug,
            content,
            excerpt,
            image_url,
            published
        } = req.body;

        if (!title || !slug) {
            return res.status(400).json({
                success: false,
                message: "Title and slug are required"
            });
        }

        const blog = await createBlog(
            title,
            slug,
            content,
            excerpt,
            image_url,
            published || false
        );

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
            error: error.message
        });
    }
};

const editBlog = async (req, res) => {
    try {
        const {
            title,
            slug,
            content,
            excerpt,
            image_url,
            published
        } = req.body;

        const blog = await updateBlog(
            req.params.id,
            title,
            slug,
            content,
            excerpt,
            image_url,
            published
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog updated successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
            error: error.message
        });
    }
};

const removeBlog = async (req, res) => {
    try {
        const blog = await deleteBlog(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message
        });
    }
};

module.exports = {
    getBlogs,
    getBlog,
    addBlog,
    editBlog,
    removeBlog
};