const { Auction, Property, User } = require("../models");

const createAuction = async (req, res) => {
  try {
    const { property_id, start_time, end_time, starting_price } = req.body;

    const auction = await Auction.create({
      property_id,
      start_time,
      end_time,
      starting_price,
      current_price: starting_price,
    });

    res.status(201).json({ message: "Auction created", data: auction });
  } catch (err) {
    console.error("createAuction error:", err);
    res
      .status(500)
      .json({ message: "Failed to create auction", error: err.message });
  }
};

const getActiveAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll({
      where: { status: "active" },
      include: [Property],
    });

    res.status(200).json(auctions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch auctions", error: err.message });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findByPk(req.params.id, {
      include: [Property, User],
    });

    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.status(200).json(auction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching auction", error: err.message });
  }
};

module.exports = { createAuction, getActiveAuctions, getAuctionById };
