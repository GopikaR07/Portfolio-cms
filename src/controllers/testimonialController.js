const {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require("../models/testimonialModel");

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await getAllTestimonials();

        res.json({
            success: true,
            testimonials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonials",
            error: error.message
        });
    }
};

const getTestimonial = async (req, res) => {
    try {
        const testimonial = await getTestimonialById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found"
            });
        }

        res.json({
            success: true,
            testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonial",
            error: error.message
        });
    }
};

const addTestimonial = async (req, res) => {
    try {
        const {
            name,
            role,
            company,
            message,
            image_url
        } = req.body;

        if (!name || !message) {
            return res.status(400).json({
                success: false,
                message: "Name and message are required"
            });
        }

        const testimonial = await createTestimonial(
            name,
            role,
            company,
            message,
            image_url
        );

        res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create testimonial",
            error: error.message
        });
    }
};

const editTestimonial = async (req, res) => {
    try {
        const {
            name,
            role,
            company,
            message,
            image_url
        } = req.body;

        const testimonial = await updateTestimonial(
            req.params.id,
            name,
            role,
            company,
            message,
            image_url
        );

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found"
            });
        }

        res.json({
            success: true,
            message: "Testimonial updated successfully",
            testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update testimonial",
            error: error.message
        });
    }
};

const removeTestimonial = async (req, res) => {
    try {
        const testimonial = await deleteTestimonial(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found"
            });
        }

        res.json({
            success: true,
            message: "Testimonial deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete testimonial",
            error: error.message
        });
    }
};

module.exports = {
    getTestimonials,
    getTestimonial,
    addTestimonial,
    editTestimonial,
    removeTestimonial
};