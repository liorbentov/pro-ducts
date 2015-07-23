var express = require('express');
var products = require('./products.js');
var sentences = require('./sentence.js');
var features = require('./feature.js');
var users = require('./user.js');
var DB = require('./db.js');
var Q = require('q');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + "/../public"));

app.get('/', function(req, res){
	res.redirect('index.html');
});

app.get('/users', function(req, res){
	users.getUsers().then(function(users){
		res.json(users);
	}).catch(function(err){
		res.json(err);
	})
});

app.get('/users/:username', function(req, res){
	users.getByUsername(req.params.username).then(function(user){
		res.json({"success":user});
	}).catch(function(err){
		res.json({"error":err});
	})
});

app.post('/users/register', function(req, res){
	users.register(req.body).then(function(answer){
		res.json({"success":answer});
	})
	.catch(function(error){
		res.json({"error":error});	
	});
});

app.put('/users/admin/:username', function(req, res){
	res.json(users.updateAdmin(req.params.username));
});

app.delete('/users/:username', function(req, res){
	users.deleteUser(req.params.username).then(function(result){
		res.json(result);
	}).
	catch(function(error){
		res.json(error);	
	})
});

app.get('/features', function(req, res){
	res.json(features.getFeatures());
});

// Get the sentences (comments) for the product
app.get('/products/:productId/sentences', function(req, res){
	products.getSentencesByProductId(req.params.productId)
		.then(function(productComments){
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

	products.calcGradesByImportantFeatures(importantFeatures, res);
});

app.get('/filterProducts', function(req, res){

	products.getProductsGradesWithFilters(req.query.featureId, (req.query.grade/100), function(err, results){
		var filteredByGrades = results.map(function(product){
			return (product._id * 1);
		});
		var filteredByProductName = [];
		products.filterProductsByName(req.query.name).then(function(results){

			results.forEach(function(entry){
				if (filteredByGrades.indexOf(entry.productId) != -1) {
					filteredByProductName.push(entry);
				}
			});

			res.json(filteredByProductName);

		}).catch(function(){
			res.json({error:"error"});
		});		
	});
});

app.get('/products', function(req, res){
	// products.getProducts(res);
	product.getProducts()
		.then(function(data){res.json(data)})
		.catch(function(error){
			res.json({"error" : "Error in products.js - getProducts" + (error ? error : "")});
		})
})

app.get('/products/:productId/grades', function(req, res){
	products.getProductGrades(req.params.productId, function(error, data){
		
		var grades = data[0].feats.map(function(currentValue, index, array){
			return {
				feature : features.getFeatures()[currentValue.featureId],
				grade: (currentValue.grade * 100).toFixed(2)
			};
		});

		res.json(grades);
	})
});

app.get('/picture', function(req, res){
	products.getProductPicture(req.query.productName, res);
})

app.get('/disassemble', function(req, res){
	sentences.splitToSentences(req.query.fullText, res);
});

app.get('/graph1', function(req, res){
	console.log("hello");
	res.json([{
	  letter : "A", 
	  frequency : 0.08167
	}]);
});

app.get('*', function(req, res){
	res.redirect('/#' + req.originalUrl);
});

var conncetedUsers = 0;

io.on('connection', function(socket){

	socket.on('login', function(){
		conncetedUsers++;
		io.emit("server-user-login", conncetedUsers);
	  	console.log('a user connected');
	});

	socket.on('logout', function(){
  		conncetedUsers--;
		io.emit("server-user-logout", conncetedUsers);
	  	console.log('a user disconnected');
	});

});

server.listen(4444);