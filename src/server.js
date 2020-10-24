const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Database
const db = require('./db/database')

//Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Main Page Route
app.get('/', (req, res) => {
  res.send({ message: 'hello Express!'})
});

// Garage-Sale route
app.use('/sales', require('./routes/sales'))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});