var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IS2_PROYECTO_ING_SOFTWARE_EQUIPO' });
});

router.get('/introducciondocker', function(req, res, next) {
  res.render('introduccionDocker', { title: 'Introducción Docker' });
});

router.get('/imagenesDocker', function(req, res, next) {
  res.render('imagenesDocker', { title: 'Imagenes de Docker' });
});

router.get('/infoEquip', function(req, res, next) {
  res.render('infoEquip', { title: 'Informacion del Equipo' });
});

router.get('/contenedores', function(req, res, next) {
  res.render('contenedores', { title: 'Contenedores' });
});

module.exports = router;
