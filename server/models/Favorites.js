const { Model, DataTypes } = require("sequelize");
const { databaz } = require("../database");

class Favorite extends Model {}

Favorite.init(
  {
    favorite_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize: databaz,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: false,
  }
);

Favorite.associate = (models) => {
  Favorite.belongsTo(models.User, { foreignKey: "user_id" });
  Favorite.belongsTo(models.Property, { foreignKey: "property_id" });
};

module.exports = Favorite;
