const routes = require('../../models/routes-model');
const faker = require('faker');

const controller = {};

controller.all = (req, res) => {
    routes.allRoutes()
        .then(data => res.json(data))
        .catch(err => console.log('Error: allRoutes:', err));
};

controller.create = (req,res) => {
    const obj = {
        start_lat: faker.address.latitude(),
        start_lng: faker.address.longitude(),
        start_addr: faker.address.streetAddress(),
        start_name: faker.address.streetName(),
        end_lat: faker.address.latitude(),
        end_lng: faker.address.longitude(),
        end_addr: faker.address.streetAddress(),
        end_name: faker.address.streetName(),
        price: faker.random.number(),
        start_time: "9:00"
    }

    routes.create(obj)
        .then(data => res.json(data))
        .catch(err => console.log('Error: create:', err));
}

module.exports = controller;