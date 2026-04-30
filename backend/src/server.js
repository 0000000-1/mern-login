import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./route/authRoutes.js"; 
import { connectDB } from "./config/db.js"

// 1. REMOVE the dns.setServers lines. 
// Vercel manages DNS automatically; hardcoding them can cause connection timeouts.

dotenv.config()
connectDB();

const app = express()

// 2. CONFIGURE CORS properly for Vercel
app.use(cors({
    origin: "*", // Or your frontend Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
})

// 3. FIX THE EXPORT for ES Modules
// Vercel needs 'export default' when using 'import' statements
export default app;

// Keep this for local testing only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
