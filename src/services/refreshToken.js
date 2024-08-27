const emitter = require("../../lib/emitter");
const db = require('../db/database');

const refreshToken = async (new_token, client_id) => {
    try {
        const query = `
            UPDATE tokens
            SET token = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE client_id = $2
            RETURNING *
        `;
        const values = [new_token, client_id];
        const existedClient = await db.query(query, values);

        emitter.emit('RefreshToken', existedClient.rows[0]);

        return existedClient.rows[0];
    } catch (error) {
        const message = `Failed to refresh token: ${error.message}`;
        emitter.emit('RefreshTokenError', message);
        throw new Error("Failed to refresh token", message);
    }
};

module.exports = {
    refreshToken,
}