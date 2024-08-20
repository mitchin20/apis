const express = require("express");
const routes = require("./routes");
const app = express();
const db = require("./db/database");
require("./listeners/createPortfolioListener");
require("./listeners/updatePortfolioListener");
require("./listeners/deletePortfolioListener");

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Root route
app.use("/", (req, res) => {
    res.send("Welcome to the API");
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send("Something broken!");
});

console.log("Server is starting...");

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const setupShutDownListeners = () => {
    let listenerAdded = false;

    return () => {
        if (!listenerAdded) {
            process.on("SIGTERM", shutDownDbConnection);
            process.on("SIGINT", shutDownDbConnection);
            listenerAdded = true;
        }
    };
};

// Shut down database connection pool on exit
const shutDownDbConnection = () => {
    // Stop server connection
    server.close(() => {
        // End database connection pool
        db.pool.end(() => {
            console.log("PostgreSQL pool has ended");
            process.exit(0);
        });
    });
};

setupShutDownListeners();

module.exports = app;
