const db = require('../db/database');

const getStockByName = async (name) => {
    try {
        const query = `
            SELECT *
            FROM "stocks"
            WHERE name = $1
        `
        const values = [name];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error(`Error fetching stock by name: ${name} : ${error.message}`);
    }
}

module.exports = {
    getStockByName,
}