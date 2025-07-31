import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware function to verify JWT tokens
// This function checks if a user is authenticated before allowing access to protected routes
export const verifyToken = (req, res, next) => {
  // Extract the JWT token from the 'access_token' cookie
  // When users sign in, we store their JWT token in an httpOnly cookie for security
  const token = req.cookies.access_token;

  // Check if token exists
  // If no token is found, the user is not authenticated
  if (!token) {
    return next(errorHandler(401, "Unauthorized - No token provided"));
  }

  // Verify the token using the JWT_SECRET from environment variables
  // This checks if the token is valid and hasn't been tampered with
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If token verification fails (expired, invalid, or wrong secret)
    if (err) {
      return next(errorHandler(401, "Unauthorized - Invalid token"));
    }

    // If token is valid, extract user information from the token payload
    // The 'user' object contains the data we encoded when creating the token (like user ID)
    req.user = user;
    
    // Call next() to proceed to the next middleware or route handler
    // This allows the protected route to access req.user with the authenticated user's info
    next();
  })
}
