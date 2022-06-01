var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IS2_PROYECTO_ING_SOFTWARE_EQUIPO' });
});

router.get('/introducciondocker', function(req, res, next) {
  res.render('introduccionDocker', { title: 'Introducción Docker' });
});

module.exports = router;
