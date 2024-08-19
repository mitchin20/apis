const yup = require('yup');
const { updateData } = require('../services/updatePortfolio');
const emitter = require('../../lib/emitter');

const schema = yup.object().shape({
    name: yup.string().min(3).required()
})

const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        schema.validateSync(body);

        const reStructuredData = {
            portfolio_id: id,
            name: body.name
        }

        const data = await updateData(reStructuredData);
        if (!data) {
            const message = `Unable to find record with id: ${id}`;
            emitter.emit('updatedPortfolioError', message);
            return res.status(404).json({
                success: false,
                data: null,
                message,
                error: null
            })
        }

        res.json({
            success: true,
            data,
            message: "Successfully updated record",
            error: null,
        });
    } catch (error) {
        const message = `Failed to update record: ${error.message}`;
        emitter.emit("updatedPortfolioError", message);
        console.error(message);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to update record",
            error: error.message,
        })
    }
}

module.exports = {
    updatePortfolio,
}