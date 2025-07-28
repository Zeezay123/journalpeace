import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenvv'

// load env file

dotenv.config();

const MongoDB_URL = process.env.MONGO_URL;

//function to connect to mongodb
const connectToDB = async () =>{
    try {
        mongoose.connect(MongoDB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('✅ Connected to MongoDB');

const app = express();
// express server
app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});
    }catch (error) {
        console.error('❗ Error connecting to MongoDB:', error);
        process.exit(1); // Stop the process if DB fails to connect
    }
}

connectToDB();
