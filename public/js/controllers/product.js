angular.module('proDucts.controllers').controller('productController', ['$scope', '$http', '$location', 'productsService', 'featuresService',
	function($scope, $http, $location, productsService, featuresService) {

	$scope.productsFilter = "";
	$scope.products = null;
	var selectedItem = $scope.selectedItem = productsService.getSelectedIndex();
  //var selectedItem = 0;
	productsService.getProducts(function(results){$scope.products = results});

  $scope.chosenFeatures = featuresService.getChosenFeatures();

	$scope.features = null;

	var promise = featuresService.getFeatures();
	promise.then(function(results){
		$scope.features = results;
	});

	$scope.filterProduct = function (item){
	    if (item.Name.toUpperCase().indexOf($scope.productsFilter.toUpperCase())!=-1 /*|| item.Grade.toString().indexOf($scope.productsFilter)!=-1*/) {
	            return true;
	    }
        return false;
  	};

  	$scope.chooseProduct = function (productIndex) {

		  productsService.setProductImage(productIndex, function(results){
			$scope.products = results;
			$location.url('/item');
		});
  	};


    $scope.displayProduct = function(productIndex) {
          $scope.selectedItem = productIndex;
          selectedItem = productIndex;
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
