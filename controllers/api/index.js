const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.all);
// ONLY POST HERE FOR DUMMY DATA!
router.post('/dummy', controller.createDummy);
router.get('/start-name', controller.findByStartName);
router.post('/', controller.create);

module.exports = router;