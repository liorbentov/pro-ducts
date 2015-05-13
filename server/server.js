var express = require('express');
var app = express();

var weka = require('../node_modules/node-weka/lib/weka-lib');
var sentimentsClassifier = 
	new (require('./sentiments-classifier.js').sentimentsClassifier)(
		"D:\\Weka-3-6\\weka.jar", 
		"D:\\Pro-Ducts\\server\\training", 
		"D:\\Pro-Ducts\\server\\models",
		"D:\\Pro-Ducts\\server\\temp");


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
	splitToSentences(req.query.fullText, res);
})

app.get('*', function(req, res){
	res.redirect('/#' + req.originalUrl);
});

var splitToSentences = function (fullText, response) {
	var sentences = [];
	fullText.match( /([^\r\n.!?]+([.!?]+|$))/gim).forEach(function(entry){sentences.push({sentence :entry})});
	
	getKeywords().then(function(docs){
		sentences.forEach(function(sentence){
			docs.forEach(function(keyword){
				// Check if keyword is in the sentence
				if (sentence.sentence.indexOf(keyword.expression) != -1){
					
					// Check if it has feature
					if (!sentence.features) {
						sentence.features = {};
					}

					// Add the feature if it not already in the element
					if (!sentence.features[keyword.feature_id]) {
						sentence.features[keyword.feature_id] = {words: []};
					}

					sentence.features[keyword.feature_id].words.push({word : keyword.expression});
				}
			})
		});
		
		getClassification(sentences).then(function(toClassify){
			sentimentsClassifier.classify(toClassify, function(err, results){
				var toResponse = [];
				results.forEach(function(entry){

					var sentencePlace = -1;
					for (var sentenceIndex = 0; (sentenceIndex < sentences.length) && sentencePlace < 0; sentenceIndex++) {
						 if (sentences[sentenceIndex].sentence == entry.sentence) {
						 	sentencePlace = sentenceIndex;
						 }
					}

					// Add the feature if it not already in the element
						sentences[sentencePlace].features[entry.featureId] = {
							words : sentences[sentencePlace].features[entry.featureId].words,
							featureId: entry.featureId,
							predicted: entry.predicted,
							certainty: entry.certainty,
						};
				});

				response.json(sentences);
			});
		}, function(error){
			console.log("this is an error: " + error);
				response.json(sentences);
		});
	});

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

var getClassification = function(sentences) {
	return Q.promise(function(resolve, reject){
		var toClassify = [];
		sentences.forEach(function(currSentence){
			if (currSentence.features){
				Object.keys(currSentence.features).forEach(function(currFeature){
					toClassify.push({
						featureId : currFeature,
						sentence : currSentence.sentence
					});
				})
			}
		});

		resolve(toClassify);
	});
};

server.listen(4444);