var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/imagenesDocker', function(req, res, next) {
  res.render('imagenesDocker', { title: 'Imagenes de Docker' });
});

router.get('/infoEquip', function(req, res, next) {
  res.render('infoEquip', { title: 'Informacion del Equipo' });
});

module.exports = router;
