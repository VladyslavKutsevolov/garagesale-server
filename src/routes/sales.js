const router = require("express").Router();

const addNewGarage = function(garage, db) {
  const queryString = `
    INSERT INTO garage_sales (seller_id, title, cover_photo_url, description, created_at, location_id) VALUES ($1, $2, $3, $4, $5, $6);`;

  const valueArray = [garage.user_id, garage.title, garage.description, garage.cover_photo_id, garage.created_at, garage.location_id]

  return db.query(queryString, valueArray)
    .then(data => data.rows)
};

module.exports = db => {
  // Get all sales
  router.get("/", (req, res) => {
    db.query(`
      SELECT * 
      FROM garage_sales;`)
      .then(data => {
        const listOfSales = data.rows
        res.json({listOfSales})
      })
      .catch(err => console.log('query Error', err))
  });

  // Get sale by ID
  /*
  router.get("/:id", (req, res) => {
    const saleId = req.params.id;
    const queryString = `
      SELECT * 
      FROM garage_sales 
      WHERE id = $1;`;

    db.query(queryString, [saleId])
      .then(data => {
        const garage = data.rows
        res.json({garage})
      })
      .catch(err => console.log('query Error', err))
  });
  */

 router.get("/:id", (req, res) => {
  const saleId = req.params.id;
  const queryString = `
    SELECT products.*
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    WHERE sale_id = $1;`;

  db.query(queryString, [saleId])
    .then(data => {
      const garage = data.rows
      res.json({garage})
    })
    .catch(err => console.log('query Error', err))
});


  // Create new Garage
  router.post("/new", (req, res) => {
    const newGarage = req.body;
    addNewGarage(newGarage, db)
    .then(message => {
      return res.json( {message: "New Garage is created!"} );
    }).catch(err => {
      console.log(err.message)
      return res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Delete Garage
  router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM garage_sales WHERE id = $1;';
    db.query(query, [req.params.id])
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ success: false, error: err });
      });
  });

  return router;
};

/*
SQL for category filter 

SELECT garage_sales.title, actegories.name FROM garage_sales
JOIN products ON garage_sales.id = sale_id
JOIN product_categories ON products.id = product_id
JOIN categories ON product_categories.id = categories.id
WHERE categories.name = 'Book'
;

*/