const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getImagesByProperty,
  deleteImage,
} = require("../controllers/PropertyImageController");

router.post("/", uploadImage);
router.get("/:property_id", getImagesByProperty);
router.delete("/:id", deleteImage);

module.exports = router;
