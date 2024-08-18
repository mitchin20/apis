const db = require('../db/database');

const getPortfolioByName = async (name) => {
    try {
        const query = `
            SELECT *
            FROM "portfolios"
            WHERE name = $1
        `
        const values = [name];
        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

module.exports = {
    getPortfolioByName,
}