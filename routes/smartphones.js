var express = require('express');
const { default: mongoose } = require('mongoose');
var Smartphone = require('../models/smartphone')
var router = express.Router();

/* GET smartphones listing. */
router.get('/', function(req, res, next) {
  Smartphone.find({}, function (err, smartphones) {
    res.json(smartphones);
  })
});

module.exports = router;
