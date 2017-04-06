const fetch = require('fetch');
const db = require('../config/database');

const routes = {};

routes.allRoutes = () => {
    return db.manyOrNone(
        'SELECT * FROM routes'
    );
};

routes.create = (obj) => {
    return db.one('INSERT INTO routes(start_lat, start_lng, start_addr, start_name, end_lat, end_lng, end_addr, end_name, price, start_time) VALUES($[start_lat], $[start_lng], $[start_addr], $[start_name], $[end_lat], $[end_lng], $[end_addr], $[end_name], $[price], $[start_time]) returning id', obj);
};

module.exports = routes;