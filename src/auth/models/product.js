const productModel = (sequelize, DataTypes) =>
  sequelize.define("products", {
    cat: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    inventoryCount: { type: DataTypes.INTEGER },
  },{ timestamps: false });

module.exports = productModel;
