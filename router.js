const router = require('express').Router();
const User = require('./models/user-model');
const passport = require('passport');

const AuthService = require('./services/auth');

router.get('/', (req, res) => res.render('users/login'))
router.use('/home', 
    // AuthService.restrict, 
    require('./controllers/home'));
router.use('/users', require('./controllers/users'));
router.use('/api', require('./controllers/api'));

module.exports = router;