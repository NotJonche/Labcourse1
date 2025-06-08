const { PropertyImage, Property } = require("../models");

// Upload a new image (URL-based)
const uploadImage = async (req, res) => {
  try {
    const { property_id, image_url } = req.body;

    if (!property_id || !image_url) {
      return res
        .status(400)
        .json({ message: "property_id and image_url are required" });
    }

    const newImage = await PropertyImage.create({
      property_id,
      image_url,
    });

    res.status(201).json({ message: "Image uploaded", data: newImage });
  } catch (error) {
    console.error("uploadImage error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all images for a specific property
const getImagesByProperty = async (req, res) => {
  try {
    const { property_id } = req.params;

    const images = await PropertyImage.findAll({
      where: { property_id },
    });

    res.status(200).json(images);
  } catch (error) {
    console.error("getImagesByProperty error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a specific image by image_id
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await PropertyImage.destroy({
      where: { image_id: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    console.error("deleteImage error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  uploadImage,
  getImagesByProperty,
  deleteImage,
};
