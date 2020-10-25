const router = require("express").Router();

const addNewProduct = function(item, db) {
  const queryString = `INSERT INTO products (title, description, image_url, price, sale_id) VALUES ($1, $2, $3, $4, $5);`;

  const valueArray = [item.title, item.description, item.image_url, item.price, item.sale_id]

  return db.query(queryString, valueArray)
    .then(data => data.rows)
};

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then(data => {
        const listOfProducts = data.rows
        res.json({listOfProducts})
      })
      .catch(err => console.log('query Error', err))
  });

  router.post("/new", (req, res) => {
    const newItem = req.body;

    addNewProduct(newItem, db)
    .then(message => {
      return res.json( {message: "New item is added on your Garage!"} );
    }).catch(err => {
      console.log(err.message)
      return res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};