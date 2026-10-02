const {
    getAbout,
    createAbout,
    updateAbout
} = require("../models/aboutModel");

const getAboutInfo = async (req, res) => {
    try {
        const about = await getAbout();

        res.json({
            success: true,
            about: about || null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch about information",
            error: error.message
        });
    }
};

const saveAbout = async (req, res) => {
    try {
        const {
            name,
            title,
            bio,
            profile_image_url,
            email,
            phone,
            location,
            github_url,
            linkedin_url,
            resume_url
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        const existingAbout = await getAbout();

        let about;

        if (existingAbout) {
            about = await updateAbout(
                existingAbout.id,
                name,
                title,
                bio,
                profile_image_url,
                email,
                phone,
                location,
                github_url,
                linkedin_url,
                resume_url
            );
        } else {
            about = await createAbout(
                name,
                title,
                bio,
                profile_image_url,
                email,
                phone,
                location,
                github_url,
                linkedin_url,
                resume_url
            );
        }

        res.json({
            success: true,
            message: existingAbout
                ? "About information updated successfully"
                : "About information created successfully",
            about
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to save about information",
            error: error.message
        });
    }
};

module.exports = {
    getAboutInfo,
    saveAbout
};