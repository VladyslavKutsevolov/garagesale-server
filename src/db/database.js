const Sequelize = require('sequelize');

module.exports = new Sequelize('garage_sale', 'id', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});