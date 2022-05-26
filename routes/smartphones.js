var express = require('express');
const { default: mongoose } = require('mongoose');
var Smartphone = require('../models/smartphone')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
