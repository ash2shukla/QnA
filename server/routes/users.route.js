const express = require('express');
const controller = require('../controllers/users.controller')
const router = express.Router();

// post_params: {username: <username>, first_name: <first_name>, last_name: <last_name>, password: <password> }
router.post('/signup/', controller.signup );

// post_params: {username:<username> , password:<password> }
router.post('/signin/', controller.signin);

// post_params: {token: <user's token>}
router.post('/signout/', controller.signout);


module.exports = router;