// Make sure to require this listener into the app.js
const emitter = require('../../lib/emitter');
const { createSsr } = require('../helpers/createSsr');

emitter.on('updatedPortfolio', async (portfolio) => {
    try {
        // Create SSR log
        const ssr = {
            type: "UPDATED PORTFOLIO",
            name: "Update Portfolio Listener",
            status: "success",
            data: {
                result: portfolio,
                error: null,
            },
        }

        console.log("SSR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("updatedPortfolio: Failed to create SSR log:", error.message);
    }
});

emitter.on('updatedPortfolioError', async (error) => {
    try {
        // Create SSR Log
        const ssr = {
            type: "UPDATED PORTFOLIO ERROR",
            name: "Update Portfolio Listener",
            status: "failed",
            data: {
                result: null,
                error,
            },
        }

        console.log("SSR ERROR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("updatedPortfolioError: Failed to create SSR log:", error.message);
    }
});