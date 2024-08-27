const db = require('../db/database');

const getTokenByClientNameOrId = async (value) => {
    try {
        const { client_id, client_name } = value;
        let query, values;

        if (client_id) {
            query = `
                SELECT *
                FROM tokens
                WHERE client_id = $1
            `
            values = [client_id];
        } else {
            query = `
                SELECT *
                FROM tokens
                WHERE client_name = $1
            `
            values = [client_name];
        }

        const result = await db.query(query, values);
        console.log("client: ", result.rows[0]);

        return result.rows[0];
    } catch (error) {
        throw new Error(`Failed to fetch Client Token: Missing client_id or client_name : ${error.message}`);
    }
}

module.exports = {
    getTokenByClientNameOrId,
}