import { create } from "domain";
import mongoose from "mongoose"
import { type } from "os";

// define schema 
// a schema defines the structure of the documents in a collection 
// it specifies the fields, their types, and any validation rules
// in this case, we are creating a schema for a user model

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    email:{ 
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

    profilePhoto:{
        type: String,
        default:'https://unsplash.com/photos/a-man-in-a-white-shirt-is-posing-for-a-picture-mRVP1c59wko'
    }
}, 
// use timestamps to track creation and update times
{timestamps: true}
);


// creatr a user model from the schema
// this will create a collection  named 'users' in the database
// the collection name is automatically pluralized by mongoose
// so 'user' becomes 'users'


const User = mongoose.model("User", userSchema);

export default User;