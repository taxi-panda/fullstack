const router = require('express').Router();

// All routes are ~/home

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;