// Make sure to require this listener into the app.js
const emitter = require('../../lib/emitter');
const { createSsr } = require('../helpers/createSsr');

emitter.on('createdStock', async (data) => {
    try {
        // Generate SSR log
        const ssr = {
            type: "CREATED STOCK",
            name: "Create Stock Listener",
            status: "success",
            data: {
                result: data,
                error: null,
            },
        }

        console.log("SSR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("createdStock: Failed to create ssr: ", error.message);
    }
});

emitter.on('createdStockError', async (error) => {
    try {
        // Generate SSR log
        const ssr = {
            type: "CREATED STOCK ERROR",
            name: "Create Stock Listener",
            status: "failed",
            data: {
                result: null,
                error,
            },
        }

        console.log("SSR ERROR:", ssr);

        await createSsr(ssr);
    } catch (error) {
        console.error("createdStockError: Failed to create ssr: ", error.message);
    }
});