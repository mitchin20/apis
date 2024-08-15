const { getPortfolios } = require('../services/getPortfolios');

const portfolios = async (req, res) => {
    try {
        const data = await getPortfolios();

        res.json({
            success: true,
            data,
            message: "Successfully fetched portfolios",
            error: null
        })
    } catch (error) {
        console.error("Failed to fetch portfolio:", error.message);
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to fetch portfolios",
            error: error.message
        })
    }
}

module.exports = {
    portfolios,
}