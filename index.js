const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        bodyParser = require('body-parser'),
        pgp = require('pg-promise'),
        fetch = require('fetch'),
        dotenv = require('dotenv'),
        logger = require('morgan'),
        PORT = process.env.PORT || 3000;

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/', require('./router'));


app.listen(PORT, () => console.log('Server is listening on port', PORT));
