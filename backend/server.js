import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "ProShop API is running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

// Debug endpoint to check cookies
app.get("/api/debug/cookies", (req, res) => {
  res.status(200).json({
    cookies: req.cookies,
    hasJwtCookie: !!req.cookies.jwt,
    headers: {
      cookie: req.headers.cookie,
      authorization: req.headers.authorization,
    }
  });
});

// API ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// ERROR HANDLERS (always last)
app.use(notFound);
app.use(errorHandler);

export default app;
