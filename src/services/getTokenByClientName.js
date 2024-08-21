const db = require('../db/database');

const getTokenByClientName = async (clientName) => {
    try {
        const query = `
            SELECT *
            FROM tokens
            WHERE client_name = $1
        `
        const values = [clientName];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error(`Failed to fetch Client Token by: ${clientName} : ${error.message}`);
    }
}

module.exports = {
    getTokenByClientName,
}