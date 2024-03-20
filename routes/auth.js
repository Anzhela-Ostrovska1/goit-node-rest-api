import express from "express";
import controllers from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, emailSchema } from "../models/user.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), controllers.register);

router.get("/verify/:verificationToken", controllers.verify);

router.post(
  "/verify",
  validateBody(emailSchema),
  controllers.resendVerifyEmail
);
router.post("/login", validateBody(loginSchema), controllers.login);
router.get("/current", authenticate, controllers.getCurrent);
router.post("/logout", authenticate, controllers.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

export default router;
