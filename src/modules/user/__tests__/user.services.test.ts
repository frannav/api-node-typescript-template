import assert from "node:assert";
import { describe, test } from "node:test";
import * as bcrypt from "bcrypt";
import * as store from "../../../adapters/local-store/store.js";
import { createUser } from "../user.services.js";

// Simple test without complex mocking for now
describe("User Services", () => {
	describe("createUser", () => {
		test("should throw an error if password is not provided", async () => {
			const userData = {
				name: "John Doe",
				email: "john.doe@example.com",
			} as any;

			await assert.rejects(async () => await createUser(userData), /Password is required/);
		});
	});
});
