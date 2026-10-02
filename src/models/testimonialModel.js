const db = require("../config/db");

const getAllTestimonials = async () => {
    const result = await db.query(
        `SELECT * FROM testimonials ORDER BY created_at DESC`
    );

    return result.rows;
};

const getTestimonialById = async (id) => {
    const result = await db.query(
        `SELECT * FROM testimonials WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createTestimonial = async (
    name,
    role,
    company,
    message,
    image_url
) => {
    const result = await db.query(
        `INSERT INTO testimonials
        (name, role, company, message, image_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name, role, company, message, image_url]
    );

    return result.rows[0];
};

const updateTestimonial = async (
    id,
    name,
    role,
    company,
    message,
    image_url
) => {
    const result = await db.query(
        `UPDATE testimonials
         SET name = $1,
             role = $2,
             company = $3,
             message = $4,
             image_url = $5
         WHERE id = $6
         RETURNING *`,
        [name, role, company, message, image_url, id]
    );

    return result.rows[0];
};

const deleteTestimonial = async (id) => {
    const result = await db.query(
        `DELETE FROM testimonials
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};