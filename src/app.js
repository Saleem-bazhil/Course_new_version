import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:8133"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

// routes
import routes from "./routes.js";
app.use("/api", routes);

// swagger
import swaggerConfig from "./config/swagger.js";
swaggerConfig(app);

export default app;
