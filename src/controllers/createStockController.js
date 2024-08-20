const emitter = require('../../lib/emitter');
const { createStock } = require('../services/createStock');

const insertStock = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId;
        const body = req.body;

        const constructedData = {
            portfolio_id,
            ...body
        };

        // check for existing record
        // return 404 if existed

        console.log("Constructed Data:", constructedData);

        const data = await createStock(constructedData);
        res.json({
            success: true,
            data,
            message: "Successfully created new stock record",
            error: null
        })
    } catch (error) {
        const message = `Failed to create new stock record: ${error.message}`;
        emitter.emit('createdStockError', message);
        console.error(message);
        res.status(500).json({
            success: false,
            data: null,
            message,
            error: error.message
        })
    }
}

module.exports = {
    insertStock,
}