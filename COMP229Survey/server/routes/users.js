var express = require('express');
var router = express.Router();

/* provides/fetch users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
