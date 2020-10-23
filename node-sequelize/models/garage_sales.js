'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garage_sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Garage_sales.init({
    garage_sale_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Garage_sales',
  });
  return Garage_sales;
};