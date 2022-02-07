// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const { AuthRouter } = require("../routers/authRouter");
const { ResourceRouter } = require("../routers/resourceRouter");

// Configure Server
const app = express();
app.use(cookieParser());
app.use(express.json());

// Home page
app.get("/", (req, res) => {
    res.json({ msg: "server is configured properly" });
});

// Routers
app.use("/auth", AuthRouter);
app.use("/resource", ResourceRouter);

// Export app
module.exports = app;
