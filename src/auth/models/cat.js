const catModel = (sequelize, DataTypes) => sequelize.define('cats', {
    normalizedName: { type: DataTypes.STRING },
    displayName: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },

  
  },{ timestamps: false });
  
  module.exports = catModel;

  