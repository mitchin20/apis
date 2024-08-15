const { getAppointments } = require('../services/getAppointments');

const appointments = async (req, res) => {
    try {
        const appointments = await getAppointments();

        console.log(appointments);

        res.json({
            success: true,
            data: appointments,
            error: null,
            message: "Successfully fetched data"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to fetch appointments!"
        });
    }
};

module.exports = {
    appointments,
};
