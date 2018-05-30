const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./users.model').UserSchema;

AnswerSchema = new Schema({
    answeredby: { type: Schema.Types.ObjectId, ref: 'User' },
    a_text: String,
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
    upvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.AnswerModel = mongoose.model('Answer', AnswerSchema );