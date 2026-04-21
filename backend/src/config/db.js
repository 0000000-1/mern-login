import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () =>{
    const db = process.env.MONGO_URI

    try {
        const conn = await mongoose.connect(db)
        console.log("connectdb");
    } catch (error) {
        console.log("not connected db",error);
    }
}