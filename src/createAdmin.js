const bcrypt = require("bcryptjs");
const db = require("./config/db");

const createAdmin = async () => {
    const email = "admin@portfolio.com";
    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        `INSERT INTO users (email, password, role)
         VALUES ($1, $2, $3)`,
        [email, hashedPassword, "admin"]
    );

    console.log("Admin user created successfully!");

    await db.end();
};

createAdmin();