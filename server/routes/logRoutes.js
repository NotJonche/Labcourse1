const express = require("express");
const router = express.Router();
const { Log, User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/logs", authMiddleware(["admin"]), async (req, res) => {
  try {
    const logs = await Log.findAll({
      include: [{ model: User, attributes: ["email"] }],
      order: [["timestamp", "DESC"]],
    });
    res.status(200).json(logs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: err.message });
  }
});

module.exports = router;
