require("appmetrics-dash").attach();
const mongoose = require("mongoose");
const app = require("./setup");
const logger = require("../logging/logging");
require("dotenv/config");

const PORT = process.env.PORT || 5000;

// Connect to Database
mongoose.connect(
    process.env.MONGO_URI,
    {
        useUnifiedTopology: true
    },
    (err) => {
        if (err) logger.error(err);
        else logger.info("MongoDB Connected");
    }
);

// Serve the App
app.listen(PORT, () => logger.info("Server Started"));
