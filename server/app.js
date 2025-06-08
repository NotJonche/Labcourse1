const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const { Server } = require("socket.io");

dotenv.config();
const PORT = process.env.PORT || 3000;

// HTTP + Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Database
const { connectToDatabase, databaz } = require("./database");
const models = require("./models");

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("place-bid", (bidData) => {
    console.log("New bid received:", bidData);
    io.emit("new-bid", bidData); // Broadcast to all connected users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/logRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const propertyImageRoutes = require("./routes/propertyImageRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const bidRoutes = require("./routes/bidRoutes");

// Route handlers
app.use("/api/logs", logRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/api/property-images", propertyImageRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);

// Boot up
(async () => {
  await connectToDatabase();
  // await databaz.sync({ alter: true });
  server.listen(PORT, () => {
    console.log(`Server & WebSocket running on port ${PORT}`);
  });
})();
module.exports = { io };
