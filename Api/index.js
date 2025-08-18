import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';
import postRoutes from './Routes/post.route.js';
import facultyRoutes from './Routes/faculty.route.js'
import departRoutes from './Routes/depart.route.js';
import courseRoutes from './Routes/course.route.js'
import settingRoutes from './Routes/settings.route.js'
import staffRoutes from './Routes/staff.route.js'
import cookieParser from 'cookie-parser';
import announceRoutes from './Routes/announce.route.js'
import focusRoutes from './Routes/focus.route.js'
import journalRoutes from './Routes/journal.route.js'


// Load environment variables from .env file
// This allows us to use variables like MONGO_URL and JWT_SECRET from the .env file
dotenv.config();

// Get the MongoDB connection string from environment variables
const MONGO_URL = process.env.MONGO_URL;

const app = express();


app.use(express.json()); 
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

//create faculty routes

app.use('/api/faculty', facultyRoutes )
app.use('/api/departments', departRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/settings', settingRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/announce', announceRoutes)
app.use('/api/focus', focusRoutes )
app.use('/api/journal', journalRoutes)
app.use('/api/post',postRoutes)



const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'peace-page/dist'))); 

// // Handle all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'peace-page', 'dist', 'index.html'));
});


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
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        })
        
    } catch(error) {
        // If database connection fails, log the error and stop the application
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit with error code 1 to indicate failure
    }
}

// Start the database connection process
connectToDb()
