require('dotenv').config();
const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

const query = async (text, params) => {
    try {
        const response = await pool.query(text, params);

        return response;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

module.exports = {
    query,
    pool,
};
