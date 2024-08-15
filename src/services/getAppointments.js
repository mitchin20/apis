const db = require('../db/database');

const getAppointments = async () => {
    try {
        const result = await db.query(`
            SELECT *
            FROM "Appointment"    
        `);

        return result.rows;
    } catch (error) {
        throw new Error(`Database query failed ${error.message}`);
    }
}

module.exports = {
    getAppointments,
}