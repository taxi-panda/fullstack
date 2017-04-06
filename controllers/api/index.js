const router = require('express').Router();
const controller = require('./controller');

// This is for ~/api/

router.get('/', controller.all);
router.post('/', controller.create);
router.post('/start', controller.findByStartName);
// ONLY POST HERE FOR DUMMY DATA!
router.post('/dummy', controller.createDummy);

module.exports = router;