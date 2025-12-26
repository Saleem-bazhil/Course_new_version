const express = require("express");
const app = express();

app.use(express.json());

// routes
const routes = require("./routes");
app.use("/api", routes);

// swagger
require("./config/swagger")(app);

module.exports = app;
