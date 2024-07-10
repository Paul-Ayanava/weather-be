import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

import { weatherRouter } from "./routes/weatherForcast";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

// Load environment variables
require('dotenv').config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://weatherfe.azurewebsites.net"
    ]
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(weatherRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app }
