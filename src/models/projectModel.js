const db = require("../config/db");

const getAllProjects = async () => {
    const result = await db.query(
        `SELECT * FROM projects ORDER BY created_at DESC`
    );

    return result.rows;
};

const getProjectById = async (id) => {
    const result = await db.query(
        `SELECT * FROM projects WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createProject = async (
    title,
    description,
    image_url,
    technologies,
    github_url,
    live_url
) => {
    const result = await db.query(
        `INSERT INTO projects
        (title, description, image_url, technologies, github_url, live_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url
        ]
    );

    return result.rows[0];
};

const updateProject = async (
    id,
    title,
    description,
    image_url,
    technologies,
    github_url,
    live_url
) => {
    const result = await db.query(
        `UPDATE projects
         SET title = $1,
             description = $2,
             image_url = $3,
             technologies = $4,
             github_url = $5,
             live_url = $6,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [
            title,
            description,
            image_url,
            technologies,
            github_url,
            live_url,
            id
        ]
    );

    return result.rows[0];
};

const deleteProject = async (id) => {
    const result = await db.query(
        `DELETE FROM projects
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};