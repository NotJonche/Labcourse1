const { Bid, Auction, User } = require("../models");
const { io } = require("../app");

const placeBid = async (req, res) => {
  try {
    const { auction_id, user_id, amount } = req.body;

    const auction = await Auction.findByPk(auction_id);
    if (!auction || auction.status !== "active") {
      return res.status(400).json({ message: "Auction not active" });
    }

    if (parseFloat(amount) <= parseFloat(auction.current_price)) {
      return res.status(400).json({ message: "Bid too low" });
    }

    const bid = await Bid.create({ auction_id, user_id, amount });
    auction.current_price = amount;
    await auction.save();

    const user = await User.findByPk(user_id, { attributes: ["name"] });

    io.emit("new-bid", {
      auction_id,
      user_id,
      amount,
      created_at: new Date(),
      User: user,
    });

    res.status(201).json({ message: "Bid placed", data: bid });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to place bid", error: err.message });
  }
};

const getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.findAll({
      where: { auction_id: req.params.auction_id },
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["amount", "DESC"]],
    });

    res.status(200).json(bids);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bids", error: err.message });
  }
};

module.exports = { placeBid, getBidsByAuction };
