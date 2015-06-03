var weka = require('../node_modules/node-weka/lib/weka-lib');

var features =
{
	"1": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"2": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"5": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"7": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"11": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"13": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"14": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"15": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"16": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"17": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"19": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"20": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"21": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	},
	"23": {
		classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
		classifierParams: ""
	}
};	
var sentimentsClassifier = function (wekaJarPath, trainDirectory, modelsDirectory, tempFilesFolder) {
	this.modelsDirectory = modelsDirectory;
	this.trainDirectory = trainDirectory;
	this.wekaJarPath = wekaJarPath;
	this.tempFilesFolder = tempFilesFolder;
};

var sentencesByFeaturesDictionary = function(featureSentenceCouples) {

	var dictionary = {};
	
	for (var i = 0, len = featureSentenceCouples.length; i < len; i++)
	{
		var couple = featureSentenceCouples[i];
		
		if (typeof dictionary[couple.featureId.toString()] === "undefined")
			dictionary[couple.featureId.toString()] = [];
			
		dictionary[couple.featureId.toString()].push(couple.sentence);
	}
	
	return dictionary;
};

var getCopyOfSentences = function(arrayOfSentences) {
	var copyArray = [];
	arrayOfSentences.forEach(function(sentence){
		copyArray.push(sentence.replace(/[|&;$%@"<>()+,!.?\-\*'#\^_:]/g, ""));
	})
	
	return copyArray;
}

sentimentsClassifier.prototype.classify = function (featureSentenceCouples, callback) {
	var sentencesByFeatures = sentencesByFeaturesDictionary(featureSentenceCouples);
	var featureKeys = Object.keys(sentencesByFeatures),
		numFeatures = featureKeys.length;

	var results = [];
	var that = this;
	
	function handleFeature(currFeature) {
	
		if (currFeature >= numFeatures) {
			callback(undefined, results);
			return;
		}
		var featureId = featureKeys[currFeature];
		
		var feature = features[featureId];
		
		console.log(getCopyOfSentences(sentencesByFeatures[featureId]));

		weka.classify2(
			this.modelsDirectory + "\\3_classes_feature_" + featureId + ".model",
			this.trainDirectory + "\\3_classes_feature_" + featureId + ".arff",
			getCopyOfSentences(sentencesByFeatures[featureId]),
			{ 
				classifier: feature.classifier,
				params: feature.classifierParams,
				classIndex: 1,
				jarPath: this.wekaJarPath,
				workingDirectory: this.tempFilesFolder,
				filter: "weka.filters.unsupervised.attribute.StringToWordVector",
				filterParams: '-R first-last -W 1000 -prune-rate -1.0 -T -I -N 1 -stemmer weka.core.stemmers.NullStemmer -M 2 ' +
					'-tokenizer \"weka.core.tokenizers.NGramTokenizer -delimiters \\" \\\\r\\\\n\\\\t.,;:\\\\\\\'\\\\\\\"()?!\\" -max 3 -min 1',
			},
			function (errors, currResults) {
			
				if (errors) {
					callback(errors);
					return;
				}
				
				for (var i = 0, len = currResults.length; i < len; i++) {
					results.push({
						predicted: currResults[i].predicted,
						certainty: currResults[i].certainty,
						featureId: featureId,
						sentence: sentencesByFeatures[featureId][i]
					});
				}
					
				console.log("Finished " + currResults.length + " sentences for feature #" + featureId);
				handleFeature.call(that, currFeature + 1);
			});
	}
	
	handleFeature.call(this, 0);
};

if (typeof module !== "undefined") {
    module.exports = {
        sentimentsClassifier: sentimentsClassifier,
    };
}