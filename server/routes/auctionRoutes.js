const express = require("express");
const router = express.Router();
const {
  createAuction,
  getActiveAuctions,
  getAuctionById,
} = require("../controllers/AuctionController");

router.post("/", createAuction);
router.get("/", getActiveAuctions);
router.get("/:id", getAuctionById);

module.exports = router;
