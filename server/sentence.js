var DB = require('./db.js');
var Q = require('q');

var weka = require('../node_modules/node-weka/lib/weka-lib');
var sentimentsClassifier =
	new (require('./sentiments-classifier.js').sentimentsClassifier)(
		".\\lib\\weka.jar",
		".\\training",
		".\\models",
		".\\temp");
	/*
		"D:\\Weka-3-6\\weka.jar",
		"D:\\Development\\pro-ducts\\server\\training",
		"D:\\Development\\pro-ducts\\server\\models",
		"D:\\Development\\pro-ducts\\server\\temp"); */

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
				console.log(results);
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

var splitAndFindFeatures = function (fullTextArray) {
	return Q.promise(function(resolve, reject){
		var sentences = [];
		console.log(fullTextArray.length);
		fullTextArray.forEach(function(fullText){
			fullText.sentence.match(/([^\r\n.!?]+([.!?]+|$))/gim).forEach(function(entry){sentences.push({sentence :entry})});

		});

		getKeywords().then(function(docs){
			sentences.forEach(function(entry){
				entry.sentence = entry.sentence.replace("פלפו","פלאפו").replace("פאלפו","פלאפו").replace(/[^\w\sא-ת]/gi,'');
				docs.forEach(function(keyword){
					var wordRegex = new RegExp("(^|[^A-zא-ת])"+keyword.expression+"($|[^A-zא-ת])", "gim");
					// Check if keyword is in the sentence
					if (wordRegex.test(entry.sentence)) {

						// Check if it has feature
						if (!entry.features) {
							entry.features = {};
						}

						// Add the feature if it not already in the element
						if (!entry.features[keyword.feature_id]) {
							entry.features[keyword.feature_id] = {words: []};
						}

						entry.features[keyword.feature_id].words.push({word : keyword.expression});
					}
				});
			});

			resolve(sentences);
		});
	});
};


var combineFeaturesAndSentences = function(productId, sentencesArray) {
	return Q.promise(function(resolve, reject) {
		var sentencesToClassify = [];

		sentencesArray.forEach(function(sentenceEntry){
			for (feature in sentenceEntry.features) {
				try {
					sentencesToClassify.push({
						featureId : feature,
						sentence : sentenceEntry.sentence
					});
				}
				catch (err) {
					console.log(err + ": " + feature);
				}
			}
		});
		console.log("before classify");
		try {
			console.log(sentencesToClassify);
		sentimentsClassifier.classifyProduct(productId, sentencesToClassify, function (err, results, stats){

			console.log("hello");
			if (err) {
				console.log(err);
				reject(err);
			}
			if (results) {

				console.log(results);

				if (stats) {
					stats.forEach(function(statEntry){
						var instance = new DB.getObject("stat")();
						instance.productId = statEntry.productId;
						instance.featureId = statEntry.featureId;
						instance.counters = {
							positives : statEntry.counters.positives,
							negatives : statEntry.counters.negatives,
							neutrals : statEntry.counters.neutrals,
						};
						instance.save(function(err) {
							if (!err) {
								console.log("success!");
							}
						});
					});
					console.log(stats);
				}
				resolve(stats);
				//resolve(sentencesToClassify);
			}
		});
	}
	catch (error) {
		console.log(error);
	}
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
	splitToSentences : splitToSentences,
	splitAndFindFeatures : splitAndFindFeatures,
	combineFeaturesAndSentences : combineFeaturesAndSentences
};
