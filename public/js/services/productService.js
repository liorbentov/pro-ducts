angular.module('proDucts').factory('productsService', ['$http', '$q', function($http, $q){
	var products = [];

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
		getProductsAfterCalc : function(important, callback) {
			var req = {
				method : 'GET',
				url : '/aggregate/',
				params : {
					"important" : important
				}
			}

			$http(req).
				success(function(data, status, headers, config){
					products = data;
					selectedItem = 0;
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
					setSelectedItem(productIndex);
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