var mongoose = require('mongoose');
var Q = require('q');

// Load the dictionary
// mongoimport -d mydb -c things --type csv --file locations.csv --headerline
// mongoimport -d Products -c dictionary --type csv --file "D:\My Documents\Downloads\dictionary2.csv" --headerline
mongoose.connect('mongodb://localhost/Products');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Keyword = new Schema({
	expression : String
  , feature_id : String
  , frequency  : String
},
{collection: 'dictionary'});

var myKeyword = mongoose.model('Keyword', Keyword);

var stat = new Schema({
	productId : String
  , featureId : String
  , counters  : {
  		positives : Number,
  		negatives : Number, 
  		neutrals : Number
  }
},
{collection: 'stats'});

var myStat = mongoose.model('Stat', stat);

var product = new Schema({
	productId : Number
  , productName : String
  , zapId : Number
},
{collection: 'products'});

var myProduct = mongoose.model('Product', product);

var user = new Schema({
	username : String,
	email : String,
	isAdmin : Boolean
},
{collection: 'users'});

var myUser = mongoose.model('User', user);

var search = new Schema({
	categoryId : String,
	count : Number
},
{collection : 'searchStat'});

var mySearch = mongoose.model('search', search);

var getObject = function(objectName) {
	switch (objectName) {
		case ("keyword") : {
			return myKeyword;
		}
		case ("stat") : {
			return myStat;
		}
		case ("product") : {
			return myProduct;
		}
		case ("user") : {
			return myUser;
		}
		case ("search") : {
			return mySearch;
		}
	}
}

module.exports = {
	getObject : getObject
}