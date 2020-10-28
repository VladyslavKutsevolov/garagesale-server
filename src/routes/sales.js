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
      const path = `sale-images/${fileName}`;
      cb(null, path);
    },
  }),
});

const addNewGarage = function (garage, db) {
  const queryString = `
  INSERT INTO garage_sales (seller_id, title, description, cover_photo_url, city, province, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*;`;

  const valueArray = [
    garage.seller_id,
    garage.title,
    garage.description,
    garage.cover_photo_url,
    garage.city,
    garage.province,
    garage.created_at,
  ];
  return db.query(queryString, valueArray);
};

module.exports = (db) => {
  // Get all sales
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * 
      FROM garage_sales;`
    )
      .then((data) => {
        const listOfSales = data.rows;
        res.json({ listOfSales });
      })
      .catch((err) => console.log('query Error', err));
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

  router.get('/:id', (req, res) => {
    const saleId = req.params.id;
    const queryString = `
    SELECT products.*
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    WHERE sale_id = $1;`;

    db.query(queryString, [saleId])
      .then((data) => {
        const garage = data.rows;
        res.json({ garage });
      })
      .catch((err) => console.log('query Error', err));
  });

  // Create new Garage
  router.post('/new', upload.single('saleImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    const formFieldValues = {
      ...parseBodyValues,
      created_at: new Date(Date.now()),
      cover_photo_url: req.file.location,
    };

    addNewGarage(formFieldValues, db)
      .then(({ rows }) => {
        return res.json({
          message: 'New Sale is created!',
          sale: rows[0],
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
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
