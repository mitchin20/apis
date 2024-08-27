const emitter = require('../../lib/emitter');
const jwt = require('jsonwebtoken');
const { refreshToken } = require('../services/refreshToken');
const { getTokenByClientNameOrId } = require('../services/getTokenByClientNameOrId');

const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN;

const refreshClientToken = async (req, res) => {
    try {
        const { clientId } = req.query;
        const queryValues = {
            client_id: clientId,
            client_name: null
        }
        const existedClient = await getTokenByClientNameOrId(queryValues);
        const {id, updated_at, created_at, token, ...client } = existedClient;

        if (!existedClient) {
            const message = `Client not existed: ${clientId}`;
            emitter.emit('RefreshTokenError', message);
            return res.status(404).json({
                success: false,
                data: null,
                message,
                error: null
            })
        }

        const payload = { ...client }
        const refreshedToken = jwt.sign(payload, SECRET_TOKEN_KEY, { expiresIn: '1h' });

        const updatedClientToken = await refreshToken(refreshedToken, clientId);

        res.json({
            success: true,
            data: updatedClientToken,
            message: "Successfully refreshed token",
            error: null
        })
    } catch (error) {
        const message = `Failed to refresh client token: ${error.message}`;
        emitter.emit('RefreshTokenError', message);
        res.status(500).json({
            success: false,
            data: null,
            message,
            error: error.message
        })
    }
};

module.exports = {
    refreshClientToken,
}