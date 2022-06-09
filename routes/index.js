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

router.get('/infoEquipo', function(req, res, next) {
  res.render('infoEquipo', { title: 'Informacion del Equipo' });
});

router.get('/contenedores', function(req, res, next) {
  res.render('contenedores', { title: 'Contenedores' });
});

router.get('/directivasDockerfile', function(req, res, next) {
  res.render('directivasDockerfile', { title: 'Directivas Dockerfile' });
});

router.get('/ciclodevida', function(req, res, next) {
  res.render('ciclodevida', { title: 'ciclo de vida de los contenedores' });
});

router.get('/archivodockerfile', function(req, res, next) {
  res.render('archivoDockerfile', { title: 'Archivo Dockerfile' });
});

module.exports = router;
