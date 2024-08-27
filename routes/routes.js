import { Router } from "express";
import healtController from "../controllers/health.js";
import authController from "../controllers/auth.js";

const router = Router();

router.get("/health", healtController.getHealth);
router.post("/health", healtController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

export default router;
