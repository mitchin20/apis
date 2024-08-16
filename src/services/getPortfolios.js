const db = require('../db/database');

const getPortfolios = async () => {
    try {
        const result = await db.query(`
            SELECT *
            FROM "portfolios"   
        `);

        return result.rows;
    } catch (error) {
        throw new Error(`Failed to get portfolios: ${error.message}`);
    }
}

module.exports = {
    getPortfolios,
}