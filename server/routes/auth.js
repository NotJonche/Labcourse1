const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ mssg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ mssg: "Incorrect password" });
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({ mssg: "Login successful", user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ mssg: "Server error during login" });
  }
});

module.exports = router;
