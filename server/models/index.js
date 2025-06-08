const User = require("./User");
const House = require("./House");
const Property = require("./Property");
const PropertyImage = require("./PropertyImage");
const Flat = require("./Flat");
const Transaction = require("./Transactions");
const Appointment = require("./Appointment");
const Logs = require("./Logs");
const Role = require("./Roles");
const Favorites = require("./Favorites");
const Auction = require("./Auction");
const Bid = require("./Bid");

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

const models = {
  User,
  House,
  Property,
  Flat,
  Transaction,
  Appointment,
  Role,
  PropertyImage,
  Favorites,
  Logs,
  Auction,
  Bid,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
