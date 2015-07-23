angular.module('proDucts.controllers').controller('featureController', 
	['$scope', '$timeout', '$http', '$location', 'generalService', 'productsService', 'featuresService',
	function($scope, $timeout, $http, $location, generalService, productsService, featuresService) {

	// For criteria.html
	$scope.searchMode = generalService.getSearchMode();
    $scope.unChosenFeatures;
    $scope.chosenFeatures;

	$scope.findFeatureInChosenFeatures = function(value) {
		for (var i = 0; i < $scope.chosenFeatures.length; i++) {
			if ($scope.chosenFeatures[i].key == value.key) {
				return i;
			}
		};

		return -1;
	}

	// Load the chosen features from the repository
	featuresService.getFeaturesAsArray().then(function(results) {
		$scope.unChosenFeatures = results;
    	$scope.chosenFeatures = featuresService.getChosenFeatures();
    	if (!$scope.chosenFeatures) {
    		$scope.chosenFeatures = [];
    	}
	}, function(error) {
		console.log(error);
	});

	$scope.resetFeatures = function() {
		$scope.chosenFeatures = [];
		featuresService.saveChosenFeatures($scope.chosenFeatures);
	}

	// Checks/unchecks a feature 
	$scope.checkFeature = function(feature){
		var index = $scope.findFeatureInChosenFeatures(feature);
		// The feature is already chosen
		if (index > -1) {
			$scope.chosenFeatures.splice(index, 1);
		}
		// The feature is not chosen yet
		else {
			$scope.chosenFeatures.push(feature);
		}

		featuresService.saveChosenFeatures($scope.chosenFeatures);
	}

	// Get all products with grades calculated by the chosen features
	$scope.getProducts = function() {
		productsService.getProductsAfterCalc(
			$scope.chosenFeatures.map(function(currentValue, index, array){return currentValue.key}), 
			function(results){
				// Move to the first item page
				$timeout(function(){$location.url("/item");}) 
			}
		);
	}

    // For the second view of criteria.html
    $scope.filteredProducts;
    // Filter the list of products by feature's grade and by product name
    $scope.filterProducts = function(){
    	if (($scope.featureFilter) && ($scope.gradeFilter) && ($scope.nameFilter)) {
	    	$http.get("/filterProducts?featureId="+$scope.featureFilter+"&grade="+$scope.gradeFilter+"&name="+$scope.nameFilter+"").then(function(results){
	    		$scope.filteredProducts = results.data;
	    	});
    	}
    }

    // This function is calles when we have a specific product name and we want to see it's grades
    // In order to do so, we need to set the products array in the productService so we can find the product's grades and 
    // it's rank
	$scope.getSpecificProduct = function(productId) {
		productsService.getProductsAfterCalc(
			$scope.unChosenFeatures.map(function(currentValue, index, array){return currentValue.key}),
			function(results){
				// Go to the item's page
				$timeout(function(){$location.url("/item");}) },
			productId
		);	
	}

}]);
