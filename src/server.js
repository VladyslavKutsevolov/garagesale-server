// Load .env data into process.env
require('dotenv').config();

// Web server config.
const http = require('http');
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express(); // export and require in chatServer
const PORT = process.env.PORT || 3001;
const cookieSession = require('cookie-session');

// WebSocket Setup 
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// define function init chat, pass in io and call it here
//



app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));




// Database setup
const db = require("./db/database");
db.connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

//Routes
const sales = require('./routes/sales');
const products = require('./routes/products');
const usersRoutes = require("./routes/users");
const chat = require('./routes/chat.js');

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'hello Express!'})
});

// Use routes modules
app.use("/sales", sales(db));
app.use("/products", products(db));
app.use("/users", usersRoutes(db));
app.use("/chat", chat.js)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});