const user_models = require('../models/users.model');
exports.isauthed = (req, res, next) => {
	user_models.TokenModel.findOne({ token: req.body.token }, (err, result) => {
		if(err) {
			res.json({message: 'Operation Failed!'});
		} else {
			if (result == null) {
				req.isauthed = false;
				next();
			} else {
				req.isauthed = true;
				user_models.UserModel.findOne({username: result.username},
				(err, result)=>{
					req.user = result;
					next();
				});
			}
		}
	});
}