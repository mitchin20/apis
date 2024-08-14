const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

pool.connect((error) => {
    if (error) throw error;
    console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool