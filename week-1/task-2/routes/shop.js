var express = require('express');
var router = express.Router();

/* GET shop listing. */
router.get('/', function (req, res) {
    res.end('Este es el texto para shop');
});
router.get('/house', function (req, res) {
    res.end('Este es el texto para shop/house');
});

module.exports = router;