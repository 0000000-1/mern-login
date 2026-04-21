import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./route/authRoutes.js"; 
import axios from "axios"
import { connectDB } from "./config/db.js"

// ... other code ...

// JUST THIS ONE LINE TO ACTIVATE THEM ALL

import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']); // Use Cloudflare and Google DNS

dotenv.config()
connectDB();

const app = express()
app.use(cors()); // Allows all origins by default
app.use(express.json()); // Essential to read data from req.body

app.use("/api/auth", authRoutes);
// connectDB()
const PORT = process.env.PORT || 5003

app.get("/",(req,res)=>{
    res.send("server is running!")//this is must for browser to prevent  form spinning 
})
app.listen(PORT,()=>{
    console.log("connect");
})