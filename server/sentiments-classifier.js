var weka = require('../node_modules/node-weka/lib/weka-lib'),
    classifiers = require("./classifiers.js");

var NGramsTokenizer =
    '-R first-last -W 1000 -prune-rate -1.0 -T -I -N 1 -stemmer weka.core.stemmers.NullStemmer -M 2 ' +
	'-tokenizer \"weka.core.tokenizers.NGramTokenizer -delimiters \\" \\\\r\\\\n\\\\t.,;:\\\\\\\'\\\\\\\"()?!\\" -max 3 -min 1';


var sentimentsClassifier = function (wekaJarPath, trainDirectory, modelsDirectory, tempFilesFolder) {
	this.modelsDirectory = modelsDirectory;
	this.trainDirectory = trainDirectory;
	this.wekaJarPath = wekaJarPath;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	this.tempFilesFolder = tempFilesFolder;
    console.log(this.tempFilesFolder);
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

sentimentsClassifier.prototype.classify = function (featureSentenceCouples, callback) {
    console.log(featureSentenceCouples);
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

        var feature = classifiers.featureClassifiers[featureId];

        weka.classify2(
			this.trainDirectory + "\\3_classes_feature_" + featureId + ".arff",
            sentencesByFeatures[featureId],
			{
			    classifier: feature.classifier,
			    params: feature.classifierParams,
			    classIndex: 1,
			    jarPath: this.wekaJarPath,
			    workingDirectory: this.tempFilesFolder,/*
			    filter: "weka.filters.unsupervised.attribute.StringToWordVector",
			    filterParams: NGramsTokenizer*/
                filter: "weka.filters.unsupervised.attribute.StringToWordVector",
                filterParams: '-R first-last -W 1000 -prune-rate -1.0 -T -I -N 1 -stemmer weka.core.stemmers.NullStemmer -M 2 ' +
                    '-tokenizer \"weka.core.tokenizers.NGramTokenizer -delimiters \\" \\\\r\\\\n\\\\t.,;:\\\\\\\'\\\\\\\"()?!\\" -max 3 -min 1'
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

sentimentsClassifier.prototype.classifyProduct = function (productId, featureSentenceCouples, callback) {
    var sentencesByFeatures = sentencesByFeaturesDictionary(featureSentenceCouples);
    var featureKeys = Object.keys(sentencesByFeatures),
		numFeatures = featureKeys.length;

    var results = [],
        stats = [];
    var that = this;

    function handleFeature(currFeature) {

        // If we're finished
        if (currFeature >= numFeatures) {
            callback(undefined, results, stats);
            return;
        }
        var featureId = featureKeys[currFeature];

        var feature = classifiers.featureClassifiers[featureId];

        weka.classify3(
			this.trainDirectory + "\\3_classes_feature_" + featureId + ".arff",
            sentencesByFeatures[featureId],
            //sentencesByFeatures,//.featureClassifiers[featureId],
			{
			    classifier: feature.classifier,
			    params: feature.classifierParams,
			    classIndex: 1,
			    jarPath: this.wekaJarPath,
			    workingDirectory: this.tempFilesFolder,
			    filter: "weka.filters.unsupervised.attribute.StringToWordVector",
			    filterParams: NGramsTokenizer,
			},
			function (errors, currResults) {

			    if (errors) {
			        callback(errors);
			        return;
			    }

			    var counters = {
			        positives: 0,
			        negatives: 0,
			        neutrals: 0
			    };

			    for (var i = 0, len = currResults.length; i < len; i++) {
			        var predicted = currResults[i].predicted;

			        results.push({
			            predicted: predicted,
			            certainty: currResults[i].certainty,
			            featureId: featureId,
			            sentence: sentencesByFeatures//.featureClassifiers[featureId][i]
			        });

			        if (predicted === "Positive")
			            counters.positives++;
			        else if (predicted === "Negative")
			            counters.negatives++;
			        else
			            counters.neutrals++;
			    }

			    stats.push({ productId: productId, featureId: featureId, counters: counters });

			    console.log("Finished " + currResults.length + " sentences for feature #" + featureId +
                    " (" + counters.positives + " Positives, " + counters.negatives + " Negatives, " + counters.neutrals + " Neutrals)");
			    handleFeature.call(that, currFeature + 1);
			});
    }

    handleFeature.call(this, 0);
};


sentimentsClassifier.prototype.trainFeature = function (featureId, response, callback) {
    var results = [],
        stats = [];
    var that = this;

    var c_len = classifiers.allClassifiers.length;
    var classifyWith = function (c) {
        if (c >= c_len) {
            callback(undefined, results);
            return;
        }

        weka.classify4(
            featureId,
            that.trainDirectory + "\\3_classes_feature_" + featureId + ".arff",
            {
                classifier: classifiers.allClassifiers[c].classifier,
                params: classifiers.allClassifiers[c].classifierParams,
                classIndex: 1,
                jarPath: that.wekaJarPath,
                workingDirectory: that.tempFilesFolder,
                filter: "weka.filters.unsupervised.attribute.StringToWordVector",
                filterParams: NGramsTokenizer,
            },
            c === 0,
            function (errors, results2) {
                write2Response("<div style='height: 170px; position: relative; word-break: break-all;vertical-align: top; overflow-y: auto; display: inline-block; border:1px solid black; padding: 8px; width: 22%; margin:5px;'>" +
                    "<input type='checkbox' style ='position: absolute; right: 0; top: 0;'/>" +
                    "<strong>" + results2.classifier + "</strong>", response);
                if (errors) {
                    //callback(errors);
                    write2Response(errors.toString(), response);
                }
                else {

                    var currResults = results2.results;

                    var confusion = {
                        // Actual
                        positives: {
                            // Predicted
                            positives: 0,
                            negatives: 0,
                            neutrals: 0
                        },
                        // Actual
                        negatives: {
                            // Predicted
                            positives: 0,
                            negatives: 0,
                            neutrals: 0
                        },
                        // Actual
                        neutrals: {
                            // Predicted
                            positives: 0,
                            negatives: 0,
                            neutrals: 0
                        }
                    };

                    for (var i = 0, len = currResults.length; i < len; i++) {
                        var predicted = currResults[i].predicted,
                            actual = currResults[i].actual;

                        results.push({
                            actual: actual,
                            predicted: predicted,
                            certainty: currResults[i].certainty,
                            featureId: featureId
                        });

                        confusion[actual.toString().toLowerCase() + "s"][predicted.toString().toLowerCase() + "s"]++;
                    }



                    write2Response(confusion2str(confusion), response);

                    //stats.push({ productId: productId, featureId: featureId, counters: counters });

                    write2Response("<span>Accuracy: " + accuracy(confusion) + "</span>", response);
                }

                write2Response("</div>", response);


                if (c >= c_len) {
                    callback(undefined, results);
                    return;
                }
                else {
                    //write2Response("<u> " + (c + 1) + "</u>", response);
                    classifyWith.call(this, c + 1);
                }
            });
    }
    classifyWith.call(this, 0);
};

var confusion2str = function (confusion) {
    var result = "<table class='confusion'><tr><td>Actual/Predicted</td><td>Positives</td><td>Negatives</td><td>Neutral</td></tr>";


    for (var actual in confusion) {
        result += "<tr><td>" + actual + "</td>";
        for (var predicted in confusion[actual]) {
            result += "<td>" + confusion[actual][predicted] + "</td>";
        }
        result += "</tr>";
    }

    result += "</table>";

    return result;
};

var write2Response = function (str, response) {
    response.write(str.replace(/\n/gi, "<br/>"));
};

var accuracy = function (confusion) {
    var total = 0,
        tp = 0;

    for (var actual in confusion)
    {
        for (var predicted in confusion[actual]) {
            total += confusion[actual][predicted];
        }
    }

    for (var actual in confusion) {
        for (var predicted in confusion[actual]) {
            if (predicted === actual)
                tp += confusion[actual][predicted];
        }
    }

    return (tp / total);
};


if (typeof module !== "undefined") {
    module.exports = {
        sentimentsClassifier: sentimentsClassifier,
    };
}
