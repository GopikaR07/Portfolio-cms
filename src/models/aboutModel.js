const db = require("../config/db");

const getAbout = async () => {
    const result = await db.query(
        `SELECT * FROM about ORDER BY id LIMIT 1`
    );

    return result.rows[0];
};

const createAbout = async (
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
) => {
    const result = await db.query(
        `INSERT INTO about
        (
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
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *`,
        [
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
        ]
    );

    return result.rows[0];
};

const updateAbout = async (
    id,
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
) => {
    const result = await db.query(
        `UPDATE about
         SET name = $1,
             title = $2,
             bio = $3,
             profile_image_url = $4,
             email = $5,
             phone = $6,
             location = $7,
             github_url = $8,
             linkedin_url = $9,
             resume_url = $10,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $11
         RETURNING *`,
        [
            name,
            title,
            bio,
            profile_image_url,
            email,
            phone,
            location,
            github_url,
            linkedin_url,
            resume_url,
            id
        ]
    );

    return result.rows[0];
};

module.exports = {
    getAbout,
    createAbout,
    updateAbout
};