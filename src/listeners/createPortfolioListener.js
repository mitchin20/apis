const db = require('../db/database');
const emitter = require('../../lib/emitter');

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
                error: error,
            },
        }

        console.log("ERROR SSR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("createdPortfolioError: Failed to create SSR log:", error.message);
    }
});

const createSsr = async (data) => {
    try {
        const columns = Object.keys(data).join(", ");
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        await db.query(`
            INSERT INTO self_service_requests(${columns})
            VALUES (${placeholders})
        `, values);
    } catch (error) {
        throw new Error(`Create Portfolio Listener: Failed to create ssr: ${error.message}`);
    }
}