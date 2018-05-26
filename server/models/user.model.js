const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    first_name: String,
    last_name: String
});

TokenSchema = new Schema({
	username: {type: String, unique: true},
	token: String,
});

exports.UserModel = mongoose.model('User', UserSchema );
exports.TokenModel = mongoose.model('Token', TokenSchema );