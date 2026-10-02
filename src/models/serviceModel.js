const pool = require("../config/db");

const getAllServices = async () => {
  const result = await pool.query(
    "SELECT * FROM services ORDER BY id ASC"
  );

  return result.rows;
};

const getServiceById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM services WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const createService = async (data) => {
  const { title, description, icon } = data;

  const result = await pool.query(
    `INSERT INTO services (title, description, icon)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, icon]
  );

  return result.rows[0];
};

const updateService = async (id, data) => {
  const { title, description, icon } = data;

  const result = await pool.query(
    `UPDATE services
     SET title = $1,
         description = $2,
         icon = $3
     WHERE id = $4
     RETURNING *`,
    [title, description, icon, id]
  );

  return result.rows[0];
};

const deleteService = async (id) => {
  const result = await pool.query(
    "DELETE FROM services WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};