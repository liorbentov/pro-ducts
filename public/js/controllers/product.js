angular.module('proDucts.controllers').controller('productController', ['$scope', '$http', '$location', 'productsService', 
	function($scope, $http, $location, productsService) {

	$scope.productsFilter = "";
	$scope.products = null;
	$scope.selectedItem = productsService.getSelectedIndex();

	productsService.getProducts(function(results){$scope.products = results});

	$scope.filterProduct = function (item){
	    if (item.Name.toUpperCase().indexOf($scope.productsFilter.toUpperCase())!=-1 /*|| item.Grade.toString().indexOf($scope.productsFilter)!=-1*/) {
	            return true;
	    }
        return false;
  	};

  	$scope.chooseProduct = function (productIndex) {
  		selectedItem = productIndex;
		productsService.setProductImage(productIndex, function(results){
			$scope.products = results;
			$location.url('/item');
		});
  	};


  	$scope.productRight = function () {
  		if (selectedItem > 0) {

  			if (!$scope.products[($scope.selectedItem - 1)].Img) {
  				productsService.setProductImage(($scope.selectedItem - 1), function(results){
  					$scope.products = results;
  				});
  			};

  			selectedItem--;
  			$scope.selectedItem--;
  		}
  	}

  	$scope.productLeft = function () {
  		if (selectedItem < $scope.products.length - 1) {

  			if (!$scope.products[($scope.selectedItem + 1)].Img) {
  				productsService.setProductImage(($scope.selectedItem + 1), function(results){
  					$scope.products = results;
  				});
  			};

  			selectedItem++;
  			$scope.selectedItem++;
  		}
  	}
}]);