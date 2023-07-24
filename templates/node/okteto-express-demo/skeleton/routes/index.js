var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  /* #swagger.responses[200] = {
            description: 'echo example',
            schema: { $ref: '#/definitions/DefaultResponse' }
    } */
  res.send({ status: "express app is running", "date-time": new Date() });
});

module.exports = router;
