const router = require('express').Router();
const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.Bucket;
const s3 = new aws.S3();

// AWS config
aws.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

// upload image setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      const path = `product-images/${fileName}`;
      cb(null, path);
    },
  }),
});

const addNewProduct = function (item, db) {
  const queryString = `INSERT INTO products (title, description, image_url, price, sale_id) VALUES ($1, $2, $3, $4, $5) RETURNING*;`;

  const valueArray = [
    item.title,
    item.description,
    item.image_url,
    item.price,
    item.sale_id,
  ];

  return db.query(queryString, valueArray);
};

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    // change req.params to find correct id
    db.query(`SELECT * FROM products WHERE sale_id = $1;`, req.params.id)
      .then((data) => {
        const listOfProducts = data.rows;
        res.json({ listOfProducts });
      })
      .catch((err) => console.log('query Error', err));
  });

  router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const queryString = `
    SELECT garage_sales.title, users.username, users.phone, products.*
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    JOIN users ON garage_sales.id = users.id
    WHERE products.id = $1;`;

    db.query(queryString, [productId])
      .then((data) => {
        const product = data.rows;
        res.json({ product });
      })
      .catch((err) => console.log('query Error', err));
  });

  //Filter items by category
  router.get('/category/:name', (req, res) => {
    db.query(`
    SELECT products.* FROM products
    JOIN product_categories ON product_id = products.id
    JOIN categories ON categories.id = category_id
    WHERE categories.name = $1;
    `, [req.params.name])
      .then((data) => {
        const listOfProducts = data.rows;
        res.json({ listOfProducts });
      })
      .catch((err) => console.log('query Error', err));
  });

  router.post('/new', upload.single('productImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    const formFieldValues = {
      ...parseBodyValues,
      image_url: req.file.location,
    };

    addNewProduct(formFieldValues, db)
      .then(({ rows }) => {
        return res.json({
          message: 'New item is added on your Garage!',
          product: rows[0],
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      });
  });

  return router;
};
