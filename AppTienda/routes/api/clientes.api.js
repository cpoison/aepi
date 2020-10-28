const router = require('express').Router();
const Cliente = require('../../models/cliente');
const { check, validationResult } = require('express-validator');    

const createValidation = [
    check('nombre', 'El campo nombre es obligatorio')
        .isEmpty().exists().isLength({ min: 2 }).withMessage('El campo nombre necesita al menos 2 caracteres'),
    check('apellidos', 'El campo apellidos es obligatorio')
        .isEmpty().exists().isLength({ min: 2 }).withMessage('El campo apellidos necesita al menos 2 caracteres'),
    check('email', 'El campo email es obligatorio')
        .isEmpty().exists().isEmail().withMessage('El email introducido no es valido')
]



// POST /api/clientes/create
router.post('/create', createValidation, async (req, res) => {
        
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json(validationErrors.array());   
    }
    try {
        const clienteNuevo = await Cliente.create(req.body);
        res.json({
            success: 'Cliente creado con exito',
            cliente: clienteNuevo
        })
    } catch (error) {
        console.log(error)
    }

})

// GET /api/clientes/
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json({clientes});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.get('/delete/:clientId', async (req, res) => {
    try {
        const removedClient = await Cliente.findByIdAndDelete(req.params.clientId)
        res.json({message: 'Cliente borrado con éxito', cliente: removedClient})
    } catch (error) {
        res.status(500).json({message:error})
    }
})


router.put('/update/:clientId', async (req, res) => {
    try {
        const updatedClient = await Cliente.findByIdAndUpdate(req.params.clientId, { nombre: 'El nombre actualizado' }, { new: true })
        res.json({
            message: "Cliente actualizado con éxito",
            cliente_actualizado: updatedClient
        }) 
    } catch (error) {
        
    }
})



module.exports = router;