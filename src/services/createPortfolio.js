const db = require('../db/database');

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
        return result.rows[0];
    } catch (error) {
        throw new Error(`Failed to create new portfolio: ${error.message}`);
    }
}

module.exports = {
    createPortfolio,
}