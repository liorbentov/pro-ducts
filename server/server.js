var express = require('express');
var app = express();

var mongoose = require('mongoose');

var Q = require('q');

var bodyParser = require('body-parser');

var server = require('http').Server(app);

var API_PATH = '/api/';

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.get('/', function(req, res){
	res.redirect('index.html');
});

app.get('/disassemble', function(req, res){
	console.log(req.query.fullText);
	splitToSentences(req.query.fullText, res);
})

app.get('*', function(req, res){
	res.redirect('/#' + req.originalUrl);
});

var splitToSentences = function (fullText, response) {
	var sentences = [];
	fullText.match( /([^\r\n.!?]+([.!?]+|$))/gim).forEach(function(entry){sentences.push({"sentence" :entry})});
	
	getKeywords().then(function(docs){
		sentences.forEach(function(sentence){
			docs.forEach(function(keyword){
				// Check if keyword is in the sentence
				if (sentence.sentence.indexOf(keyword.expression) != -1){
					
					// Check if it has feature
					if (!sentence.features) {
						sentence.features = [];
					}

					// Check if it already has this feature
					var featurePlace = -1;
					for (var featureIndex = 0; (featureIndex < sentence.features.length) && featurePlace < 0; featureIndex++) {
						 if (sentence.features[featureIndex].feature_name == keyword.feature_id) {
						 	featurePlace = featureIndex;
						 }
					}

					// Add the feature if it not already in the element
					if (featurePlace >= 0) {
						sentence.features[featurePlace].words.push({"word" : keyword.expression});
					}
					else {	
						sentence.features.push({"feature_name" : keyword.feature_id});
						sentence.features[sentence.features.length - 1].words = []
						sentence.features[sentence.features.length - 1].words.push({"word" : keyword.expression});
					}
				}
			})
		});

		response.json(sentences);
	})
};

// Load the dictionary
// mongoimport -d mydb -c things --type csv --file locations.csv --headerline
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

var getKeywords = function(sentence) {
	return Q.promise(function(resolve, reject) { 
		myKeyword.find({}, function (err, docs) {
			if (err || docs.lenght == 0) {
				reject("error");				
			}
			else {
				resolve(docs);	
			}
		})
	});
};


server.listen(4444);