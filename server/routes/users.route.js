const express = require('express');
const controller = require('../controllers/users.controller')
const router = express.Router();


router.post('/signup/', controller.signup );

router.post('/signin/', controller.signin);

router.post('/signout/', controller.signout);


module.exports = router;