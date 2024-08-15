const express = require('express');
const router = express.Router();
const { appointments } = require('../controllers/appointmentController');
const { readData } = require('../controllers/readFileController');
    const { portfolios } = require('../controllers/portfoliosController');

router.get('/appointments', appointments);
router.get('/readData', readData);
router.get('/portfolios', portfolios);

module.exports = router;