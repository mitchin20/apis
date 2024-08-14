const db = require("../db/database");

const getAppointments = async (req, res) => {
    try {
        const result = await db.query("Select * from Appointment");

        console.log(result.rows);

        res.json({
            appointments: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching appointments!");
    }
};

module.exports = {
    getAppointments,
};
