const db = require("../config/db");

const getAllSkills = async () => {
    const result = await db.query(
        `SELECT * FROM skills ORDER BY created_at DESC`
    );

    return result.rows;
};

const getSkillById = async (id) => {
    const result = await db.query(
        `SELECT * FROM skills WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createSkill = async (
    name,
    category,
    proficiency,
    icon_url
) => {
    const result = await db.query(
        `INSERT INTO skills
        (name, category, proficiency, icon_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, category, proficiency, icon_url]
    );

    return result.rows[0];
};

const updateSkill = async (
    id,
    name,
    category,
    proficiency,
    icon_url
) => {
    const result = await db.query(
        `UPDATE skills
         SET name = $1,
             category = $2,
             proficiency = $3,
             icon_url = $4
         WHERE id = $5
         RETURNING *`,
        [
            name,
            category,
            proficiency,
            icon_url,
            id
        ]
    );

    return result.rows[0];
};

const deleteSkill = async (id) => {
    const result = await db.query(
        `DELETE FROM skills
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
};