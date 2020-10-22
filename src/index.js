const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({message: 'Hello Express!'});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});