require('dotenv').config();
const emitter = require("../../lib/emitter");
const yup = require('yup');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { createToken } = require("../services/createToken");
const { getTokenByClientName } = require("../services/getTokenByClientName");

const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN;

const schema = yup.object().shape({
    client_id: yup.string().required(),
    client_name: yup.string().min(8).required(),
    role: yup.string().required(),
    token: yup.string().required(),
    is_active: yup.boolean().required(),
    expires_at: yup.number().required()
})

const insertToken = async (req, res) => {

    try {
        const { client_name } = req.body;
        const client_id = crypto.randomBytes(32).toString('base64');
        const role = 'standard';
        const expires_at = Date.now() + (60 * 60 * 24 * 365 * 1000);
        const payload = {
            client_id,
            client_name,
            role,
            is_active: true,
            expires_at
        }
        const token = jwt.sign(payload, SECRET_TOKEN_KEY, { expiresIn: '1h' });
        const restructuredData = {
            client_id,
            client_name,
            role,
            token,
            is_active: true,
            expires_at
        }

        await schema.validateSync(restructuredData);
        
        const existedToken = await getTokenByClientName(client_name);
        if (existedToken) {
            const message = `Client already existed: ${client_name}`;
            emitter.emit('createdTokenError', message);
            return res.status(409).json({
                success: false,
                data: null,
                message,
                error: null
            })
        }

        const data = await createToken(restructuredData);
        res.json({
            success: true,
            data,
            message: "Successfully created new Client Token",
            error: null
        })
    } catch (error) {
        const message = `Failed to create new Token record: ${error.message}`;
        emitter.emit('createdTokenError', message);
        res.status(500).json({
            success: false,
            data: null,
            message,
            error: error.message
        })
    }
}

module.exports = {
    insertToken,
}


