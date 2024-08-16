const yup = require('yup');
const { createPortfolio } = require('../services/createPortfolio');

const schema = yup.object().shape({
    name: yup.string().min(3).required()
})

const insertPortfolio = async (req, res) => {
    try {
        const body = await req.body;
        // Validation
        schema.validateSync(body);

        const data = await createPortfolio(body);
        console.log("created portfolio data:", data);

        res.json({
            success: true,
            data,
            message: "Successfully created new portfolio",
            error: null
        })
    } catch (error) {
        console.error("Failed to create new portfolio:", error.message);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to create new portfolio",
            error: error.message
        })
    }
}

module.exports = {
    insertPortfolio,
}