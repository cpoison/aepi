const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const checkToken = async (req, res, next) => {
    
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'La cabecera Authorization es obligatoria'})
    }

    const token = req.headers['authorization'];
    console.log(token);
    let obj = {};

    try {
        obj = jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: 'el token es incorrecto'})
    }

    // // Comprobamos la fecha de creacion
   
    // const fechaActual = moment().unix();
    // if (fechaActual > obj.fechaExpiracion) {
    //     return res.status(401).json({error:'El token es incorrecto'})
    // }

    req.user = await Usuario.findById(obj.usuarioId);

    next();
}

module.exports = { checkToken };