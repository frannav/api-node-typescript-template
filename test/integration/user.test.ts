import assert from "node:assert";
import { after, before, describe, test } from "node:test";
import type { Server } from "node:http";
import app from "../../src/app.js";

// Simple integration test without complex mocking for now

describe("User Integration Tests", () => {
	let server: Server;
	const port = 3001;
	const baseUrl = `http://localhost:${port}`;

	// Start the server before all tests
	before(() => {
		server = app.listen(port);
	});

	// Close the server after all tests
	after(() => {
		server.close();
	});

	describe("POST /api/users", () => {
		test("should create a new user and return it", async () => {
			const userData = {
				name: "Test User",
				email: "test.user@example.com",
				password: "strongPassword123",
			};

			const response = await fetch(`${baseUrl}/api/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			const responseBody = await response.json() as any;

			// Assertions using Node.js assert
			assert.strictEqual(response.status, 201);
			assert.strictEqual(responseBody.name, userData.name);
			assert.strictEqual(responseBody.email, userData.email);
			assert.strictEqual(responseBody.passwordHash, undefined);
		});

		test("should return 400 if required fields are missing", async () => {
			const incompleteUserData = {
				name: "Test User",
			};

			const response = await fetch(`${baseUrl}/api/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(incompleteUserData),
			});

			const responseBody = await response.json() as any;

			assert.strictEqual(response.status, 400);
			assert.ok(responseBody.errors);
		});
	});
});
