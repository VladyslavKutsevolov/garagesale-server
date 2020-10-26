const router = require("express").Router();
// Express websocket config

var ws = require('express-ws');

router.ws('/', () => {
  ws.on('connection', (msg) => {
    console.log("connection", msg);
  });
});

