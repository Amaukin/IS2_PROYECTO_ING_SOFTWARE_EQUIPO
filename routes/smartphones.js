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

/* DELETE smartphone. */
router.delete('/:id', async function (req, res, next) {
  Smartphone.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.send(500, ERROR_ENCONTRADO + err);
    } else {
      res.send(SMARTPHONE_ELIMINADO);
    }
  })
});

/* PUT smartphone to update. */
router.put('/:id', async function (req, res, next) {
  var smartphoneId = req.params.id;
  var smartphoneEncontrado = await Smartphone.findOne({ _id: smartphoneId });
  if (smartphoneEncontrado) {
    if (req.body.modelo) smartphoneEncontrado.modelo = req.body.modelo;
    if (req.body.precio) {
      smartphoneEncontrado.precio = req.body.precio;
    } else {
      if (smartphoneEncontrado.precio) { await smartphoneEncontrado.update({ $unset: { precio: '' } }); await smartphoneEncontrado.save() };
    }
    if (req.body.color) {
      smartphoneEncontrado.color = req.body.color;
    } else {
      if (smartphoneEncontrado.color) { await smartphoneEncontrado.update( { $unset: {color : ''} }); await smartphoneEncontrado.save() };
    }
    if (req.body.marca) {
      smartphoneEncontrado.marca = req.body.marca;
    } else {
      if (smartphoneEncontrado.marca) { await smartphoneEncontrado.update({ $unset: { marca: '' } }); await smartphoneEncontrado.save() };
    }
    if (req.body.almacenamientoGB) {
      smartphoneEncontrado.almacenamientoGB = req.body.almacenamientoGB;
    } else {
      if (smartphoneEncontrado.almacenamientoGB) { await smartphoneEncontrado.update({ $unset: { almacenamientoGB: '' } }); await smartphoneEncontrado.save() };
    }
    if (req.body.ramGB) {
      smartphoneEncontrado.ramGB = req.body.ramGB;
    } else {
      if (smartphoneEncontrado.ramGB) { await smartphoneEncontrado.update({ $unset: { ramGB: '' } }); await smartphoneEncontrado.save() };
    }
    if (req.body.imagen) {
      smartphoneEncontrado.imagen = req.body.imagen;
    } else {
      if (smartphoneEncontrado.imagen) { await smartphoneEncontrado.update({ $unset: { imagen: '' } }); await smartphoneEncontrado.save() };
    }

    await smartphoneEncontrado.save();
    var smartphoneActualizado = await Smartphone.findOne({ _id: smartphoneId });

    res.send(smartphoneActualizado);
  } else {
    res.send(404, SMARTPHONE_NO_EXISTE);
  }
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


