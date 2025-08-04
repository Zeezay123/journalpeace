import mongoose from "mongoose"

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: 'https://unsplash.com/photos/a-man-in-a-white-shirt-is-posing-for-a-picture-mRVP1c59wko'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
