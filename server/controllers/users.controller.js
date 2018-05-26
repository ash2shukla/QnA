const user_models = require('../models/user.model');

exports.signup = (req, res)=>{
	var User = new user_models.UserModel();
    User.first_name = req.body.first_name;
    User.last_name = req.body.last_name;
    User.username = req.body.username;
    User.password = req.body.password;

    User.save((err) => {
       if (err) {
       	res.send(err);
       } else {
        res.json({ message: 'User created!' });    
       }
    });
}

exports.signin = (req, res)=>{
	user_models.UserModel.count({username: req.body.username, password: req.body.password}, (err, c)=> {
		if(c>0) {
			// create a token
			var random_token = Math.random().toString(36).substring(2);
			user_models.TokenModel.update({username: req.body.username}, {username: req.body.username, token: random_token}, 
				{upsert: true, setDefaultsOnInsert: true},
			(err)=>{
				if (err) {
					res.json({message: 'Login Failed! Token Could not be generated!'});
				} else {
					res.json({message: 'Login Success!', token: random_token});		
				}
			});
		} else {
			res.json({message: 'Incorrect Credentials!'})
		}
	});
}

exports.signout = (req, res)=> {
	user_models.TokenModel.find({ token: req.body.token }).remove((err) => {
		if(err) {
			res.json({message: 'Logout Failed!'});
		} else {
			res.json({message: 'Logout Success!'})
		}
	} );
}

