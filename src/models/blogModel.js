const db = require("../config/db");

const getAllBlogs = async () => {
    const result = await db.query(
        `SELECT * FROM blogs ORDER BY created_at DESC`
    );

    return result.rows;
};

const getBlogById = async (id) => {
    const result = await db.query(
        `SELECT * FROM blogs WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createBlog = async (
    title,
    slug,
    content,
    excerpt,
    image_url,
    published
) => {
    const result = await db.query(
        `INSERT INTO blogs
        (title, slug, content, excerpt, image_url, published)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            title,
            slug,
            content,
            excerpt,
            image_url,
            published
        ]
    );

    return result.rows[0];
};

const updateBlog = async (
    id,
    title,
    slug,
    content,
    excerpt,
    image_url,
    published
) => {
    const result = await db.query(
        `UPDATE blogs
         SET title = $1,
             slug = $2,
             content = $3,
             excerpt = $4,
             image_url = $5,
             published = $6,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [
            title,
            slug,
            content,
            excerpt,
            image_url,
            published,
            id
        ]
    );

    return result.rows[0];
};

const deleteBlog = async (id) => {
    const result = await db.query(
        `DELETE FROM blogs
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};