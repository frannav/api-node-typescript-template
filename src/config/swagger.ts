import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Bun TS API",
			version: "1.0.0",
			description: "Template API for Bun.js and TypeScript project",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}`,
			},
		],
	},
	apis: ["./src/modules/**/*.ts", "./src/routes.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
