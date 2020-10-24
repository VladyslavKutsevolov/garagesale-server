// Load .env data into process.env
require('dotenv').config();

// Web server config.
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const db = require("./db/database");
db.connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

//Routes
const sales = require('./routes/sales');

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'hello Express!'})
});

// Create garage
app.use("/sales", sales(db));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});