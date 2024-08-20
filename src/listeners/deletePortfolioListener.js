const emitter = require('../../lib/emitter');
const { createSsr } = require('../helpers/createSsr');

emitter.on('deletedPortfolio', async (data) => {
    try {
        // Create SSR Log
        const ssr = {
            type: "DELETED PORTFOLIO",
            name: "Delete Portfolio Listener",
            status: "success",
            data: {
                result: data,
                error: null
            }
        }
    
        console.log("SSR:", ssr);
    
        await createSsr(ssr);
    } catch (error) {
        console.error(`deletedPortfolio: Failed to create SSR log: ${error.message}`);
    }
});

emitter.on('deletedPortfolioError', async (error) => {
    try {
        // Create SSR log
        const ssr = {
            type: "DELETED PORTFOLIO ERROR",
            name: "Delete Portfolio Listener",
            status: "failed",
            data: {
                result: null,
                error
            }
        }

        console.log("SSR ERROR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error(`deletedPortfolioError: Failed to create SSR log: ${error.message}`);
    }
});