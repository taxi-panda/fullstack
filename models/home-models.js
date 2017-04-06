const fetch = require('fetch');
const db = require('../config/database');

const home = {};

home.allRoutes = () => {
    return db.manyOrNone(
        'SELECT * FROM routes'
    );
};

module.exports = home;