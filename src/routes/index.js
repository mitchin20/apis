const express = require('express');
const router = express.Router();
const { appointments } = require('../controllers/appointmentController');
const { readData } = require('../controllers/readFileController');

router.get('/appointments', appointments);
router.get('/readData', readData);

module.exports = router;