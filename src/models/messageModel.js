const pool = require("../config/db");

const createMessage = async (data) => {
  const { name, email, subject, message } = data;

  const result = await pool.query(
    `INSERT INTO messages (name, email, subject, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, subject, message]
  );

  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );

  return result.rows;
};

module.exports = {
  createMessage,
  getAllMessages
};