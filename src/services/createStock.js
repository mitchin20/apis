const db = require('../db/database');
const emitter = require('../../lib/emitter');

const createStock = async (data) => {
    try {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const query = `
            INSERT INTO stocks(${columns})
            VALUES (${placeholders})
            RETURNING *;
        `;
        const result = await db.query(query, values);

        console.log("stock data:", result.rows[0]);

        emitter.emit('createdStock', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        const message = `Failed to create new stock: ${error.message}`;
        emitter.emit('createdStockError', message);
        throw new Error(message);
    }
}

module.exports = {
    createStock,
}