import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async(req, res, next)=>{
  const {username, password} = req.body

  if(!username || !password){
    return next(errorHandler(400, 'Username and password are required'))
  }

  //find the user by username
  try{
  const validUser = await User.findOne({username})
  if (!validUser){
    return next(errorHandler(404, 'User not found'))
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password)
  if(!validPassword){
    return next(errorHandler(401, 'Invalid password'))
  }

const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn:'30ms'})
// remove the password from the user object before sending it to the client
// this is to prevent sending sensitive information to the client
const {password:pass, ...rest } = validUser._doc


res.status(200).cookie('access_token', token, {
  httpOnly: true}).json(rest)

  }catch(error){
    return next(error)
  }
}


export const google = async(req, res, next) => {
const {name, email, googlePhotoUrl} = req.body
try{
const user = await User.findOne({email})

if(user){
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  const {password, ...rest} = user._doc;
  res.status(200).cookie('access_token', token,{
    httpOnly: true}).json(rest)
}else{
  const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
  const hashedPassword = bcryptjs.hashSync(generatePassword, 10)

  const newUser = new User({
    //conver names like Azeez Asaju => azeezasaju893038  
    username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
    email, 
    password: hashedPassword,
    profilePhoto: googlePhotoUrl,
    
  })

  await newUser.save()
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
  const {password, ...rest} = newUser._doc

  res.status(200).cookies('access_token', token, {
    httpOnly: true,
  }).json(rest)

  console.log(googlePhotoUrl)
}

} catch(error){
  next(error)
}


}