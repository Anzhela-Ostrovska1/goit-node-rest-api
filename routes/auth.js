import express from "express";
import controllers from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../models/user.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), controllers.register);
router.post("/login", validateBody(loginSchema), controllers.login);
router.get("/current", authenticate, controllers.getCurrent);
router.post("/logout", authenticate, controllers.logout);
export default router;
