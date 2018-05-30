const user_models = require('../models/users.model');
const answer_models = require('../models/answers.model');
const question_models = require('../models/questions.model');

exports.reply = (req, res)=>{
	var Answer = new answer_models.AnswerModel();
    if(req.isauthed) {
    	Answer.answeredby = req.user._id;
    	Answer.a_text = req.body.a_text;
    	// Check if the current user has already answered the question
    	// i.e. if there exists any answer that has answeredby = req.user
    	question_models.QuestionModel.findOne({_id:req.body._id}, (err, question)=> {
    		if (err) {
    			res.send(err);
    		} else {
    			answer_models.AnswerModel.find({_id: {$in: question.answer_references}}, (err, answers)=>{
					if (err) {
						res.send(err);
					} else {
						var is_already_answered = false;
						for(var i=0; i< answers.length; i++ ) {
							if(answers[i].answeredby.toString() === req.user._id.toString()) {
								is_already_answered = true;
								break;
							}
						}
						if(is_already_answered) {
							res.json({message: 'Already Answered'});
						} else {
							Answer.save((err, answer)=> {
								if(err) {
									res.send(err);		
								} else {
									question.answer_references.push(answer);
									question.save((err)=> {
										if(err) {
											res.send(err);
										} else {
											res.json({message: 'Answer Created'});
										}
									});
								}
							})
						}
					}
				});
    		}
    	});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.getall = (req, res)=>{
	question_models.QuestionModel.findOne({_id: req.query._id}, (err, question)=> {
		if (err) {
			res.send(err);
		} else {
			console.log(req.body._id);
			answer_models.AnswerModel.find({_id: {$in: question.answer_references}}, (err, answers)=>{
				if (err) {
					res.send(err);
				} else {
					res.json(answers);
				}
			});
		}
	});
}

exports.upvote = (req, res)=>{
	if(req.isauthed) {
		// Disallow Upvote if already upvoted
		answer_models.AnswerModel.count({_id: req.body._id, upvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count !=0) {
					res.json({message: 'Upvote Disallowed'});
				} else {
					// Pull downvote if user has had downvoted it before
					answer_models.AnswerModel.update({_id: req.body._id, downvotes_references: req.user._id }, 
			    		{$pull: { downvotes_references: req.user._id }, $inc: {downvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
			    				// Else increment the upvotes count and push user in upvotes array
						    	answer_models.AnswerModel.update({_id: req.body._id}, 
						    		{$push: { upvotes_references: req.user }, $inc: {upvotes: 1}},
						    		(err, result)=>{
						    			if(err) {
						    				res.send(err);
						    			} else {
						    				res.json({message: 'Upvote Successful!'})
						    			}
						    		});
			    			}
			    		});
				}
    		}
		});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.downvote = (req, res)=>{
	if(req.isauthed) {
		// Disallow downvote if user has already downvoted it 
		answer_models.AnswerModel.count({_id: req.body._id, downvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count != 0) {
					res.json({message: 'Downvote Disallowed'});
				} else {
					// Pull upvote if user has had upvoted it before
					answer_models.AnswerModel.update({_id: req.body._id, upvotes_references: req.user._id }, 
			    		{$pull: { upvotes_references: req.user._id }, $inc: {upvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
			    				// Else increment the downvotes count and push user in downvotes array
						    	answer_models.AnswerModel.update({_id: req.body._id}, 
						    		{$push: { downvotes_references: req.user }, $inc: {downvotes: 1}},
						    		(err, result)=>{
						    			if(err) {
						    				res.send(err);
						    			} else {
						    				res.json({message: 'Downvote Successful!'})
						    			}
						    		});
			    			}
			    		});
				}
    		}
		});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}