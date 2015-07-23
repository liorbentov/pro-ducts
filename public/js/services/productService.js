angular.module('proDucts').factory('productsService', ['$http', '$q', function($http, $q){
	
	var products = [];
	var selectedItem = 0;

	// Get all product models
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

	// Set the current viewed model index
	var setSelectedItem = function(selectedIndex) {
		selectedItem = selectedIndex;
	};

	var getProductIndexById = function(productId) {
		for (var i = 0; i < products.length; i++) {
			if (products[i].productId == productId) {
				return i;
			}
		};

		return -1;
	}

	var getProductComments = function(productId, callback) {
		$http.get('/products/' + productId + '/sentences')
			.then(function(data){console.log(data); callback(data.data);}, 
				function(){console.log("error");});	
	}

	return {
		getProductComments : getProductComments,
		// Get all the products from the local repository or server
		getProducts : function(callback) {
			if (!products.length){
				getProductsFromServer(callback);
			}
			else {
				callback(products);
			}
		},
		getProductsAfterCalc : function(important, callback) {
			var productId;

			if (arguments.length == 3) {
				productId = Number.parseInt(arguments[2]);
			}

			var req = {
				method : 'GET',
				url : '/aggregate/',
				params : {
					"important" : important
				}
			}

			$http(req).
				success(function(data, status, headers, config){
					console.log(data);
					products = data;
					if (productId) {
						selectedItem = getProductIndexById(productId);
					}
					else {
						selectedItem = 0;	
					}
					callback(data);
				});
		},
		setProductImage : function(productIndex, callback) {

			var req = {
				method : 'GET',
				url : '/picture/',
				params : {
					"productName" : products[productIndex].productName
				}
			}

			$http(req).
				success(function(data, status, headers, config){
					products[productIndex].Img = data.responseData.results[0].url;
					//setSelectedItem(productIndex);
					callback(products);
				});
		},
		getSelectedIndex : function(){
			return selectedItem;
		},
		getProductId : function(index) {
			return products[index].productId;
		},
		getProductName : function(index) {
			return products[index].productName;
		},
		setSelectedItem : function(selectedIndex) {
			selectedItem = selectedIndex;
		}
	}
}]);