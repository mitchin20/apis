const emitter = require('../../lib/emitter');
const db = require('../db/database');

const createToken = async (data) => {
    try {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        const query = `
            INSERT INTO tokens(${columns})
            VALUES (${placeholders})
            RETURNING *;
        `

        const result = await db.query(query, values);

        emitter.emit('createdToken', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        const message = `Failed to create new token record: ${error.message}`;
        emitter.emit('createdTokenError', message);
        throw new Error(message);
    }
}

module.exports = {
    createToken,
}