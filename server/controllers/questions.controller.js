const user_models = require('../models/users.model');
const question_models = require('../models/questions.model');

exports.ask = (req, res)=>{
	var Question = new question_models.QuestionModel();
    if(req.isauthed) {
    	Question.askedby = req.user;
    	Question.q_text = req.body.q_text;
    	Question.save((err) => {
	       if (err) {
	       	res.send(err);
	       } else {
	        res.json({ message: 'Question created!' });    
	       }
	    });
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.getall = (req, res)=>{
	question_models.QuestionModel.find({}, (err, questions)=> {
		if (err) {
			res.send(err);
		} else {
			res.json(questions);
		}
	});
}

exports.upvote = (req, res)=>{
	if(req.isauthed) {
		// Disallow Upvote if already upvoted
		question_models.QuestionModel.count({_id: req.body._id, upvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count !=0) {
					res.json({message: 'Upvote Disallowed'});
				} else {
					// Pull downvote if user has had downvoted it before
					question_models.QuestionModel.update({_id: req.body._id, downvotes_references: req.user._id }, 
			    		{$pull: { downvotes_references: req.user._id }, $inc: {downvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
			    				// Else increment the upvotes count and push user in upvotes array
						    	question_models.QuestionModel.update({_id: req.body._id}, 
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
		question_models.QuestionModel.count({_id: req.body._id, downvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count != 0) {
					res.json({message: 'Downvote Disallowed'});
				} else {
					// Pull upvote if user has had upvoted it before
					question_models.QuestionModel.update({_id: req.body._id, upvotes_references: req.user._id }, 
			    		{$pull: { upvotes_references: req.user._id }, $inc: {upvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
			    				// Else increment the downvotes count and push user in downvotes array
						    	question_models.QuestionModel.update({_id: req.body._id}, 
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