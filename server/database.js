const Sequelize = require("sequelize");
require("dotenv").config();

const databaz = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD || "", // no password
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log,
  }
);

let connectToDatabase = async () => {
  try {
    await databaz.authenticate();
    console.log("✅ Connected to the database");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};

module.exports = { databaz, connectToDatabase };

//admin token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiaWF0IjoxNzQ3NjczMDc5LCJleHAiOjE3NDc5MzIyNzl9.pvmj6idpi4IkwecVeH2VV5t9k6b-s_3C0lypy7rs2V4
