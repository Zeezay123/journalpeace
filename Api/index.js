import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

console.log('✅ Connected to MongoDB');

// setting up a simple Express server
const app = express();

app.listen(3000, ()=>{
 const app = express();
    console.log('Server is running on port 3000');
})

}catch(error){
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Stop the process if DB fails to connect
  }
}

connectToDb()