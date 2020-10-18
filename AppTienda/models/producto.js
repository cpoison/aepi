const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    departamento: String
});

productoSchema.methods.mismoDepartamento = function () {
    return this.model('producto').find({ departamento: this.departamento });
}


module.exports = mongoose.model('producto', productoSchema);