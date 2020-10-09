const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('main/index');
})
router.get('/index', (req, res) => {
    res.render('main/index');
})

router.get('/about', (req, res) => {
    res.render('main/about');
})


module.exports = router;