const express = require("express")
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllPosts, getMyPosts, createPost, updatePost, singlePost, deletePost } = require("../controllers/postController");
router.route("/").get(getAllPosts);
router.route("/myPosts").get(protect, getMyPosts);
router.route("/create").post(protect, createPost);
router.route("/update/:id").put(protect, updatePost);
router.route("/blog/:id").get(protect, singlePost);
router.route("/delete/:id").delete(protect, deletePost);    

module.exports = router;