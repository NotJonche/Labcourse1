const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const { Log } = require("../models/Logs");
require("dotenv").config();

const createToken = (user_id) => {
  try {
    return JWT.sign({ user_id }, process.env.SECRET, { expiresIn: "3d" });
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Failed to generate token");
  }
};

// SignUp
const SignUp = async (req, res) => {
  try {
    const { name, email, password, phone, role_id = 1 } = req.body;

    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({
          status: 0,
          mssg: "Please make sure to fill out all the fields!",
        });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: 0, mssg: "This email is invalid!" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: 0, data: "This user already exists" });
    }

    if (role_id !== 2 && !validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ status: 0, mssg: "Password is not strong enough" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      phone,
      role_id: 1,
    });

    const token = createToken(newUser.user_id);

    // Optional: add logging after you confirm this works
    // await Log.create({ user_id: newUser.user_id, action: "signup", details: `User ${newUser.email} registered.` });

    return res.status(201).json({ status: 1, data: newUser, token });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ status: 0, data: err.message || "Internal server error" });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ mssg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ mssg: "Incorrect password" });
    }

    const token = JWT.sign({ user_id: user.user_id }, process.env.SECRET, {
      expiresIn: "3d",
    });

    // ✅ Log the login activity BEFORE sending the response
    await Log.create({
      user_id: user.user_id,
      action: "login",
      details: `User ${user.email} logged in.`,
    });

    return res.status(200).json({
      mssg: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ mssg: "Server error during login" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mssg: "Failed to fetch users", error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ mssg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ mssg: "Error fetching user", error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ mssg: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();
    res.status(200).json({ mssg: "User updated", data: user });
  } catch (error) {
    res.status(500).json({ mssg: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await User.destroy({ where: { user_id: id } });
    if (rows === 0) return res.status(404).json({ mssg: "User not found" });

    res.status(200).json({ mssg: "User deleted" });
  } catch (error) {
    res.status(500).json({ mssg: "Error deleting user", error });
  }
};

module.exports = {
  SignUp,
  Login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
