var express = require('express');
const { default: mongoose } = require('mongoose');
var Smartphone = require('../models/smartphone')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const pruebaSmartphone = Smartphone({
    id: mongoose.Types.ObjectId(),
    marca: 'Huawei',
    modelo: 'P20 lite'
  });
  console.log('el smartphone', pruebaSmartphone);
  res.send('respond with a resource');
});

module.exports = router;
