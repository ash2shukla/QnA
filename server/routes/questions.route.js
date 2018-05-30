const express = require('express');
const controller = require('../controllers/questions.controller')
const router = express.Router();


// post_params: {q_text: <question's text>, token: <user's token>}
router.post('/ask', controller.ask );

// No query params
router.get('/getall', controller.getall);

// post_params: {_id: <question's_object_id>, token: <user's token>}
router.post('/upvote', controller.upvote);

// post_params: {_id: <question's_object_id>, token: <user's token>}
router.post('/downvote', controller.downvote);

module.exports = router;