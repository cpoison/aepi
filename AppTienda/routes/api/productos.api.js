const router = require('express').Router()
const Producto = require('../../models/producto');

const { check, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    try {
        console.log(req.user);
        const productos = await Producto.find()
        res.json(productos);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


// El segundo parametro es el middleware para la validacion
router.post('/', [
    check('nombre', 'El campo nombre es requerido').exists().notEmpty(),
    check('precio', 'El campo precio es requerido').exists().isNumeric(),
    check('departamento').custom(valueDepartamento => {
        const departamentos = ['electrodomesticos', 'informatica', 'hogar', 'fotografia'];
        return departamentos.includes(valueDepartamento);
    })
] ,async (req, res) => {

    // Validamos req.body
    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        res.json(erroresValidacion.array());
    } 
    
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.json({
            message: 'Creado con exito',
            producto: nuevoProducto
        })
    } catch (error) {
        res.status(422).json({ error: error.message })
    } 
    
})

router.put('/', async (req, res) => {
    try {
        // Añadimos { new: true} para que devuelva el objeto editado ya
        const productoEditado = await Producto.findByIdAndUpdate(req.body.id, req.body, { new: true});
        res.json({
            message: 'Actualizado con exito',
            producto: productoEditado
        })
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
})

router.delete('/:productoId', async (req, res) => {
    try {
        const productoBorrado = await Producto.findByIdAndDelete(req.params.productoId);
        res.json({
            message: 'Borrado con exito',
            producto: productoBorrado
        })
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
})

module.exports = router;