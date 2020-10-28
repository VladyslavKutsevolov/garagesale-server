const router = require("express").Router();

const checkProductExists = (productId, db) => {
  const queryString =`
    SELECT * 
    FROM from products 
    WHERE product_id = $1`;
  const queryParams = [productId];

  return db.query(queryString, queryParams)
    .then(data => {
      const matchingUser = data.rows;
      if (matchingUser.length > 0) {
        return true;
      }
      return false;
    })
};


module.exports = db => {
  
  router.get("/:productId", (req, res) => {
    
    const productId = req.params.productId;

    db.query(`
      SELECT *
      FROM comments
      WHERE product_id = $1;
    `, [productId])
      .then((data) => {
        const listOfComment = data.rows;
        res.json({ listOfComments });
      })
      .catch(err => console.log('query Error', err))

  })


  // Add a new comment to a product
  router.post("/:productId/newComment", async (req, res) => {

    const productId = req.params.productId;
    const comment = req.body
    const userId = req.session.userId
    if (userId) {

      const queryString = `
        INSERT INTO comments (
          author_id,
          product_id, 
          comment_text
        ) VALUES (
          $1, $2, $3
        );
      `;
      const queryParams = [userId, productId, comment]

      try {
        const productExists = await checkProductExists(productId, db);
        if (productExists) {
          db.query(queryString, queryParams)
            .then((data) => data.rows)
        }
      } catch (e) {
        return res
          .status(500)
          .json({ message: e.message });
      }
    }
  });


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