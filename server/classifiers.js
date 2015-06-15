
var classifiers = [
{
    classifier: 'weka.classifiers.meta.Vote',
    classifierParams: ' -S 1 ' +
        '-B "weka.classifiers.bayes.NaiveBayesMultinomialUpdateable" ' +
        '-B "weka.classifiers.bayes.ComplementNaiveBayes -S 1.0" ' +
        '-B "weka.classifiers.trees.RandomForest -I 100 -K 0 -S 1" ' +
        '-B "weka.classifiers.trees.FT -I 15 -F 0 -M 15 -W 0.0" ' /*+
        '-B "weka.classifiers.functions.LibSVM -S 0 -K 2 -D 3 -G 1.1 -R 1.1 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 1" -R AVG'*/
},
{
    classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
    classifierParams: ""
},
{
    classifier: 'weka.classifiers.meta.AdaBoostM1',
    classifierParams: "-P 100 -S 1 -I 10 -W weka.classifiers.bayes.ComplementNaiveBayes -- -S 1.0"
},
{
    classifier: 'weka.classifiers.meta.AdaBoostM1',
    classifierParams: "-P 100 -S 1 -I 10 -W weka.classifiers.bayes.NaiveBayesMultinomial"
},
{
    classifier: 'weka.classifiers.bayes.NaiveBayesMultinomial',
    classifierParams: ""
},
{
    classifier: 'weka.classifiers.bayes.DMNBtext',
    classifierParams: "-I 1"
},
{
    classifier: 'weka.classifiers.bayes.NaiveBayesUpdateable',
    classifierParams: ""
},
{
    classifier: 'weka.classifiers.bayes.NaiveBayes',
    classifierParams: ""
},
{
    classifier: 'weka.classifiers.bayes.BayesNet',
    classifierParams: "-D -Q weka.classifiers.bayes.net.search.local.K2 -- -P 1 -S BAYES -E weka.classifiers.bayes.net.estimate.SimpleEstimator -- -A 0.5"
},
{
    classifier: 'weka.classifiers.bayes.ComplementNaiveBayes',
    classifierParams: "-S 1.0"
},
// ------------------ Trees --------------------
{
    classifier: 'weka.classifiers.trees.RandomForest',
    classifierParams: "-I 100 -K 0 -S 1"
},
{
    classifier: 'weka.classifiers.trees.RandomForest',
    classifierParams: "-I 150 -K 0 -S 1"
},
{
    classifier: 'weka.classifiers.trees.RandomForest',
    classifierParams: "-I 100 -K 0 -S 2"
},
{
    classifier: 'weka.classifiers.trees.FT',
    classifierParams: "-I 15 -F 0 -M 15 -W 0.0"
},
// ------------------ Functions & Lazy --------------------
{
    classifier: 'weka.classifiers.lazy.KStar',
    classifierParams: "-B 30 -M a"
}/*,
{
    classifier: 'weka.classifiers.functions.LibSVM',
    classifierParams: "-S 0 -K 1 -D 3 -G 1.0 -R 1.0 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 1"
},
{
    classifier: 'weka.classifiers.functions.LibSVM',
    classifierParams: "-S 0 -K 1 -D 3 -G 1.0 -R 1.0 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 2"
},
{
    classifier: 'weka.classifiers.functions.LibSVM',
    classifierParams: "-S 0 -K 1 -D 3 -G 1.0 -R 1.0 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 2"
},*/
];
/*
// LibSVM different params
for (var c = 0.1; c < 3; c += 1)
{
    for (var g = 0.1; g < 4; g += 01)
    {
        classifiers.push(
        {
            classifier: 'weka.classifiers.functions.LibSVM',
            classifierParams: "-S 0 -K 1 -D 3 -G " + g.toString() + " -R 1.0 -N 0.5 -M 40.0 -C " + c.toString() + " -E 0.001 -P 0.1 -seed 1"
        });
    }
}*/

// DMNBText different params
for (var i = 1; i < 10; i += 2)
{
    classifiers.push(
    {
        classifier: 'weka.classifiers.bayes.DMNBtext',
        classifierParams: "-I " + i.toString() + " -M"
    });
}


var featureClassifiers =
{
    "1": {
	    classifier: 'weka.classifiers.meta.Vote',
	    classifierParams: ' -S 1 ' +
		'-B "weka.classifiers.bayes.NaiveBayesMultinomialUpdateable" ' +
		'-B "weka.classifiers.bayes.ComplementNaiveBayes -S 1.0" ' +
		'-B "weka.classifiers.trees.RandomForest -I 100 -K 0 -S 1" ' +
		'-B "weka.classifiers.trees.FT -I 15 -F 0 -M 15 -W 0.0" ' /*+
		'-B "weka.classifiers.functions.LibSVM -S 0 -K 2 -D 3 -G 1.1 -R 1.1 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 1" -R AVG'*/
    },
    "2": {
	    classifier: 'weka.classifiers.meta.Vote',
	    classifierParams: ' -S 1 ' +
		'-B "weka.classifiers.bayes.NaiveBayesMultinomialUpdateable " ' +
		'-B "weka.classifiers.bayes.ComplementNaiveBayes -S 1.0" ' +
		'-B "weka.classifiers.trees.RandomForest -I 100 -K 0 -S 1" ' +
		'-B "weka.classifiers.trees.FT -I 15 -F 0 -M 15 -W 0.0" ' /*+
		'-B "weka.classifiers.functions.LibSVM -S 0 -K 2 -D 3 -G 1.1 -R 1.1 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 1" -R AVG'*/
    },
    "5": {
        classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
        classifierParams: ""
    },
    "7": {
        classifier: 'weka.classifiers.bayes.DMNBtext',
        classifierParams: "-I 1 -M"
    },
    "11": {
        classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
        classifierParams: ""
    },
    "13": {
        classifier: 'weka.classifiers.bayes.DMNBtext',
        classifierParams: "-I 7 -M"
    },
    "14": {
        classifier: 'weka.classifiers.bayes.DMNBtext',
        classifierParams: "-I 1 -M"
    },
    "15": {
	    classifier: 'weka.classifiers.trees.FT',
	    classifierParams: "-I 15 -F 0 -M 15 -W 0.0"
    },
    "16": {
	    classifier: 'weka.classifiers.trees.FT',
	    classifierParams: "-I 15 -F 0 -M 15 -W 0.0"
    },
    "17": {
        classifier: 'weka.classifiers.bayes.DMNBtext',
        classifierParams: "-I 3 -M"
    },
    "19": {
	    classifier: 'weka.classifiers.trees.RandomForest',
	    classifierParams: "-I 100 -K 0 -S 1"
    },
    "20": {
	    classifier: 'weka.classifiers.meta.Vote',
	    classifierParams: ' -S 1 ' +
		'-B "weka.classifiers.bayes.NaiveBayesMultinomialUpdateable " ' +
		'-B "weka.classifiers.bayes.ComplementNaiveBayes -S 1.0" ' +
		'-B "weka.classifiers.trees.RandomForest -I 100 -K 0 -S 1" ' +
		'-B "weka.classifiers.trees.FT -I 15 -F 0 -M 15 -W 0.0" ' /*+
		'-B "weka.classifiers.functions.LibSVM -S 0 -K 2 -D 3 -G 1.1 -R 1.1 -N 0.5 -M 40.0 -C 1.0 -E 0.001 -P 0.1 -seed 1" -R AVG'*/
    },
    "21": {
	    classifier: 'weka.classifiers.bayes.ComplementNaiveBayes',
	    classifierParams: "-S 1.0"
    },
    "23": {
        classifier: 'weka.classifiers.bayes.NaiveBayesMultinomialUpdateable',
        classifierParams: ""
    }
};

if (typeof module !== "undefined") {
    module.exports = {
        allClassifiers: classifiers,
        featureClassifiers: featureClassifiers
    };
}
