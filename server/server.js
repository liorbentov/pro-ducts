var express = require('express');
var products = require('./products.js');
var sentences = require('./sentence.js');
var features = require('./feature.js');
var DB = require('./db.js');
var mongoose = require('mongoose');
var Q = require('q');

var app = express();
var server = require('http').Server(app);

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

app.get('/sentences', function(req, res){
	products.getSentencesByProductId(req.query.productId).then(function(productComments){
		res.json(productComments);
	});
});

app.get('/aggregate', function(req, res){

	// Arrange important features from request in array
	var importantFeatures = [];

	if (req.query.important) {
		if (typeof(req.query.important) == "string") {
			importantFeatures.push(req.query.important);
		}
		else {
			importantFeatures = req.query.important;
		}
	}

	products.getProductsGradesByQuery(importantFeatures, res);
});

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

// Necessary only for building the DB
// app.get('/productSentences', function(req, res) {
// 	var sentencesToClassify = [];
// 	var sendToClassify3 = [];
// 	products.getSentencesByProductId(req.query.productId).then(function(productComments){
// 		sentences.splitAndFindFeatures(productComments).then(function(sentencesWithFeatures){
			
// 			sentences.combineFeaturesAndSentences(req.query.productId, sentencesWithFeatures).then(function(endResults){

// 				res.json(endResults);
// 			});
// 		});
// 	});
// });