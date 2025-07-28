export const test =(req, res, next)=>{
    try{
         res.json({message: 'Test route is working'})
    } catch(error){
        next(error);
    }
   

}