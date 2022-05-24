var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ciclodevida', function(req, res, next) {
  res.render('ciclodevida', { title: 'ciclo de vida de los contenedores' });
});

module.exports = router;
