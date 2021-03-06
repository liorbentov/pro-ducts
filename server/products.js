var request = require("request");
var Q = require("q");
var DB = require('./db.js');

var getProducts = function() {
	return Q.promise(function(resolve, reject) {
		DB.getObject("product").find({}, function (err, docs) {
			if (err || docs.length == 0) {
				reject("error");
			}
			else {
				resolve(docs[0]);
			}
		})
	});
};

var getSentencesByProductId = function(productId) {
	return Q.promise(function(resolve, reject){
		var url = "http://pro-ducts.freeiz.com/productsSentences.php?productId=" + productId;

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {
		        resolve(body);
		    }
		    else {
		    	console.log(error);
		    	reject("{error: error}");
		    }
		})
	});
};

var getProductPicture = function(productName, res) {
	var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + productName;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        res.json(body);
	    }
	    else {
	    	res.json("{error: error}");
	    }
	})
};

var getProductById = function(productId) {
	return Q.promise(function(resolve, reject){
		DB.getObject("product").find({productId : productId}, function (err, docs) {
			if (err || docs.length == 0) {
				reject(err);
			}
			else {
				resolve(docs[0]);
			}
		});
	});
};

var filterProductsByName = function(nameFilter) {
	return Q.promise(function(resolve, reject){
		DB.getObject("product").find({productName:{ $regex : new RegExp(nameFilter, "i") } }, function (err, docs) {
			if (err || docs.length == 0) {
				reject(err);
			}
			else {
				resolve(docs);
			}
		});
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

// Groups products according to feature "grades"
var getProductGrades = function(productId, callback){
	DB.getObject("stat").aggregate([{
        $match: {"productId":productId }
    },{
        $group: {				_id : "$productId", // Group by product id
				feats : {							
					$push : {
						featureId : "$featureId", 
						grade :{
							$cond: { 				// Checks if the sum of pos and neg <> 0
				        		if : { 
				        			$ne : [{
				        				$add : [
				        					"$counters.positives", 
				        					"$counters.negatives"]
				        				}, 0 ] 
				        		}, 
				    			then: {				
				    				$divide : [
				    					"$counters.positives", {
				    						$add:[
				    							"$counters.positives", 
				    							"$counters.negatives"
				    							]
				    						}]
				    			}, 
				        		else: 0 
				        	}
				        }                                
        			} 
        		}}
    }]).exec(callback);
}

var getProductsGrades = function(callback) {
	DB.getObject("stat").aggregate([{
			$group: {
				_id : "$productId", 
				feats : {
					$push : {
						count : {
							$literal : 1
						}, 
						featureId : "$featureId", 
						grade :{
							$cond: { 
				        		if : { 
				        			$ne : [{
				        				$add : [
				        					"$counters.positives", 
				        					"$counters.negatives"]
				        				}, 0 ] 
				        		}, 
				    			then: {
				    				$divide : [
				    					"$counters.positives", {
				    						$add:[
				    							"$counters.positives", 
				    							"$counters.negatives"
				    							]
				    						}]
				    			}, 
				        		else: 0 
				        	}
				        }                                
        			} 
        		}
        	}
        },
        {
        	$project : {
        		_id:1, 
        		features: "$feats"
        	}
        },
        {
        	$sort : {
        		_id : 1
        	}
        }]).exec(callback);
};

var getProductsGradesWithFilters = function(featureFilter, gradeFilter, callback){
	DB.getObject("stat").aggregate([{
			$group: {
				_id : "$productId", 
				feats : {
					$push : {
						count : {
							$literal : 1
						}, 
						featureId : "$featureId", 
						grade :{
							$cond: { 
				        		if : { 
				        			$ne : [{
				        				$add : [
				        					"$counters.positives", 
				        					"$counters.negatives"]
				        				}, 0 ] 
				        		}, 
				    			then: {
				    				$divide : [
				    					"$counters.positives", {
				    						$add:[
				    							"$counters.positives", 
				    							"$counters.negatives"
				    							]
				    						}]
				    			}, 
				        		else: 0 
				        	}
				        }                                
        			} 
        		}
        	}
        },
        {
        	$project : {
        		_id:1, 
        		features: "$feats"
        	}
        },
        {
            $unwind : "$features"
        },
        {
            $match : {
                "features.grade" : { $gte : gradeFilter}, 
                "features.featureId" : featureFilter
                
            }
        },
        {
        	$sort : {
        		_id : 1
        	}
        }]).exec(callback);
};

var saveSearchFeatures = function(importantFeatures) {

	console.log(importantFeatures);
	importantFeatures.forEach(function(featureId) {

		DB.getObject("search").find({"categoryId":featureId}, function(err,docs){
			var instance;
			if (err || docs.length == 0) {
				
				// Create new instance
				instance = new DB.getObject("search")();
				instance.categoryId = featureId;
				instance.count = 1;
			}
			else {
				instance = docs[0];
				instance.count++;
			}

			instance.save(function(err){
				if (!err) {
					console.log("Update success!");
					return true;
				} else {
					return false;
				}
			});
		});
	})
}

var calcGradesByImportantFeatures = function(importantFeatures, response) {
	// Save the search features
	saveSearchFeatures(importantFeatures);

	// Calc the grades
	getProductsGrades(function(err, results){
        	calcProductGrade(results, importantFeatures.map(function(currentValue, index, array){
        		return currentValue*1
        	}), response)
    });
}

var calcProductGrade = function(array, importantFeatures, res) {
	var results = [];
	array.forEach(function(product){
		var featuresSum = 0;
		var featuresCount = 0;
		product.features.forEach(function(feature){
			featuresSum += (importantFeatures.indexOf(feature.featureId*1) == -1 ? feature.grade : feature.grade*4);
			featuresCount += (importantFeatures.indexOf(feature.featureId*1) == -1 ? feature.count : feature.count*4);
		});

		var tempFeatures = product.features.map(function(currentValue, index, array){
			return Number.parseInt(currentValue.featureId);
		})
		
		results.push({
			product : product._id,
			grade : (featuresSum/featuresCount),
			features : product.features,
			tempFeatures : tempFeatures
		});
	});

	sortByFeatures(results, importantFeatures)
		.then(function(tempResults){
			Q.all(tempResults.map(function(currentValue){
				return getProductById(currentValue.product).then(function(resultProduct){
					var productToReturn = {
						productId : resultProduct.productId,
						productName : resultProduct.productName,
						grade : currentValue.grade,
						features : currentValue.features  		
					};
					return productToReturn;
				});
			})).then(function(endResults){
				res.json(endResults);
			})
		})
		.catch(function(thisError){
			res.json({error : thisError});
		});
};

module.exports = {
	getProducts : getProducts,
	getSentencesByProductId : getSentencesByProductId,
	getProductPicture : getProductPicture,
	getProductGrades : getProductGrades,
	getProductsGrades : getProductsGrades,
	calcGradesByImportantFeatures : calcGradesByImportantFeatures,
	getProductsGradesWithFilters : getProductsGradesWithFilters,
	filterProductsByName : filterProductsByName
};