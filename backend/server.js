import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();

//MIddleware
app.use(express.json()); // will allow us to parse req.body 
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}))

// routes
app.use("/api/v1/auth",authRoutes);



// Database Connection
  // Debugging log



mongoose.connect('mongodb://localhost:27017/movie-website').then(()=>{
    console.log('mongodb connected')
}).catch(err => console.log(err))

app.listen(5000,(port) => {
    console.log('server on running on port 5000')  // Debugging log
})
