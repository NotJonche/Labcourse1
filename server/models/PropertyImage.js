const { Model, DataTypes } = require("sequelize");
const { databaz } = require("../database");

class PropertyImage extends Model {}

PropertyImage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize: databaz,
    modelName: "PropertyImage",
    tableName: "property_images",
    timestamps: false,
  }
);

PropertyImage.associate = (models) => {
  PropertyImage.belongsTo(models.Property, { foreignKey: "property_id" });
};

module.exports = PropertyImage;
