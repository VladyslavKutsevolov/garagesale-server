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
  
  router.get("/:saleId", (req, res) => {
    
    const saleId = req.params.saleId;

    // const queryString = `SELECT * FROM comments WHERE product_id = $1;`;
    const queryString = `
      select 
        comments.*
      from comments 
      join products on products.id = comments.product_id 
      join garage_sales on products.sale_id = garage_sales.id 
      where garage_sales.id = $1;`
    db.query(queryString, [saleId])
      .then((data) => {
        const listOfComments = data.rows;
        res.json({ listOfComments });
      })
      .catch(err => console.log('query Error', err))
  })


  // Add a new comment to a product
  router.post("/:productId/newComment", async (req, res) => {
    const productId = req.params.productId;
    const { authorId, commentData} = req.body
    console.log("body", req.body)
    // const userId = req.session.userId
    if (authorId) {

      const queryString = `
        INSERT INTO comments (
          author_id,
          product_id, 
          comment_text
        ) VALUES (
          $1, $2, $3
        ) RETURNING* ; 
      `;
      const queryParams = [authorId, productId, commentData]
      db.query(queryString, queryParams)
        .then((data) => {
          const returnedComment = data.rows[0];
          res.json({returnedComment})
        })

        .catch(e => console.log(e))

    }
  });


  router.delete('/:commentId/delete', (req, res) => {
    const { authorId } = req.body
    const commentId = req.params.commentId
    const query = `DELETE FROM comments WHERE comments.id = $1`;
    db.query(query, [commentId])
      .then(() => res.json({message: "comment deleted"}))
      .catch(e => console.log(e))
  });
  
  return router;
};