var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/:echo", function (req, res, next) {
  /* #swagger.responses[200] = {
            description: 'echo example',
            schema: { $ref: '#/definitions/EchoResponse' }
    } */
  res.send({ response: `your echo ${req.params.echo}` });
});

module.exports = router;
