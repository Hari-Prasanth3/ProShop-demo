import mongoose from "mongoose";

let isConnected = false;

const connectDB = async(value) =>{
    // Return early if already connected
    if (isConnected) {
        return;
    }

    try {
        const conn = await mongoose.connect(value, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
            process.exit(1);
        }
        throw error;
    }
}
export default connectDB;