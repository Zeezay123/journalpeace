import mongoose from 'mongoose';

// Post schema definition
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        }, 
        image: {
            type: String,
            default: 'https://unsplash.com/photos/a-man-in-a-white-shirt-is-posing-for-a-picture-mRVP1c59wko'
        },
        category: {
            type: String,
            default: 'uncategorized',
        }, 
        slug: {
            type: String,
            required: true,
            unique: true,
        }
    }, 
    { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

export default Post
