const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/tokenMiddleware');
const { appointments } = require('../controllers/appointmentController');
const { readData } = require('../controllers/readFileController');
const { portfolios } = require('../controllers/portfoliosController');
const { insertPortfolio } = require('../controllers/createPortfolioController');
const { updatePortfolio } = require('../controllers/updatePortfolioController');
const { removePortfolio } = require('../controllers/deletePortfolioController');
const { insertStock } = require('../controllers/createStockController');
const { insertToken } = require('../controllers/createTokenController');
const { refreshClientToken } = require('../controllers/refreshTokenController');

router.get('/appointments', authenticateToken, appointments);
router.get('/readData', authenticateToken, readData);
router.get('/portfolios', authenticateToken, portfolios);

router.post('/portfolios', authenticateToken, insertPortfolio);
router.post('/portfolios/:portfolioId/stocks', authenticateToken, insertStock);
router.post('/tokens', insertToken);

router.put('/portfolios/:id', authenticateToken, updatePortfolio);
router.put('/refreshToken', refreshClientToken);

router.delete('/portfolios/:id', authenticateToken, removePortfolio);

module.exports = router;