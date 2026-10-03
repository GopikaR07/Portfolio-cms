const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const aboutRoutes = require("./src/routes/aboutRoutes");
const experienceRoutes = require("./src/routes/experienceRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const messageRoutes = require("./src/routes/messageRoutes");




require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/messages", messageRoutes);




const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Portfolio CMS Backend is running!");
});

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Database connection is working!",
            time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    try {
        await db.query("SELECT NOW()");
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});