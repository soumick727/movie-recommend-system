import bcrypt from "bcryptjs";
import jwt from "jasonwebtoken"
import User from "../models/user.model.js";
 export async function signup(req,res) {
    try{
        // Validation
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }
        // check if email is coorect or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email"
            })
        }
        // check if password is strong or not
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({
                success: false,
                message: "Please provide a strong password (at least 8 characters, including uppercase, lowercase, numbers, and special characters)"
            })
        }
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please login.",
            });
        }
        // check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Please choose a different one.",
            });
        }
        // Hash the password


    }
}

export async function login(req, res) {
    res.send("login route");
}

export async function logout(req, res) {
    res.send("logout route");
}