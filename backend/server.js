import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";


// connectDB(value); //connect to mangoDB
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://harihari71775:Ey6P2vquiY18mrZS@cluster0.i9gmnew.mongodb.net/';
connectDB(mongoURI);
const port =  5001;

const app = express();
//body parser middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
//cookieParser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Static file serving for uploads (only in non-Vercel environments)
// On Vercel, use cloud storage instead
if (process.env.VERCEL !== '1') {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running....");
});

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend API is running" });
});

app.use(notFound);
app.use(errorHandler);

// Only listen if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`server running on port ${port}`));
}

export default app;
