const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    console.log('inside db');
    db.query(`SELECT * FROM garage_sales;`)
      .then(data => res.json(data))
      .catch(err => console.log('query Error', err))
  })

  return router;
};