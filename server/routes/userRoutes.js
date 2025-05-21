const express = require("express");
const router = express.Router(); // ✅ Declare router early

const {
  SignUp,
  Login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", SignUp);
router.post("/login", Login);

// Protected routes
router.get("/users", authMiddleware(["admin"]), getAllUsers); // Only admins
router.get("/users/:id", authMiddleware(), getUserById); // Any logged-in user
router.put("/users/:id", authMiddleware(), updateUser); // Any logged-in user
router.delete("/users/:id", authMiddleware(["admin"]), deleteUser); // Only admin

module.exports = router;
