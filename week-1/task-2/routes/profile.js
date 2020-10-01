var express = require('express');
var router = express.Router();

/* GET profile listing. */
router.get('/main', function (req, res) {
    res.end('Este es el texto para profile/main');
});
router.get('/details', function (req, res) {
    res.end('Este es el texto para profile/details');
});

module.exports = router;