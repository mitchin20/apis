const emitter = require('../../lib/emitter');
const { createStock } = require('../services/createStock');
const { getStockByName } = require('../services/getStockByName');
const yup = require('yup');

const schema = yup.object().shape({
    portfolio_id: yup.number().required(),
    name: yup.string().min(3).required(),
})

const insertStock = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId;
        const { name } = req.body;

        const constructedData = {
            portfolio_id,
            name
        };

        await schema.validateSync(constructedData);

        // check for existing record
        // return 409 if existed
        const existedRecord = await getStockByName(name);
        if (existedRecord) {
            const message = "Record already existed"
            emitter.emit("createdStockError", message);
            return res.status(409).json({
                success: false,
                data: existedRecord,
                message,
                error: null
            })
        }

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