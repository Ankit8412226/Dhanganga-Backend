import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dhanganga API",
      version: "1.0.0",
      description: "API Documentation for Services, SubServices, Types, and Associates",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // adjust your port
      },
    ],
  },
  apis: ["./routes/*.js"], // Routes folder
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };

