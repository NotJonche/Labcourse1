const { Model, DataTypes } = require("sequelize");
const { databaz } = require("../database");

class Bid extends Model {}

Bid.init(
  {
    bid_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    auction_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize: databaz,
    modelName: "Bid",
    tableName: "bids",
    timestamps: false,
  }
);

Bid.associate = (models) => {
  Bid.belongsTo(models.User, { foreignKey: "user_id" });
  Bid.belongsTo(models.Auction, { foreignKey: "auction_id" });
};

module.exports = Bid;
