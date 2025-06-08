const { Model, DataTypes } = require("sequelize");
const { databaz } = require("../database");

class Auction extends Model {}

Auction.init(
  {
    auction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    starting_price: { type: DataTypes.DECIMAL, allowNull: false },
    current_price: { type: DataTypes.DECIMAL, allowNull: false },
    winner_id: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.ENUM("active", "closed"),
      defaultValue: "active",
    },
  },
  {
    sequelize: databaz,
    modelName: "Auction",
    tableName: "auctions",
  }
);

Auction.associate = (models) => {
  Auction.belongsTo(models.Property, { foreignKey: "property_id" });
  Auction.belongsTo(models.User, { foreignKey: "winner_id" });
};

module.exports = Auction;
