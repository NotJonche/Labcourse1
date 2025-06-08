const { Favorite, Property, User } = require("../models");

// Create a favorite (user saves a property)
const addFavorite = async (req, res) => {
  try {
    const { user_id, property_id } = req.body;
    if (!user_id || !property_id) {
      return res
        .status(400)
        .json({ message: "Missing user_id or property_id" });
    }

    const existing = await Favorite.findOne({
      where: { user_id, property_id },
    });
    if (existing) return res.status(409).json({ message: "Already favorited" });

    const favorite = await Favorite.create({ user_id, property_id });
    res.status(201).json({ message: "Favorite added", data: favorite });
  } catch (err) {
    console.error("addFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all favorites for a user
const getUserFavorites = async (req, res) => {
  try {
    const { user_id } = req.params;
    const favorites = await Favorite.findAll({
      where: { user_id },
      include: [Property],
    });
    res.status(200).json(favorites);
  } catch (err) {
    console.error("getUserFavorites error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove a favorite
const removeFavorite = async (req, res) => {
  try {
    const { user_id, property_id } = req.body;
    const removed = await Favorite.destroy({ where: { user_id, property_id } });

    if (!removed)
      return res.status(404).json({ message: "Favorite not found" });

    res.status(200).json({ message: "Favorite removed" });
  } catch (err) {
    console.error("removeFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite,
};
