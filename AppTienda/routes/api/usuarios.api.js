const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../../models/usuario');


router.post('/registro', async (req, res) => {

    // Encriptamos password
    req.body.password = bcrypt.hashSync(req.body.password)

    try {
        const nuevoUsuario =  await Usuario.create(req.body)
        res.json({
            success: "Usuario creado con exito",
            usuario: nuevoUsuario
        })
    } catch (error) {
        console.log(error)
    }
})


router.post('/login', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email })
        if (!usuario) {
            return res.status(401).json({ error: 'Error en email y/o password 1' })
        }
        
        // Comparamos password que llega del req con la que tenemos en la bbdd
        const passwordCorrecta = bcrypt.compareSync(req.body.password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(401).json({ error: 'Error en email y/o password 2' })
        }

        res.json({
            success: 'Login es correcto',
            token: createToken(usuario)
        })
    } catch (error) {
        console.log(error)
    }
})

function createToken(usuario) {
    const obj = {
        usuarioId: usuario._id,
        fechaCreacion: moment().unix(),
        fechaExpiracion: moment().add(10, 'minutes').unix()
    }
    return jwt.sign(obj, process.env.SECRET_KEY)
}


module.exports = router;