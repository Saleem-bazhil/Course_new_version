import express from "express";
import cors from "cors";
import { adminJs, adminRouter } from "./admin/admin.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:8133","http://localhost:5050"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(adminJs.options.rootPath, adminRouter);

// routes
import routes from "./routes.js";
app.use("/api", routes);

// error handler (must be after all routes/middleware)
import errorHandler from "./middlewares/error.middleware.js";
app.use(errorHandler);

// swagger
import swaggerConfig from "./config/swagger.js";
swaggerConfig(app);

// error handling middleware (must be last)
import errorMiddleware from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

export default app;
