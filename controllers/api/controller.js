const routes = require('../../models/routes-model');
const faker = require('faker');

const controller = {};

controller.all = (req, res) => {
    routes.allRoutes()
        .then(data => res.json(data))
        .catch(err => console.log('Error: allRoutes:', err));
};

controller.createDummy = (req,res) => {
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

controller.create = (req, res) => {
    // const obj = {
    //     start_lat: req.body.start_lat,
    //     start_lng: req.body.start_lng,
    //     start_addr: req.body.start_addr,
    //     start_name: req.body.start_name,
    //     end_lat: req.body.end_lat,
    //     end_lng: req.body.end_lng,
    //     end_addr: req.body.end_addr,
    //     end_name: req.body.end_name,
    //     price: req.body.rpice,
    //     start_time: req.body.start_time
    // }

    const obj = {};

    const keys =
    ["start_lat", "start_lng", "start_addr", "start_name","end_lat", "end_lng", "end_addr", "end_name", "price", "start_time"];

    keys.forEach(key => {
        if(req.body[key]){
            obj[key] = req.body[key];
        } else {
            console.log("missing " + key);
        }
    });

    console.log(obj);

    routes.create(obj)
        .then(data => res.json(data))
        .catch(err => console.log('Error: create:', err));
}

module.exports = controller;