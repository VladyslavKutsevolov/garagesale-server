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

const editGarage = function (garage, id, db) {
  const queryString = `
  UPDATE garage_sales SET title=$1, description=$2, cover_photo_url=$3, city=$4, province=$5, created_at=$6 WHERE id = $7 RETURNING*;`;

  const valueArray = [
    garage.title,
    garage.description,
    garage.cover_photo_url,
    garage.city,
    garage.province,
    garage.created_at,
    id
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

  router.get('/:id', (req, res) => {
    const saleId = req.params.id;
    const queryString = `
    SELECT garage_sales.title, users.username, users.phone, products.*
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    JOIN users ON garage_sales.id = users.id
    WHERE sale_id = $1;`;

    db.query(queryString, [saleId])
      .then((data) => {
        const garage = data.rows;
        res.json({ garage });
      })
      .catch((err) => console.log('query Error', err));
  });

  router.get('/city/:name', (req, res) => {
    const cityName = req.params.name;
    const queryString = `SELECT title, city FROM garage_sales WHERE city = $1;`;

    db.query(queryString, [cityName])
      .then((data) => {
        const garage = data.rows;
        res.json({ garage });
      })
      .catch((err) => console.log('query Error', err));
  });

  router.get('/province/:name', (req, res) => {
    const provinceName = req.params.name;
    const queryString = `SELECT title, city FROM garage_sales WHERE province = $1;`;

    db.query(queryString, [provinceName])
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

  //  Edit Garage
  router.put('/edit/:id', upload.single('saleImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    const formFieldValues = {
      ...parseBodyValues,
      created_at: new Date(Date.now()),
      cover_photo_url: req.file.location,
    };

    const garageId = req.params.id;

    editGarage(formFieldValues, garageId, db)
      .then(({ rows }) => {
        console.log('SERVER rows', rows)
        return res.json({
          message: 'Garage sale information is updated!',
          sale: rows[0],
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      });
  });

  // Delete Garage
  router.delete('/delete/:id', (req, res) => {
    const query = 'DELETE FROM garage_sales WHERE id = $1;';
    db.query(query, [req.params.id])
      .then(() => {
        res.json({ 
          message: "Garage Sale is removed!",
          product: {}
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });

  return router;
};