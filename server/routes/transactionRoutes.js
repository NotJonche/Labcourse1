const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  deleteTransaction,
} = require("../controllers/TransactionController");

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.get("/user/:user_id", getUserTransactions);
router.delete("/:id", deleteTransaction);

module.exports = router;
