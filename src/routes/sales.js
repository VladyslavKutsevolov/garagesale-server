const express = require('express');
const router = express.Router();
const db = require('../db/database');
const Garage_sale = require('../models/Garage_sale')

router.get('/', (req, res) => 
  Garage_sale.findAll()
    .then(sales => {
      console.log('inside sales: ',sales, '**********');
      res.sendStatus(200);
    })
    .catch(err => console.log(err))
  );

module.exports = router;