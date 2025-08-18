import Journal from "../models/journals.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req,res,next)=>{

     console.log(req.body)

     if(!req.user.isAdmin){
     return next(errorHandler(403,'you are not allowed post journal'))
     }

     if(!req.body.filename || !req.body.file ){
        return next(errorHandler(400, 'all fields required'))
     }

    console.log('filename:', req.body.filename, typeof req.body.filename);

    const slug = req.body.filename
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g,'') 

    const newJournal = new Journal({
        ...req.body,
        slug,
        userId: req.user.id,
    })


    try {
        
  const  savedJournal = await newJournal.save()
  res.status(201).json(savedJournal)

    } catch (error) {
        next(error)
    }

}


export const getJournal = async (req,res,next) => {

    try{
        const journals = await Journal.find()

     
 

    const totalJournals = await Journal.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );

 const lastmonthJournal = await Journal.countDocuments({
    createdAt:{$gte: oneMonthAgo},})

    const response = {
        journals,
        totalJournals,
        lastmonthJournal
    }

    res.status(200).json(response)

   } catch(error){
        next(error)
    }
}


export const  updateJournal = async (req,res,next) => {
    if(!req.body.isAdmin || req.user.id !== req.params.userId){
     return next(errorHandler(403,'you are not an Admin'))
    }

    try {

     const updateJournal = await Journal.findByIdAndUpdate(req.params.journalId,{
        $set:{
            filename: req.body.filename,
            file: req.body.file,
            details:req.body.details

        }
     }, {new: true})

        res.status(200).json(updateJournal)
    } catch (error) {
        next(error)
    }
}


export const deleteJournal = async (req, res, next)=>{

       if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return  next(errorHandler(403,'you dont have permission to delete'))
    }

    try{

      await Journal.findByIdAndDelete(req.params.journalId)

      res.status(200).json('Jornal deleted successfully')
    }catch(error){
        next(error)
    }
}