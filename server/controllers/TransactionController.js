const { Transaction, User, Property } = require("../models");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { buyer_id, property_id, sale_price, transaction_date } = req.body;

    if (!buyer_id || !property_id || !sale_price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await Transaction.create({
      buyer_id,
      property_id,
      sale_price,
      transaction_date: transaction_date || new Date(),
    });

    res
      .status(201)
      .json({ message: "Transaction recorded", data: transaction });
  } catch (error) {
    console.error("createTransaction error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.errors || null,
    });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({
      include: [User, Property],
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.error("getAllTransactions error:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

// Get transactions for a specific user
const getUserTransactions = async (req, res) => {
  const { user_id } = req.params;

  try {
    const transaction = await Transaction.findAll({
      where: { buyer_id: user_id },
      include: [Property],
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.error("getUserTransactions error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Transaction.destroy({ where: { transaction_id: id } });
    if (rows === 0)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("deleteTransaction error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  deleteTransaction,
};
