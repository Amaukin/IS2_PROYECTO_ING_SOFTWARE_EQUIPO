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

function sanitizarSmartphone(reqBody) {
  if (reqBody.precio === '') delete reqBody.precio;
  if (reqBody.color === '') delete reqBody.color;
  if (reqBody.marca === '') delete reqBody.marca;
  if (reqBody.almacenamientoGB === '') delete reqBody.almacenamientoGB;
  if (reqBody.ramGB === '') delete reqBody.ramGB;
  if (reqBody.imagen === '') delete reqBody.imagen;
  return reqBody
}

module.exports = router;

/* POST smartphone. */
router.post('/', async function (req, res, next) {
  var modeloSmartphone = req.body.modelo;
  var smartphoneUpper = modeloSmartphone.toUpperCase();
  const smartphoneEncontrado = await Smartphone.findOne({ modelo: smartphoneUpper });
  if (smartphoneEncontrado) {
    res.send(SMARTPHONE_YA_EXISTE);
  } else {
    req.body = sanitizarSmartphone(req.body);
    var smartphone = Smartphone({
      _id: mongoose.Types.ObjectId(),
      modelo: req.body.modelo,
      precio: req.body.precio,
      color: req.body.color,
      marca: req.body.marca,
      almacenamientoGB: req.body.almacenamientoGB,
      ramGB: req.body.ramGB,
      imagen: req.body.imagen
    });
    smartphone.save((err, smartphone) => {
      if (err) {
        console.log(ERROR_ENCONTRADO, err);
      } else {
        req.params.redirect ? res.redirect('../smartphones') : res.json(smartphone);
      }
    });
  }
});