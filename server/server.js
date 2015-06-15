var express = require('express');
var products = require('./products.js');
var sentences = require('./sentence.js');
var features = require('./feature.js');
var DB = require('./db.js');
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
	sentences.splitToSentences(req.query.fullText, res);
});

app.get('/features', function(req, res){
	res.json(features.getFeatures());
});

app.get('/productSentences', function(req, res) {
	var sentencesToClassify = [];
	var sendToClassify3 = [];
	var counter = 1;
	products.getSentencesByProductId(req.query.productId).then(function(productComments){
		sentences.splitAndFindFeatures(productComments).then(function(sentencesWithFeatures){
			
			sentences.combineFeaturesAndSentences(req.query.productId, sentencesWithFeatures).then(function(endResults){

				res.json(endResults);
			});
		});
	});


});

var doAll = function() {
	return Q.promise(function(resolve, reject){
		var sentencesToClassify = [];
		var sendToClassify3 = [];
		var counter = 1;
		products.getSentencesByProductId(req.query.productId).then(function(productComments){
			sentences.splitAndFindFeatures(productComments).then(function(sentencesWithFeatures){
				
				sentences.combineFeaturesAndSentences(req.query.productId, sentencesWithFeatures).then(function(endResults){

					resolve(endResults);
				});
			});
		});
	})
}

app.get('/aggregate', function(req, res){

	var importantFeatures = [];

	if (req.query.important) {
		if (typeof(req.query.important) == "string") {
			importantFeatures.push(req.query.important);
		}
		else {
			importantFeatures = req.query.important;
		}
	}

	DB.getObject("stat")/*.aggregate([
			{$group:{_id: "$productId", feats:{$push : { count: {$literal : 1}, featureId : "$featureId", grade :
        {$divide : ["$counters.positives",{$add:["$counters.positives", "$counters.negatives"]}]}} }}}
       ,{$project : {_id:1, features: "$feats"}}
       ,{$sort : {_id : 1}}
		])*/
	.aggregate([
			{$group:{_id: "$productId", feats:{$push : { count: {$literal : 1}, featureId : "$featureId", grade :
        {$cond: { if: { $ne: [ {$add:["$counters.positives", "$counters.negatives"]}, 0 ] }, then: {$divide : ["$counters.positives",{$add:["$counters.positives", "$counters.negatives"]}]}, else: 0 }}                                
        
        
        } }}}
       ,{$project : {_id:1, features: "$feats"}}
       ,{$sort : {_id : 1}}
		])
	.exec(function(err, results){shtuty(results,
			importantFeatures.map(function(currentValue, index, array){return currentValue*1}), res)});
})

var shtuty = function(array, importantFeatures, res) {
	var results = [];
	array.forEach(function(product){
		var featuresSum = 0;
		var featuresCount = 0;
		product.features.forEach(function(feature){
			featuresSum += (importantFeatures.indexOf(feature.featureId) == -1 ? feature.grade : feature.grade*2);
			featuresCount += (importantFeatures.indexOf(feature.featureId) == -1 ? feature.count : feature.count*2);
		});

		var tempFeatures = product.features.map(function(currentValue, index, array){
			return Number.parseInt(currentValue.featureId);
		})

		// importantFeatures.forEach(function(vipFeature){
		// 	if (tempFeatures.indexOf(vipFeature) == -1) {
		// 		featuresSum -= 0.1;
		// 	}
		// })

		results.push({
			product : product._id,
			grade : (featuresSum/featuresCount),
			features : product.features,
			tempFeatures : tempFeatures
		});
	});

	sortByFeatures(results, importantFeatures)
		.then(function(tempResults){
			tempResults.forEach(function(bla){
				console.log(bla.tempFeatures, bla.grade)
				}); /*sortByKey(tempResults, "grade").then(
		function(shtuty){*/
				res.json(tempResults/*shtuty*/.map(function(currentValue, index, array){
					var productToReturn = products.getProductNameById(currentValue.product);
					productToReturn.grade = currentValue.grade;
					productToReturn.features = currentValue.features;
					return (productToReturn);
				}));
			})/*})*/  ;
};

var sortByKey = function(array, key) {
	return Q.promise(function(resolve, reject) {
	    resolve(array.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    })) ;
	});
}

var sortByFeatures = function(array, features) {
	return Q.promise(function(resolve, reject) {
	    resolve(array.sort(function(a, b) {
	        var x = countVIPFeatures(a, features); var y = countVIPFeatures(b, features);
	        var x2 = a["grade"]; var y2 = b["grade"];
	        return ((x > y) ? -1 : ((x < y) ? 1 : ((x2 > y2) ? -1 : ((x2 < y2) ? 1 : 0))));
	    })) ;
	});	
}

var countVIPFeatures = function(product, features) {
	var counter = 0;
	features.forEach(function(feature){
		if (product.tempFeatures.indexOf(feature) != -1) {
			counter++;
		}
	});
	return counter;
}

app.get('/products', function(req, res){
	products.getProducts(res);
})

app.get('/picture', function(req, res){
	products.getProductPicture(req.query.productName, res);
})

app.get('*', function(req, res){
	res.redirect('/#' + req.originalUrl);
});


server.listen(4444);
