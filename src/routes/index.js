const router = require("express").Router();

router.get('/', (req, res) => {
  res.send({message: 'Hello Express!'})
});

module.exports = router;