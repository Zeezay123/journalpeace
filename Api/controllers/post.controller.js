import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

// Create new blog post (admin only)
export const create = async (req, res, next) => {
    console.log(req.body)

    // Check if user is admin
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'you are not allowed to create a post'))
    }

    // Validate required fields
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }

    // Generate URL-friendly slug from title
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '')

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    })

    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

// Get posts with filtering, searching, and pagination
export const getPosts = async (req, res, next) => {
    try {
        console.log('getPosts called with query:', req.query);
        
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        // Build filter object
        const filter = {
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            })
        };

        console.log('Filter object:', filter);

        const posts = await Post.find(filter)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        console.log('Found posts:', posts.length);

        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        const response = {
            posts,
            totalPosts,
            lastMonthPosts,
        };

        console.log('Sending response:', response);
        res.status(200).json(response);

    } catch (error) {
        console.error('Error in getPosts:', error);
        next(error)
    }
}


export const deletePost = async (req, res, next)=>{
  console.log(req.params)

    if( !req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, 'user not Authorized to delete post'))
    }
   try {
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json('User successfully deleted')
   } catch (error) {
    next(error)
   }


}


export const updatePost = async (req, res, next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, 'user not Authorized to update post'))
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId,{
        $set:{
            title:req.body.title,
            content:req.body.content,
            category:req.body.category,
            image:req.body.image,
           
        }
      }, {new: true} )

     res.status(200).json(updatedPost)
    } catch(error){
        console.log(error.message)
    }
}


