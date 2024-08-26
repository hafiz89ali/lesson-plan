import { Router } from "express";
import healtController from "../controllers/health.js";
import pool from "../database/connection.js";

const router = Router();

router.get("/health", healtController.getHealth);
router.post("/health", healtController.postHealth);

export default router;
