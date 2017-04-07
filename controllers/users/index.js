const User = require('../../models/user-model');
const router = require('express').Router();
const passport = require('passport');

const AuthService = require('../../services/auth');

// All routes here are ~/users/

// Posting to base route for creating a new user
router.post('/', 
    passport.authenticate(
        'local-signup',
        {
            failureRedirect: '/users/new',
            successRedirect: '/'
        }
    )
);

// Renders the html file for login form 
router.get('/new', (req, res) => {
    res.render('users/new');
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Post to login to check credentials
router.post('/login', passport.authenticate(
    'local-login', 
    {
        failureRedirect: '/',
        successRedirect: '/home'
    }
));

module.exports = router;