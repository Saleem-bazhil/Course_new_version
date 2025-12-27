import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token obtained from /api/users/login endpoint",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  // Serve swagger JSON explicitly
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Serve swagger UI with custom options
  const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Course API Documentation",
    swaggerOptions: {
      persistAuthorization: true, // Persist authorization across page refreshes
      displayRequestDuration: true,
    },
  };

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
};
