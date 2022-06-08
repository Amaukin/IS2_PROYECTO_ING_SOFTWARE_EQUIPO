var express = require('express');
var router = express.Router();
var axios = require('axios');

var mongoose = require('mongoose');
var Schema = mongoose.Types.ObjectId;
var Smartphone = require('../models/smartphone');

const API_PATH = 'http://localhost:3000/api/';
const SMARTPHONES_POR_FILA = 4;

/* GET smartphones page. */
router.get('/', async function (req, res, next) {
    var smartphonesReq = await axios.get(API_PATH);
    var smartphonesGrid = mapSmartphonesGrid(smartphonesReq.data);
    res.render('smartphones', { title: 'Smartphones', smartphonesGrid: smartphonesGrid });
});

/* GET smartphone nuevo page. */
router.get('/nuevo-smartphone', async function (req, res, next) {
    res.render('smartphoneNuevo', {});
});

/* GET smartphone editar page. */
router.get('/editar-smartphone/:id', async function (req, res, next) {
    var smartphoneId = req.params.id;
    var smartphoneEncontrado = await Smartphone.findById(smartphoneId);
    res.render('smartphoneEditar', { smartphone: smartphoneEncontrado });
});


/* GET smartphone detalle page. */
router.get('/:id', async function (req, res, next) {
    var smartphoneId = req.params.id;
    var smartphoneEncontrado = await Smartphone.findById(smartphoneId);
    res.render('smartphoneDetalle', { smartphone: smartphoneEncontrado });
});


/**
 * @description Mapea el arreglo de smartphones para el grid del frontend
 * @param {Smartphone} smartphonesData Arreglo de smartphones
 */
const mapSmartphonesGrid = (smartphonesData) => {
    const arregloSmartphonesFinal = []
    let j = 0;
    let subArregloSmartphones = []
    for (const [index, smartphone] of smartphonesData.entries()) {
        subArregloSmartphones.push(smartphone);
        j++;

        if (j >= SMARTPHONES_POR_FILA || !smartphonesData[index + 1]) {
            j = 0;
            arregloSmartphonesFinal.push(subArregloSmartphones);
            for (const unSuper of subArregloSmartphones) {
            }
            subArregloSmartphones = [];
        }
    }

    return arregloSmartphonesFinal;
}

module.exports = router;
