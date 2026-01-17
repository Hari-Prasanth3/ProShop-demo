import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the JWT from the cookie
  token = req.cookies.jwt;
  
  // Fallback: check Authorization header if cookie is not present
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log('Auth check - Has cookie:', !!req.cookies.jwt, 'Has auth header:', !!req.headers.authorization, 'Token found:', !!token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }
      next();
    } catch (error) {
      console.log('Token verification error:', error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    console.log('No token found in request');
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});
//admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
export { protect, admin };
