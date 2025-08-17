import { Router } from "express";
import userRouter from "./modules/user/user.router.js";

const router: Router = Router();

router.use("/api/users", userRouter);

export default router;
