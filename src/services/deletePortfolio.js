const db = require('../db/database');
const emitter = require('../../lib/emitter');

const deletePortfolio = async (id) => {
    try {
        const query = `
            DELETE FROM "portfolios"
            WHERE portfolio_id = $1
            RETURNING portfolio_id;
        `
        const values = [id];

        const result = await db.query(query, values);
        emitter.emit("deletedPortfolio", result.rows[0]);

        return result.rows[0];
    } catch (error) {
        const message = `Failed to delete record: ${error.message}`;
        emitter.emit('deletedPortfolioError', message);
        throw new Error(message);
    }
}

module.exports = {
    deletePortfolio,
}