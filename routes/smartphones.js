var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Smartphone = require('../models/smartphone')

const ERROR_ENCONTRADO = 'Hubo un error';
const SMARTPHONE_ELIMINADO = 'Se ha eliminado al smartphone';
const SMARTPHONE_NO_EXISTE = 'No se ha encontrado el smartphone';
const SMARTPHONE_YA_EXISTE = 'Ese smartphone ya está registrado';

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
        console.log('booooo', req.params, req.body, req.query);
        req.query.redirect ? res.redirect('../smartphones') : res.json(smartphone);
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

router.post('/:id', async function (req, res, next) {
  console.log('no deberias estar aqui');
  if (req.query.isDelete) {
    Smartphone.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res.send(500, ERROR_ENCONTRADO + err);
      } else {
        res.redirect('../smartphones');
      }
    })
  } else if (req.query.isEdit) {
    var smartphoneEditado = await Smartphone.findOne({ _id: req.params.id });
    req.body = sanitizarSmartphone(req.body);
    smartphoneEditado.modelo = req.body.modelo;
    smartphoneEditado.precio = req.body.precio;
    smartphoneEditado.color = req.body.color;
    smartphoneEditado.marca = req.body.marca;
    smartphoneEditado.almacenamientoGB = req.body.almacenamientoGB;
    smartphoneEditado.ramGB = req.body.ramGB;
    smartphoneEditado.imagen = req.body.imagen;
    smartphoneEditado.save((err, smartphone) => {
      if (err) {
        console.log(500, ERROR_ENCONTRADO + err);
      } else {
        res.redirect('../smartphones');
      }
    });
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
