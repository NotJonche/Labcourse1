const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");

dotenv.config();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const { connectToDatabase, databaz } = require("./database");
const models = require("./models");

const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/logRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Route handlers
app.use("/api/logs", logRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/transactions", transactionRoutes);

(async () => {
  await connectToDatabase();
  // await databaz.sync({ force: true });
  app.listen(3000, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
})();
