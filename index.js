const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        bodyParser = require('body-parser'),
        fetch = require('fetch'),
        PORT = process.env.PORT || 3000;

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

<<<<<<< HEAD
app.listen(PORT, () => console.log('The Universe Smiles Upon You', PORT));
=======
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, () => console.log('Server is listening on port', PORT));
>>>>>>> 27bd9aa5ed40c67070adf9b331ac30b961e9eb47
