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
	}
}

module.exports = {
	getObject : getObject
}

// exports.getObject = getObject;
// exports.product = myProduct;
// exports.product.find = Q.nfbind(myProduct.find.bind(myProduct));