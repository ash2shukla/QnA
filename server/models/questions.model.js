const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./users.model').UserSchema;
const AnswerSchema = require('./answers.model').AnswerSchema;

QuestionSchema = new Schema({
    askedby: { type: Schema.Types.ObjectId, ref: 'User' },
    q_text: String,
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
    answer_references: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    upvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.QuestionModel = mongoose.model('Question', QuestionSchema );