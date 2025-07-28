import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'

export const signup =  async (req, res) => {
   const {username, email, password} = req.body

   // check if all fields are provided
   if (!username || !email || !password || username ==='' || email === '' || password === '') {
    return res.status(400).json({message: 'All fields are required'})
   }

 //hash the password 

 const hashedPassword = await bcrypt.hash(password,10)
 
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
    console.error('error saving user:', error);
    return res.status(500).json({message:error.message || 'Internal server error'})
   }
}