const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} = require("../controllers/FavoriteController");

router.post("/", addFavorite);
router.get("/:user_id", getUserFavorites);
router.delete("/", removeFavorite); // expects user_id and property_id in body

module.exports = router;
