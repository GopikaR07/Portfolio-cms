const pool = require("../config/db");

const createMedia = async (data) => {
  const { filename, file_url, file_type, file_size } = data;

  const result = await pool.query(
    `INSERT INTO media (filename, file_url, file_type, file_size)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [filename, file_url, file_type, file_size]
  );

  return result.rows[0];
};

const getAllMedia = async () => {
  const result = await pool.query(
    "SELECT * FROM media ORDER BY created_at DESC"
  );

  return result.rows;
};

module.exports = {
  createMedia,
  getAllMedia
};