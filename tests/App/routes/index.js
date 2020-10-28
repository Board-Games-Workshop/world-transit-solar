var express = require('express');
var router = express.Router();
const fs = require("fs");
var useragent = require('useragent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { "title": 'Express', 'user_agent': useragent.is(req.headers['user-agent']) });
});

module.exports = router;
