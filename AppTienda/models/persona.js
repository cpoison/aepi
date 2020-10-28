const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = new Schema({
    nombre: String,
    apellidos: String,
    email: String,
    edad: Number,
    activo: Boolean
})

personaSchema.virtual('nombre_completo').get(function () {
    // usamos function() en vex de () => para no perder el valor de this
    return this.nombre + ' ' + this.apellidos
})

// Metodo de instancia para recuperar todas lass personas activas y mayor de 18
personaSchema.statics.activos = function () {
    return this.model('persona').find({
        activo: true,
        edad: {$gte: 18}
    })
}


// Primer parametro nombre de la coleccion (persona) y segundo parametro el schema
module.exports = mongoose.model('persona', personaSchema)