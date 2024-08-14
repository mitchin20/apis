const express = require('express');
const router = express.Router();
const { getAppointments } = require('../controllers/appointmentController');

router.get('/appointments', getAppointments);

module.exports = router;