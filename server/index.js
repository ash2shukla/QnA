const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qnaDB'); 

const users_route = require('./routes/users.route');
const questions_route = require('./routes/questions.route');
const answers_route = require('./routes/answers.route');
const isauthed_middleware = require('./middlewares/isauthed.middleware').isauthed;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(isauthed_middleware);
app.use('/users', users_route);
app.use('/questions', questions_route);
app.use('/answers', answers_route);

app.listen(8000, ()=>{console.log('Server Running at 8000')});