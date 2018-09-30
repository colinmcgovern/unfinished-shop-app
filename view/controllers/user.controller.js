//TODO figure out why this isn't generating tokens
var crypto = require('crypto');

function gen_token(){
	return crypto.randomBytes(64).toString('hex');
}

const User = require('../models/user.model');

//Simple Controller, missing validation or sanitation 
exports.test = function(req,res) {
	res.send('Greetings from the Test Controller');
}

//Create 
//This is both user creation and user logins 
//THIS LOGIN SYSTEM IS NOT HASHED, NOR DIAGRAMED, NOR PEN TESTED. YOUR INFORMATION IS NOT SAFE ON THIS SERVER
exports.user_create = function (req, res) {

	var new_token = gen_token();

	var user = new User({
		username: req.body.username,
		password: req.body.password,
		token: new_token,
	});

	var users_found = 0; 

    User.find({ username: req.body.username}).countDocuments( function (err, result) {
        if (err) return next(err);

      	users_found = result;
		if(users_found){

			var password_correct = 0; 

			console.log("user has been found");

			User.find({ username: req.body.username, password: req.body.password }).countDocuments( function (err, result) {
				password_correct = result; 
				if(password_correct){

					console.log(req.body.username + " logged in successfully");

					//FIGURE OUT WHY THIS UPDATE ISN'T WORKING
					User.findOneAndUpdate({ username: req.body.username }, {$set: {token: new_token }}, function (err, user) {
				        if (err) return next(err);
				   		console.log("successful login token set");
				        //res.send(new_token);
				    });

				}else{
					console.log('password incorrect');
					//res.send('Wrong password or username');
				}
			});
		}
		else{
			user.save(function (err) {
				if (err) {
					return next (err);
				}
				//res.send(new_token);
			});
			//res.send('Something went wrong');
		}
		res.send(new_token);
    });

};

//Read 
exports.user_details = function (req, res) {
	User.findOne({ token: req.params.token }, {username: 1 }, function (err, result) {
        if (err) return next(err);
        res.send(result);
    });
};

//Update 
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User updated.');
    });
};

//Delete
exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};