const db = require('../db/database');

const createSsr = async (data) => {
    try {
        const columns = Object.keys(data).join(", ");
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        await db.query(`
            INSERT INTO self_service_requests(${columns})
            VALUES (${placeholders})
        `, values);
    } catch (error) {
        throw new Error(`Create Portfolio Listener: Failed to create ssr: ${error.message}`);
    }
}

module.exports = {
    createSsr,
}