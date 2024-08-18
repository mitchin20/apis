const yup = require('yup');
const { createPortfolio } = require('../services/createPortfolio');
const { getPortfolioByName } = require('../services/getPortfolioByName');

const schema = yup.object().shape({
    name: yup.string().min(3).required()
});

const insertPortfolio = async (req, res) => {
    try {
        const body = await req.body;
        // Validation
        schema.validateSync(body);

        // Check if record already existed
        const portfolio = await getPortfolioByName(body.name);
        console.log("Existed Portfolio:", portfolio);

        if (portfolio) {
            return res.status(409).json({
                success: false,
                data: portfolio,
                message: "Portfolio name already existed",
                error: null
            })
        }

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