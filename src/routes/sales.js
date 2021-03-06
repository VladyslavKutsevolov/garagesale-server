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

const editGarage = function (queryValues, id, db) {
  const {
    title,
    description,
    cover_photo_url,
    city,
    province,
    created_at,
  } = queryValues;
  const queryParams = [];
  let updateQuery = `UPDATE garage_sales SET `;

  if (title) {
    queryParams.push(title);
    updateQuery += `title = $${queryParams.length}, `;
  }
  if (description) {
    queryParams.push(description);
    updateQuery += `description = $${queryParams.length}, `;
  }
  if (cover_photo_url) {
    queryParams.push(cover_photo_url);
    updateQuery += `cover_photo_url = $${queryParams.length}, `;
  }
  if (city) {
    queryParams.push(city);
    updateQuery += `city = $${queryParams.length}, `;
  }
  if (province) {
    queryParams.push(province);
    updateQuery += `province = $${queryParams.length}, `;
  }
  if (created_at) {
    queryParams.push(created_at);
    updateQuery += `created_at = $${queryParams.length} `;
  }

  if (id) {
    queryParams.push(id);
    updateQuery += `WHERE id = $${queryParams.length} RETURNING *;`;
  }

  return db.query(updateQuery, queryParams);
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
      .catch((err) =>
        res.status(500).json({ message: 'Failed to load Sales' })
      );
  });

  router.get('/:id', (req, res) => {
    const saleId = req.params.id;
    const queryString = `
    SELECT 
      garage_sales.title as sale_title, 
      users.username, 
      users.phone, 
      products.id as product_id, 
      products.title as product_title, 
      products.image_url, 
      products.price, 
      products.sold, 
      products.description, 
      products.seller_id
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    JOIN users ON garage_sales.id = users.id
    WHERE sale_id = $1;`;

    db.query(queryString, [saleId])
      .then((data) => {
        const garage = data.rows;
        res.json({ garage });
      })
      .catch((err) => res.status(500).json({ message: 'Failed to load Sale' }));
  });

  router.get('/city/:name', (req, res) => {
    const cityName = req.params.name;
    const queryString = `SELECT * FROM garage_sales WHERE city = $1;`;

    db.query(queryString, [cityName])
      .then((data) => {
        const sales = data.rows;

        res.json({ sales });
      })
      .catch((err) => res.status(500).json({ message: 'Failed to load Sale' }));
  });

  router.get('/province/:name', (req, res) => {
    const provinceName = req.params.name;
    const queryString = `SELECT title, city FROM garage_sales WHERE province = $1;`;

    db.query(queryString, [provinceName])
      .then((data) => {
        const garage = data.rows;
        res.json({ garage });
      })
      .catch((err) => res.status(500).json({ message: 'Failed to load Sale' }));
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
        return res
          .status(500)
          .json({ error: err.message, message: 'Failed to create Sale' });
      });
  });

  //  Edit Garage
  router.put('/edit/:id', upload.single('saleImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    let formFieldValues = {};

    if (req.file) {
      formFieldValues = {
        ...parseBodyValues,
        created_at: new Date(Date.now()),
        cover_photo_url: req.file.location,
      };
    } else {
      formFieldValues = {
        ...parseBodyValues,
        created_at: new Date(Date.now()),
      };
    }

    const garageId = req.params.id;

    editGarage(formFieldValues, garageId, db)
      .then(({ rows }) => {
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
          success: true,
          message: 'Garage sale was deleted successfully',
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err,
          message: 'Fail to delete Sale',
        });
      });
  });

  return router;
};
