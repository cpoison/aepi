const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const clienteSchema = new Schema({
    nombre: String,
    apellidos: String,
    direccion: String,
    email: String,
    dni: String
});

module.exports = mongoose.model('cliente', clienteSchema);