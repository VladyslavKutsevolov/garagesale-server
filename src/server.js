const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const api = require('./routes/index.js')


app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

api.use('/api', api)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});