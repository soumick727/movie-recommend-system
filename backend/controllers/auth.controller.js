import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
 export async function signup(req,res) {
    try{
        // Validation
        const { username, email, password, image } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }
        // check if email is correct or not
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                 message: "Please provide a valid Gmail address (must end with @gmail.com)"
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
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

         const PROFILE_PICS = "/images/default_image.jpg";

        // Create and save the user
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            image: image || PROFILE_PICS,
        });

        // save user to database
        await newUser.save();

        // Ensure JWT_SECRET is available
        if(!process.env.JWT_SECRET){
            return res.status(500).json({
                success: false,
                message: "No JWT_SECRET provided. Please set it in your environment variables."
            });
        }

        

        // generate jwt token
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        // add user id to cookie
        res.cookie("token",token,{
            httpOnly: true, // prevent XSS attacks on cross-site scripting attacks, male it not be accessed by JS
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, // send token to client
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                image: newUser.image,
            },
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function login(req, res) {
    try {
        // Validation
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found. Please sign up.",
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password. Please try again.",
            });
        }

        // Ensure JWT_SECRET is available
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "No JWT_SECRET provided. Please set it in your environment variables.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Add user ID to cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });  
    }
}

export async function logout(req, res) {
    try {
        // clear the cookie
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite:"strict",
        });
        //send a success response
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export async function checkAuth(req, res) {
   try {
     // 🔍 Add this line to see if the cookie is coming through
     console.log("Cookies received:", req.cookies);
    console.log("req.user:", req.user); // Debugging log to check user data
      res.status(200).json({
         success: true,
         message: "User is authenticated",
         user: req.user, // Send the authenticated user data
      });
        

   } catch (error) {
        console.log("Error checking authentication:", error.message);
        res.status(500).json({
             success: false,
             message: "Server error",
        });
   }
}