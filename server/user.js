var DB = require('./db.js');
var Q = require('q');

var register = function(user) {
	return new Q.promise(function(resolve, reject){
		// Check if there is already a user with the same username
		getByUsername(user.username).then(function(){
			reject("There is already a user with this username");
		})
		.catch(function(err){
			// Add to DB
			var instance = new DB.getObject("user")();
			instance.username = user.username;
			instance.email = user.email;
			instance.isAdmin = false;

			instance.save(function(err) {
				if (!err) {
					console.log("success!");
					resolve(instance);
				}
			}); 
		});
	});
};

var updateAdmin = function(username) {
	console.log(username);
	getByUsername(username).then(function(userFromDB){
		console.log(userFromDB);
		userFromDB.isAdmin = !userFromDB.isAdmin;
		userFromDB.save(function(err){
			if (!err) {
				console.log("Update success!");
				return true;
			} else {
				return false;
			}
		})
	})
	.catch(function(err){

		console.log(err);
		return false;
	});

}

var getUsers = function(username) {
	return new Q.promise(function(resolve, reject){
		DB.getObject("user").find({}, function(err,docs){
			if (err || docs.length == 0) {
				reject(err);
			}
			else {
				resolve(docs);
			}
		});
	});
}

var getByUsername = function(username) {
	return new Q.promise(function(resolve, reject){
		DB.getObject("user").find({"username":username}, function(err,docs){
			if (err || docs.length == 0) {
				reject(err);
			}
			else {
				resolve(docs[0]);
			}
		});
	});
}

var deleteUser = function(username) {
	return new Q.promise(function(resolve, reject){
		DB.getObject("user").remove({"username":username}, function(err,docs){
			if (err) {
				reject(err);
			}
			else {
				resolve(true);
			}
		});
	});
}

module.exports = {
	register : register,
	getUsers : getUsers,
	deleteUser : deleteUser,
	updateAdmin : updateAdmin,
	getByUsername : getByUsername
}