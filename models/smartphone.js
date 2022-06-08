var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmartphoneSchema = Schema({
    id: Number,
    almacenamiento: Number,
    color: String,
    marca: String,    
    modelo: String,
    precio: Number,
    ram: Number,
});

module.exports = mongoose.model('Smarthphone', SmartphoneSchema);