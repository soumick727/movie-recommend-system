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
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        // Check if user exists in the database
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}
    
       
    