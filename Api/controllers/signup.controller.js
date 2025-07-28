import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup =  async (req, res, next) => {
  // extract username, email, and password from request body
  // these are the fields we expect from the client
   const {username, email, password} = req.body

   // check if all fields are provided
   if (!username ||
     !email ||
     !password || 
     username ==='' ||
     email === '' 
     || password === '') {
    // return res.status(400).json({message: 'All fields are required'})
    next(errorHandler(400, 'All fields are required'));
   }

 //hash the password 

 const hashedPassword = bcryptjs.hashSync(password,10)
 
   const newUser = new User({
    username,
    email,
    password: hashedPassword
   })

   //save the user to the database

   try{
    await newUser.save()
    // respond with sucesss message
    // and the created user object
    // this will return the user object with the _id field
    res.json({message: 'User created successfully', user: newUser})
   }catch (error){
    
    // if there is an error, respond with an error message
next(error)}
}