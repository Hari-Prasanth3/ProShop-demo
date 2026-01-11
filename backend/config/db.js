import mongoose from "mongoose";

const connectDB = async(value) =>{
    try {
        const conn = await mongoose.connect(value);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
        
    }
}
export default connectDB;