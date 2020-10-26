// Load .env data into process.env
require('dotenv').config();

// Web server config.
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 3001;
const cookieSession = require('cookie-session');
const logger = require('morgan');
const socketio = require('socket.io');
const path = require('path');
const formatMessage = require('../utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const botName = 'Chat Bot'

io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when other user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

    //Run when client disconnect
    socket.on('disconnect', () => {
      io.emit('message', formatMessage(botName,`${user.username} has left the chat`))
    });
  })

  // Listen for chat Messages
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  })

});

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

// Use routes modules
app.use('/sales', sales(db));
app.use('/products', products(db));
app.use('/users', usersRoutes(db));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
