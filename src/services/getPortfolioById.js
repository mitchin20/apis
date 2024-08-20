const db = require('../db/database');

const getPortfolioById = async (id) => {
    try {
        const query = `
            SELECT *
            FROM "portfolios"
            WHERE portfolio_id = $1
        `;
        const values = [id];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error(message);
    }
}

module.exports = {
    getPortfolioById,
}