import { Router } from "express";
import healtController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import createLessonPlan from "../controllers/lesson_plan/create.js";

const router = Router();

router.get("/health", healtController.getHealth);
router.post("/health", healtController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Lesson plan router
const lessonPlanRouter = Router();

// nested /lessonplan router
router.use("/lessonplan");

// middleware to all /lessonplan routes
lessonPlanRouter.use(isAuth);

// /lessonplan routes
lessonPlanRouter.post("/", createLessonPlan);

export default router;
