const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qnaDB'); 

const users_route = require('./routes/users.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', users_route);

app.listen(8000, ()=>{console.log('Server Running at 8000')});