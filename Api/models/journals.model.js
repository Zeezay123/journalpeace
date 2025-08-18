import mongoose from 'mongoose'


const journalSchema = new mongoose.Schema({
   
   filename:{
    type: String,
    required: true,

   },
   
    file: {
        type:String,
        required:true
    },

    details:{
        type: String
    },

    slug:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps:true}
)


const Journal = mongoose.model("Journal", journalSchema)

export default Journal