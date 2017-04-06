const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        bodyParser = require('body-parser'),
        fetch = require('fetch'),
        dotenv = require('dotenv'),
        PORT = process.env.PORT || 3000;

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/', require('./router'));


app.listen(PORT, () => console.log('Server is listening on port', PORT));