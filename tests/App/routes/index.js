var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  contents = fs.readFileSync('../../../public/index.html');
  res.render('index', { "title": 'Express', "contents": contents });
});

module.exports = router;
