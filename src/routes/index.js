const express = require('express');
const router = express.Router();
const { appointments } = require('../controllers/appointmentController');
const { readData } = require('../controllers/readFileController');
    const { portfolios } = require('../controllers/portfoliosController');
const { insertPortfolio } = require('../controllers/createPortfolioController');
const { updatePortfolio } = require('../controllers/updatePortfolioController');
const { removePortfolio } = require('../controllers/deletePortfolioController');

router.get('/appointments', appointments);
router.get('/readData', readData);
router.get('/portfolios', portfolios);

router.post('/portfolios', insertPortfolio);

router.put('/portfolios/:id', updatePortfolio);

router.delete('/portfolios/:id', removePortfolio);

module.exports = router;