const db = require('../db/database');
const emitter = require('../../lib/emitter');

const createPortfolio = async (data) => {
    try {
        const columns = Object.keys(data).join(", ");
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        const result = await db.query(`
            INSERT INTO portfolios(${columns})
            VALUES (${placeholders})
            RETURNING *;
        `, values);

        console.log("portfolio data:", result.rows[0]);
        
        emitter.emit('createdPortfolio', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        const message = `Failed to create new portfolio: ${error.message}`;
        emitter.emit('createdPortfolioError', message);
        throw new Error(message);
    }
}

module.exports = {
    createPortfolio,
}