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
				//sendToClassify3 = endResults;
				res.json(endResults);
			});
		});
	});


});

app.get('/aggregate', function(req, res){
	DB.getObject("stat").aggregate([{$match : {featureId: "1"}},{$project : {productId : 1, featureId: 1, "counters.positives": 1, "counters.negatives": 1 , "counters.neutrals" : 1 , grade: {$divide : ["$counters.positives",{$add:["$counters.positives", "$counters.negatives", "$counters.neutrals"]}]}}}, {$match : {grade :{$gt : 0.9}}}]).exec(function(err, results){res.json(results)});
})

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