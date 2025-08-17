import cors from "cors";
import type { Application } from "express";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../config/swagger.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { requestLogger } from "../middleware/pino.js";
import routes from "../routes.js";

const configExpressApp = (app: Application) => {
	app.use(requestLogger);
	app.use(express.json());
	app.use(cors());
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
	app.use(routes);
	app.use(errorHandler);

	return app;
};

export default configExpressApp;
