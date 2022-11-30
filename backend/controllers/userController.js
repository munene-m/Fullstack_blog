const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const updateUser = asyncHandler( async ( req, res ) => {
    if( req.user.id === req.params.id ) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedUser)
        } catch(error) {
            console.log(error)
        }
    } else {
        res.status(401).json("You can only update your account!");
      }
});

const deleteUser = asyncHandler( async( req, res ) => {
   if( req.user.id === req.params.id) {
    const user = await User.findById(req.params.id);
    try {
        await Post.deleteMany({ username : user.username})
        await User.findByIdAndDelete(user)
        res.status(200).json({ id: req.params.id})
    } catch(error) {
        res.status(404).json("User not found")
    }
   } else {
    res.status(401).json("You can only delete your account!")
   }
}
);

const getUser = asyncHandler( async( req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json(user)
})

module.exports = {
    updateUser,
    deleteUser,
    getUser
}