import express from "express";
const app = express();

app.use(express.json());

// routes
import routes from "./routes.js";
app.use("/api", routes);

// swagger
import swaggerConfig from "./config/swagger.js";
swaggerConfig(app);

export default app;
