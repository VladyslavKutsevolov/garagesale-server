// Load .env data into process.env
require('dotenv').config();

// Web server config.
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express(); // export and require in chatServer
const PORT = process.env.PORT || 3001;
const cookieSession = require('cookie-session');
const startChat = require("./chatSocket")
const expressWs = require('express-ws')(app);
const util = require('util')
// app.ws('/chat') -- handle chat route like this. 
// add WebSocket routes (almost) the same way you add other routes
app.ws('/chat', function(ws, req) {

  ws.onmessage = msg => {
    // console.log("msgJSON", JSON.parse(msg.data))
    console.log("mesage", msg)
    const data = JSON.parse(msg.data)
    console.log("mesage.data", data)
    console.log("msg type", data.payload)
    if (msg.type === 'message') {
      ws.send(JSON.stringify({type: 'message', payload: data.payload}));
    }
  };
});

const whitelist = ['http://localhost:3001', 'http://localhost:3000']
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn\'t ' +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));



// define function init chat, pass in io and call it here

// C&P chat app websocket code ///
/////////////////////////////////
// io.on('connect', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if(error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);
//     console.log(socket)
//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//     }
//   })
// });
//////////////////////////////////////////


// Database setup
const db = require("./db/database");
db.connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

//Routes
const sales = require('./routes/sales');
const products = require('./routes/products');
const usersRoutes = require("./routes/users");
const chat = require('./routes/chat.js');

// app.use(cors()); // comment out for test
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


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);

});