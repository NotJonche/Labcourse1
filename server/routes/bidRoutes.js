const express = require("express");
const router = express.Router();
const { placeBid, getBidsByAuction } = require("../controllers/BidController");

router.post("/", placeBid);
router.get("/:auction_id", getBidsByAuction);

module.exports = router;
