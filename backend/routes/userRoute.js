const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { updateUser, deleteUser, getUser } = require("../controllers/userController");
router.route("/updateUser/:id").put(protect, updateUser);
router.route("/deleteUser/:id").delete(protect, deleteUser)
router.route("/getUser/:id").get(protect, getUser)
module.exports = router;