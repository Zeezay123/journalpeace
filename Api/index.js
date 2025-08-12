import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';
import postRoutes from './Routes/post.route.js';
import facultyRoutes from './Routes/faculty.route.js'
import departRoutes from './Routes/depart.route.js';
import courseRoutes from './Routes/course.route.js'
import settingsRoutes from './Routes/siteSettings.route.js'
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
// This allows us to use variables like MONGO_URL and JWT_SECRET from the .env file
dotenv.config();

// Get the MongoDB connection string from environment variables
const MONGO_URL = process.env.MONGO_URL;

// Create Express app instance
// This is the main application object that will handle all HTTP requests
const app = express();

// Middleware to parse JSON bodies 
// This allows our server to understand JSON data sent in requests
// Without this, req.body would be undefined when clients send JSON data
app.use(express.json()); 

// Middleware to parse cookies
// This allows us to read cookies from incoming requests
// We use this to get the JWT token stored in cookies for authentication
app.use(cookieParser());

// Mount user routes
// All routes starting with '/api/users' will be handled by userRoutes
// For example: GET /api/users/test, PUT /api/users/update/123
app.use('/api/users', userRoutes);

// Mount authentication routes  
// All routes starting with '/api/auth' will be handled by authRoutes
// For example: POST /api/auth/signup, POST /api/auth/signin
app.use('/api/auth', authRoutes);

//create faculty routes

app.use('/api/faculty', facultyRoutes )
app.use('/api/departments', departRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/settings', settingsRoutes)
//create blog routes
app.use('/api/post',postRoutes)
// Error handling middleware 
// This catches any errors that occur in the app and sends a proper JSON response
// It must be placed AFTER all routes to catch errors from them
// The 4 parameters (err, req, res, next) are required for Express error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Use custom status code or default to 500
    const message = err.message || 'Internal Server Error'; // Use custom message or default
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

// Function to connect to MongoDB database
const connectToDb = async () => {
    try {   
        // Attempt to connect to MongoDB using the connection string from .env
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,    // Use new URL parser to avoid deprecation warnings
            useUnifiedTopology: true, // Use new connection management engine
        })
        
        console.log('Connected to MongoDB');
        
        // Start the server only AFTER successful database connection
        // This ensures the app doesn't accept requests if the database is unavailable
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
        
    } catch(error) {
        // If database connection fails, log the error and stop the application
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit with error code 1 to indicate failure
    }
}

// Start the database connection process
connectToDb()
