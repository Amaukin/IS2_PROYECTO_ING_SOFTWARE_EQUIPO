var express = require('express');
const { default: mongoose } = require('mongoose');
var Smartphone = require('../models/smartphone')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* PATCH smartphone to update. */
router.patch('/:id', async function (req, res, next) {
  var smartphoneId = req.params.id;
  var smartphoneEncontrado = await Smartphone.findOne({ _id: smartphoneId });
  if (smartphoneEncontrado) {
    if (req.body.modelo) smartphoneEncontrado.modelo = req.body.modelo;
    if (req.body.precio) smartphoneEncontrado.precio = req.body.precio;
    if (req.body.color) smartphoneEncontrado.color = req.body.color;
    if (req.body.marca) smartphoneEncontrado.marca = req.body.marca;
    if (req.body.almacenamientoGB) smartphoneEncontrado.almacenamientoGB = req.body.almacenamientoGB;
    if (req.body.ramGB) smartphoneEncontrado.ramGB = req.body.ramGB;
    if (req.body.imagen) smartphoneEncontrado.imagen = req.body.imagen;

    await smartphoneEncontrado.save();

    res.send(smartphoneEncontrado);
  } else {
    res.send(404, SMARTPHONE_NO_EXISTE);
  }
});
module.exports = router;
