const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course API",
      version: "1.0.0",
      description: "API documentation for Course backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    "./src/modules/**/*.js",
    "./src/routes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
