const emitter = require('../../lib/emitter');
const { getPortfolioById } = require('../services/getPortfolioById');
const { deletePortfolio } = require('../services/deletePortfolio');

const removePortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const existedRecord = await getPortfolioById(id);

        if (!existedRecord) {
            const message = `Record not found by ID: ${id}`;
            emitter.emit("deletedPortfolioError", message);
            return res.status(404).json({
                success: false,
                data: null,
                message,
                error: null
            })
        }

        const result = await deletePortfolio(id);

        res.json({
            success: true,
            data: result,
            message: "Successfully deleted record",
            error: null
        })
    } catch (error) {
        emitter.emit("deletedPortfolioError", error.message);
        console.error("Failed to delete record:", error.message);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to delete record",
            error: error.message
        })
    }
};

module.exports = {
    removePortfolio,
}