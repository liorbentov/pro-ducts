var DB = require('./db.js');
var Q = require('q');

var weka = require('../node_modules/node-weka/lib/weka-lib');
var sentimentsClassifier =
	new (require('./sentiments-classifier.js').sentimentsClassifier)(
		".\\lib\\weka.jar",
		".\\training",
		".\\models",
		".\\temp");
	
var splitToSentences = function (fullText, response) {
	var sentences = [];
	fullText.match( /([^\r\n.!?]+([.!?]+|$))/gim).forEach(function(entry){sentences.push({sentence :entry})});

	getKeywords().then(function(docs){
		sentences.forEach(function(sentence){
			sentence.sentence = sentence.sentence.replace("פלפו","פלאפו").replace("פאלפו","פלאפו");
			docs.forEach(function(keyword){
				var wordRegex = new RegExp("(^|[^A-zא-ת])"+keyword.expression+"($|[^A-zא-ת])", "gim");
				// Check if keyword is in the sentence
				if (wordRegex.test(sentence.sentence)) {

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
			});
		});

		getClassification(sentences).then(function(toClassify){
			sentimentsClassifier.classify(toClassify, function(err, results){
				console.log(err);
				console.log("results", results);
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

var getKeywords = function(sentence) {
	return Q.promise(function(resolve, reject) {
		DB.getObject("keyword").find({}, function (err, docs) {
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


module.exports = {
	splitToSentences : splitToSentences
}