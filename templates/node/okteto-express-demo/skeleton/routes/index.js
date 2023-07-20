var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({'status': "express app is running", 'date-time': new Date()});
});

module.exports = router;
 