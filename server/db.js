var mongoose = require('mongoose');

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


var getObject = function(objectName) {
	switch (objectName) {
		case ("keyword") : {
			return myKeyword;
		}
		case ("stat") : {
			return myStat;
		}
	}
}

module.exports = {
	getObject : getObject
}
