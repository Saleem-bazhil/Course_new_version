import express from "express";
import cors from "cors";
import { adminJs, adminRouter } from "./admin/admin.js";
import routes from "./routes.js";
import commentsRoutes from "./modules/comments/comments.routes.js";
import notesRoutes from "./modules/notes/notes.routes.js";
import swaggerConfig from "./config/swagger.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const corsOptions = {
  origin: ["https://www.skiezpdfbooks.in",],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(adminJs.options.rootPath, adminRouter);

// routes (must be before error handler)
app.use("/api", routes);
app.use("/api/comments", commentsRoutes);
app.use("/api/notes", notesRoutes);

// swagger
swaggerConfig(app);

// error handling middleware (must be last)
app.use(errorMiddleware);

export default app;
