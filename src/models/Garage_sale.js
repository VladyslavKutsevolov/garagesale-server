const { Sequelize } = require('sequelize');
const db = require('../db/database');

const Garage_sale = db.define('garage_sale', {
  seller_id: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  cover_photo_url: {
    type: Sequelize.STRING
  }
})

module.exports = Garage_sale