var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:echo', function(req, res, next) {
  res.send({'response': `your echo ${req.params.echo}`});
});

module.exports = router;
