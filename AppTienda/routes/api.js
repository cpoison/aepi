const router = require('express').Router();
const { checkToken } = require('./middlewares');

const apiProductosRouter = require('./api/productos.api');
const apiUsuariosRouter = require('./api/usuarios.api');
const apiClientesRouter = require('./api/clientes.api');


router.use('/productos', checkToken, apiProductosRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/clientes', apiClientesRouter);





module.exports = router;