import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import  dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

export async function verifyToken(req, res, next) {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}
    
       
    