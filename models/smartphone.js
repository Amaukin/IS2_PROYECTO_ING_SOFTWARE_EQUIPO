var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmartphoneSchema = Schema({
    _id: mongoose.Types.ObjectId,
    modelo: {
        type: String,
        required: true,
        uppercase:true
    },
    precio: Number,
    color: {
        type: String,
        uppercase: true
    },
    marca: {
        type: String,
        uppercase: true
    },    
    almacenamientoGB: Number,
    ramGB: Number,
    imagen: String
});

module.exports = mongoose.model('Smarthphone', SmartphoneSchema);