import assert from "node:assert";
import { describe, test } from "node:test";
import { createUser } from "../user.services.js";

// Simple test without complex mocking for now
describe("User Services", () => {
	describe("createUser", () => {
		test("should throw an error if password is not provided", async () => {
			const userData = {
				name: "John Doe",
				email: "john.doe@example.com",
			} as Partial<{ name: string; email: string; password: string }>;

			await assert.rejects(
				async () => await createUser(userData),
				/Password is required/,
			);
		});
	});
});
