// Make sure to require this listener into the app.js
const emitter = require('../../lib/emitter');
const { createSsr } = require('../helpers/createSsr')

emitter.on('createdPortfolio', async (portfolio) => {
    try {
        // Create Self-Service-Request Log
        const ssr = {
            type: "CREATED PORTFOLIO",
            name: "Create Portfolio Listener",
            status: "success",
            data: {
                result: portfolio,
                error: null,
            },
        }

        console.log("SSR:", ssr);
    
        await createSsr(ssr);
    } catch (error) {
        console.error("createdPortfolio: Failed to create SSR log:", error.message);
    }
});

emitter.on('createdPortfolioError', async (error) => {
    try {
        // Create Self-Service-Request Log
        const ssr = {
            type: "CREATED PORTFOLIO ERROR",
            name: "Create Portfolio Listener",
            status: "failed",
            data: {
                result: null,
                error,
            },
        }

        console.log("ERROR SSR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("createdPortfolioError: Failed to create SSR log:", error.message);
    }
});