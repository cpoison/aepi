const router = require('express').Router();
const Producto = require('../models/producto');


router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('productos/index', { productos });
  } catch(error){
    console.log(error)
  }
});

// GET /productos/departamento/NOMBREDPTO - Recupera todos los productos de un despartamento
router.get('/departamento/:departamento', async (req, res) => {
  try {
    const productos = await Producto.find({ departamento: req.params.departamento })
    res.render('productos/index', { productos });
  } catch (error) {
    console.log(error)
  }
})

// GET / productos / edit /: IdProducto - Formulario para editar producto
router.get('/edit/:productoId', async (req, res) => {

  try {
    const producto = await Producto.findById(req.params.productoId);
    console.log(producto);
    res.render('productos/edit', { producto })
  } catch (error) {
    console.log(error);
  }

  // res.render('productos/new', { id: req.params.productoId })
})


// GET /productos/new - Formulario con los datos de creación de producto
router.get('/new', (req, res) => {
  res.render('productos/new')
})



// GET /productos/:idProducto - Recupera un único producto 
router.get('/:productoId', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.productoId);
    res.render('productos/detail', { producto })
  } catch (error) {
    console.log(error)
  }

})

// POST /productos/create - Genera un nuevo producto
router.post('/create', async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    console.log(nuevoProducto)
    res.redirect('/productos')
  } catch (error) {
    console.log(error)
  }
})

// POST / productos / update - Editar un producto
router.post('/update', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.body.id ,req.body);  
    res.redirect('/productos')
  } catch (error) {
    console.log(error)
  }
})

// GET / productos / delete /:IdProducto - Borrar un producto
router.get('/delete/:productoId', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.productoId);
    res.redirect('/productos')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
