const asyncHandler = require('express-async-handler');
const Post = require("../models/Post");
const User = require("../models/User");
const getAllPosts = asyncHandler( async ( req, res ) => {
    const posts = await Post.find().sort({"createdAt": -1});
    res.status(200).json(posts)
});
const getMyPosts = asyncHandler( async ( req, res ) => {
    const posts = await Post.find({ user: req.user.id }).sort({"createdAt": -1});
    res.status(200).json(posts);
});

const createPost = asyncHandler( async ( req, res ) => {
    const { title, username, desc } = req.body;

    if( !title || !username || !desc ) {
        res.status(400);
        throw new Error(" Please add all the required fields");
    };

    const post = await Post.create({
        title,
        username,
        desc,
        user: req.user.id
    });

    if(post) {
        res.status(201);
        res.json({
            _id: post.id,
            title: post.title,
            username: post.username,
            desc: post.desc,
        })
    } else {
        res.status(400);
        throw new Error(" An error occurred");
    }
});


const singlePost = asyncHandler( async ( req, res ) => {
    const post = await Post.findById( req.params.id );
    if( !post ) {
        res.status(404);
        throw new Error(" Post not found")
    } else {
        res.status(200).json(post)
    }
})

const updatePost = asyncHandler( async( req, res ) => {
    const post = await Post.findById(req.params.id);

    if(!post) {
        res.status(404);
        throw new Error("Post not found");  
    };

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found");
    };

    if(post.user.toString() !== user.id) {
        res.status(401);
        throw new Error(" User not authorized")
    };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
});

const deletePost = asyncHandler( async( req, res ) => {
    const post = await Post.findById(req.params.id);
    if(!post) {
        res.status(404);
        throw new Error(" Post not found ");
    }

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found")
    };

    if(post.user.toString() !== user.id) {
        res.status(401);
        throw new Error(" User not authorized");
    };

    await post.remove();
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getAllPosts,
    getMyPosts,
    createPost,
    updatePost,
    deletePost,
    singlePost
}