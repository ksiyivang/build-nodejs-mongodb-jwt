const controller = require('../controllers/register.controller');


const router = require('express').Router();

router.post('/register', controller.register);


router.get('/login', controller.login)


module.exports = router;