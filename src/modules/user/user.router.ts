import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createUserController } from "./user.controller.js";
import { createUserSchema } from "./user.schema.js";

const router: Router = Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request
 */
router.post("/", validateRequest(createUserSchema), createUserController);

export default router;
