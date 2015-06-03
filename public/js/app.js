var proDucts = angular.module('proDucts', ['proDucts.controllers', 'ngRoute', 'proDucts.directives', 'angular-highlight']);

proDucts.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/intro', {
		controller: 'productTypeController',
		templateUrl: 'views/intro.html'
	})
	.when('/criteria', {
		controller: 'featureController',
		templateUrl: 'views/criteria.html'
	})
	.when('/model', {
		controller: 'productController',
		templateUrl: 'views/model.html'
	})
	.when('/item', {
		controller: 'productController',
		templateUrl: 'views/item.html'
	})
	.when('/sentence', {
		controller: 'sentenceController',
		templateUrl: 'views/sentence.html'
	})
	.otherwise({redirectTo: '/intro'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

proDucts.factory('featuresService', ['$http', function($http){
	var chosenFeatures;

	return {
		getChosenFeatures : function(){
			if (!chosenFeatures && localStorage.chosenFeatures) {
				chosenFeatures = JSON.parse(localStorage.chosenFeatures);
			}

			return chosenFeatures;
		},
		saveChosenFeatures : function(givenChosenFeatures){
			localStorage.chosenFeatures = JSON.stringify(givenChosenFeatures);
		}
	}
}]);

proDucts.factory('productsService', ['$http', '$q', function($http, $q){
	var products = [];
	var features;
	var selectedItem = 0;

	var getProductsFromServer = function(callback) {
		var that = this;
		var req = {
			method: 'GET',
			url: '/products/'
		}

		$http(req).	
			success(function(data, status, headers, config) {
			
				data.forEach(function(entry){

					products.push({
						ID: entry.productId,
						Name: entry.productName, 
						ZapID: entry.zapId
					});
				});	
				callback(products);
			}).
			error(function(data, status, headers, config) {
				callback(data);
			});

	};

	var setSelectedItem = function(selectedIndex) {
		selectedItem = selectedIndex;
	}

	return {
		getProducts : function(callback) {
			if (!products.length){
				getProductsFromServer(callback);
			}
			else {
				callback(products);
			}
		},
		setProductImage : function(productIndex, callback) {
			console.log(productIndex);
			var req = {
				method : 'GET',
				url : '/picture/',
				params : {
					"productName" : products[productIndex].Name
				}
			}

			$http(req).
				success(function(data, status, headers, config){
					products[productIndex].Img = data.responseData.results[0].url;
					setSelectedItem(productIndex);
					callback(products);
				});
		},
		getSelectedIndex : function(){
			return selectedItem;
		},
		getFeatures : function(callback) {
			if (features) {
				console.log("if");
				callback(features);
			}
			else {
				var req = {
					method : 'GET',
					url : '/features/'
				}

				$http(req).
					success(function(data, status, headers, config){
						console.log("else");
						features = data;
						callback(data);
					});
			}
		},
		getFeaturesAsArray : function(){

			// perform some asynchronous operation, resolve or reject the promise when appropriate.
			return $q(function(resolve, reject) {

				if (features) {
				resolve(Object.keys(features).map(function(currentValue, index, array){
					return {key : currentValue, name : features[currentValue]}}));
				}
				else {
					var req = {
						method : 'GET',
						url : '/features/'
					}

					$http(req).
						success(function(data, status, headers, config){
							resolve(Object.keys(data).map(function(currentValue, index, array){
						return {key : currentValue, name : data[currentValue]}}));
						})
						.error(function(data, status, headers, config){
							reject({error : data});
						});
				}

    		});




			
		}
	}
}]);

angular.module('proDucts.controllers', []);
