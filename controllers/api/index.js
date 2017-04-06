const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.all);
// ONLY POST HERE FOR DUMMY DATA!
router.post('/', controller.create);

module.exports = router;