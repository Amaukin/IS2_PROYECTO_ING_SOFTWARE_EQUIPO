var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contenedores', function(req, res, next) {
  res.render('contenedores', { title: 'Contenedores' });
});

module.exports = router;
