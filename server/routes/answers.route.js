const express = require('express');
const controller = require('../controllers/answers.controller')
const router = express.Router();

// post_params: {_id: <question's_object_id>, a_text: <answer's text>, token: <user's token>}
router.post('/reply', controller.reply );

// get query params: {_id: <question's_object_id>}
router.get('/getall', controller.getall);

// post_params: {_id: <answer's_object_id>, token: <user's token>}
router.post('/upvote', controller.upvote);

// post_params: {_id: <answer's_object_id>, token: <user's token>}
router.post('/downvote', controller.downvote);

module.exports = router;