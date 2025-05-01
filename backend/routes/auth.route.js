import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get("/checkAuth", verifyToken, checkAuth); // Check authentication status

export default router;
