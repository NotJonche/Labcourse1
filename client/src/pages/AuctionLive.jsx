import React, { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";

const AuctionLive = ({ auctionId = 1 }) => {
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [user_id] = useState(3); // test user

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/bids/${auctionId}`);
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching bids:", err);
      }
    };
    fetchBids();
  }, [auctionId]);

  useEffect(() => {
    socket.on("new-bid", (bid) => {
      if (bid.auction_id === auctionId) {
        setBids((prev) => [bid, ...prev]);
      }
    });

    return () => {
      socket.off("new-bid");
    };
  }, [auctionId]);

  const handlePlaceBid = () => {
    if (!amount) return;
    socket.emit("place-bid", {
      auction_id: auctionId,
      user_id,
      amount: parseFloat(amount),
      created_at: new Date()
    });
    setAmount("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Live Auction #{auctionId}</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Enter your bid"
        />
        <button onClick={handlePlaceBid} className="bg-blue-600 text-white px-4 py-2 rounded">
          Bid
        </button>
      </div>

      <ul className="bg-white border rounded-lg p-4 space-y-2">
        {bids.map((bid, idx) => (
        <li key={idx}>
    💰   <strong>${bid.amount}</strong> by{" "}
           <span className="font-semibold">
               {bid.User?.name}
            </span>
        @   {new Date(bid.created_at).toLocaleTimeString()}
        </li>
          ))}
      </ul>
    </div>
  );
};

export default AuctionLive;
