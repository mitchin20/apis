const db = require('../db/database');
const emitter = require('../../lib/emitter');

const updateData = async (data) => {
    try {
        const query = `
            UPDATE "portfolios"
            SET name = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE portfolio_id = $2
            RETURNING *
        `

        const values = [data.name, data.portfolio_id];

        const result = await db.query(query, values);
        emitter.emit('updatedPortfolio', result.rows[0]);

        return result.rows[0];
    } catch (error) {
        const message = `Failed to update portfolio ${error.message}`
        emitter.emit('updatedPortfolioError', message);
        throw new Error(message);
    }
}

module.exports = {
    updateData,
}