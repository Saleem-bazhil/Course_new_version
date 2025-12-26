const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json()); 

app.use("/api", require("./routes"));

// Swagger docs
require("./config/swagger")(app);

module.exports = app;
