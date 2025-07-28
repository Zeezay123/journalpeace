import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';

// Load environment variables from .env file
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// function to connect to MongoDB
const connectToDb =  async()=>{

try{   
     await mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

console.log('Connected to MongoDB');

// setting up a simple Express server
const app = express();

// Middleware to parse JSON bodies 
// allows us to handle JSON requests and responses

app.use(express.json()); 

app.listen(3000, ()=>{

    console.log('Server is running on port 3000');
})



// Mount user routes
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

}catch(error){
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Stop the process if DB fails to connect
  }
}

connectToDb()