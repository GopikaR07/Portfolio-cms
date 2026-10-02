const db = require("../config/db");

const getAllExperience = async () => {
    const result = await db.query(
        `SELECT * FROM experience ORDER BY start_date DESC`
    );

    return result.rows;
};

const getExperienceById = async (id) => {
    const result = await db.query(
        `SELECT * FROM experience WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createExperience = async (
    company,
    role,
    description,
    start_date,
    end_date,
    is_current
) => {
    const result = await db.query(
        `INSERT INTO experience
        (company, role, description, start_date, end_date, is_current)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            company,
            role,
            description,
            start_date,
            end_date,
            is_current
        ]
    );

    return result.rows[0];
};

const updateExperience = async (
    id,
    company,
    role,
    description,
    start_date,
    end_date,
    is_current
) => {
    const result = await db.query(
        `UPDATE experience
         SET company = $1,
             role = $2,
             description = $3,
             start_date = $4,
             end_date = $5,
             is_current = $6
         WHERE id = $7
         RETURNING *`,
        [
            company,
            role,
            description,
            start_date,
            end_date,
            is_current,
            id
        ]
    );

    return result.rows[0];
};

const deleteExperience = async (id) => {
    const result = await db.query(
        `DELETE FROM experience
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
};