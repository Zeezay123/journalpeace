import mongoose from 'mongoose'

const announceSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'Announcement'
    },

    content:{
        type:String,
        default:'content goes here'
    }
},
{timestamp:true})

const Announce = mongoose.model("Announce", announceSchema )

export default Announce