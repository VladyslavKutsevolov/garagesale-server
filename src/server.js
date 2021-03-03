// Load .env data into process.env
require('dotenv').config();

// Web server config.
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const cookieSession = require('cookie-session');
const logger = require('morgan');

app.use(logger('dev'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret'],
  })
);

// Database setup
const db = require('./db/database');
db.connect()
  .then(() => console.log('DB connected'))
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

//Routes
const sales = require('./routes/sales');
const products = require('./routes/products');
const usersRoutes = require('./routes/users');
const comments = require('./routes/comments');
const sendText = require('./routes/send-text');

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'hello Express!!' });
});

// Use routes modules
app.use('/sales', sales(db));
app.use('/products', products(db));
app.use('/users', usersRoutes(db));
app.use('/send-text', sendText())
app.use('/comments', comments(db))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
