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

	$scope.checkFeature = function(feature){
		var index = $scope.findFeatureInChosenFeatures(feature);
		if (index > -1) {
			$scope.chosenFeatures.splice(index, 1);
		}
		else {
			$scope.chosenFeatures.push(feature);
		}

		featuresService.saveChosenFeatures($scope.chosenFeatures);
	}

	$scope.getProducts = function() {
		productsService.getProductsAfterCalc(
			$scope.chosenFeatures.map(function(currentValue, index, array){return currentValue.key}), 
			function(results){$timeout(function(){$location.url("/item");}) }
		);
	}

    // For the second view of criteria.html
    $scope.filteredProducts;

    $scope.filterProducts = function(){
    	if (($scope.featureFilter) && ($scope.gradeFilter) && ($scope.nameFilter)) {
	    	$http.get("/filterProducts?featureId="+$scope.featureFilter+"&grade="+$scope.gradeFilter+"&name="+$scope.nameFilter+"").then(function(results){
	    		$scope.filteredProducts = results.data;
	    	});
    	}
    }

	$scope.getSpecificProduct = function(productId) {
		productsService.getProductsAfterCalc(
			$scope.unChosenFeatures.map(function(currentValue, index, array){return currentValue.key}),
			function(results){$timeout(function(){$location.url("/item");}) },
			productId
		);	
	}

}]);
