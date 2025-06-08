const { Model, DataTypes } = require("sequelize");
const { databaz } = require("../database");

class Log extends Model {}
Log.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    details: DataTypes.TEXT,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: databaz,
    modelName: "Log",
    tableName: "logs",
    timestamps: false,
  }
);
Log.associate = (models) => {
  Log.belongsTo(models.User, { foreignKey: "user_id" });
};
module.exports = Log;
