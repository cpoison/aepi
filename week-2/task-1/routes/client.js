const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('client/index');
})

router.get('/index', (req, res) => {
    res.render('client/index');
})

router.get('/new', (req, res) => {
    res.render('client/new');
})

router.post('/create', (req, res) => {
    res.redirect('/client/index')
})



module.exports = router;