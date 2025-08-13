import Announce from "../models/announce.model.js";
import { errorHandler } from "../utils/error.js";




export const create = async(req,res,next)=>{
 
if(!req.user.isAdmin){
return next(errorHandler(403, 'you are not allowed to create a post'))

}

 if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }
 
    const newAnnounce = new Announce({
        ...req.body,
    })


try {
   
const savedAnnounce = await newAnnounce.save()
res.status(201).json(savedAnnounce)


} catch (error) {
    next(error)
}

}


export const getAnnounce= async (req,res,next)=>{
try {
    
    const announce = await Announce.findOne()
    
        if (!announce) {
      return res.status(404).json({ message: "Settings not found" });
    }

    res.status(200).json(announce)

} catch (error) {
    next(error)
}
    
}

export const updateAnnounce = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update settings"));
  }

  try {
  
    const updateData = req.body

    const updateAnnounce = await Announce.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(updateAnnounce);
  } catch (error) {
    next(error);
  }
};
