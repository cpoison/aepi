var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info', function (req, res) {
  res.end('Este es el texto para info');
});

router.get('/contact', function (req, res) {
  res.end('Este es el texto para contact');
});

router.get('/about', function (req, res) {
  res.end('Este es el texto para about');
});

module.exports = router;
