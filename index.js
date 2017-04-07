const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        bodyParser = require('body-parser'),
        pgp = require('pg-promise'),
        fetch = require('fetch'),
        dotenv = require('dotenv'),
        logger = require('morgan'),
        moment = require('moment'),
        session = require('express-session'),
        cookieParser = require('cookie-parser'),
        bcrypt = require('bcrypt'),
        passport = require('passport'),
        PORT = process.env.PORT || 3000;

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
        secret: 'keyboard cat', 
        resave: true,
        saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
// Uses morgan to log all the dev side stuff
app.use(logger('dev'));

// body-parser setup
// setting extended to false means that it only accepts arrays or strings, setting to true means it will accept any type
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

const User = require('./models/user-model');
const LocalStrategy = require('passport-local').Strategy;

// Serialises the user's log in session
passport.serializeUser((user,done) => {
        done(null,user);
});

passport.deserializeUser((userObj, done) => {
        User.findByEmail(userObj.email)
                .then((user) => done(null,user))
                .catch((err) => {
                        console.log('ERROR: ', err);
                        return done(null, false);
                });
})

// For signing up a new user
passport.use(
        'local-signup',
        new LocalStrategy(
    {
      // these are the names of the fields for email and password in
      // the login form we'll be serving (see the view)
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      // Setting to true means we are going to further process
      passReqToCallback: true
    },
    // If they have done everything properly, call on User.create to create the new login
    (req, email, password, done) => {
      User
	.create(req.body.user)
	.then((user) => {
    // Signal to passport that this is success
	  return done(null, user);
	})
	.catch((err) => {
	  console.log('ERROR:', err);
	  return done(null, false);
	});
    })
);

// Checks login creditials
passport.use(
  'local-login',
  new LocalStrategy({
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findByEmail(email)
        .then(user => {
          if (user) {
            const isAuthed = bcrypt.compareSync(password, user.password_digest);
            if (isAuthed) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        });
    }
  )
);

app.use('/', require('./router'));


app.listen(PORT, () => console.log('Server is listening on port', PORT));
