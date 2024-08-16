const db = require('../db/database');

const updateData = async (data) => {
    try {
        const query = `
            UPDATE "portfolios"
            SET name = $1
            WHERE portfolio_id = $2
            RETURNING *
        `

        const values = [data.name, data.portfolio_id];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error(`Failed to update portfolio ${error.message}`)
    }
}

module.exports = {
    updateData,
}