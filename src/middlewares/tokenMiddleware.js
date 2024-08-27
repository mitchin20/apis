require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN;

const authenticateToken = (req, res, next) => {
    const authorization = req.headers['authorization'];

    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Authorization token missing",
            error: "Token is required"
        });
    }

    jwt.verify(token, SECRET_TOKEN_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Invalid token",
                error: "Token verification failed"
            })
        }

        req.data = data;

        next();
    });
}

module.exports = {
    authenticateToken,
}