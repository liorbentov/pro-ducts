angular.module('proDucts.controllers').controller('featureController', ['$scope', '$timeout', '$location','productsService', 'featuresService',
	function($scope, $timeout, $location, productsService, featuresService) {

	// For criteria.html
    $scope.unChosenFeatures;
    $scope.chosenFeatures;

    var checkedFeatures = [];

	var promise = featuresService.getFeaturesAsArray();

	$scope.findValueInArray = function(value, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].key == value.key) {
				return i;
			}
		};

		return -1;
	}

	promise.then(function(results) {
		$scope.unChosenFeatures = results;

		if (!$scope.chosenFeatures) {
	    	$scope.chosenFeatures = featuresService.getChosenFeatures();
	    	if (!$scope.chosenFeatures) {
	    		$scope.chosenFeatures = [];
	    	}
	    }
	}, function(error) {
		console.log(error);
	});


	$scope.getProducts = function() {
		productsService.getProductsAfterCalc(
			$scope.chosenFeatures.map(function(currentValue, index, array){return currentValue.key}),
			function(results){$timeout(function(){$location.url("/item");}) }
		);
	}

	$scope.resetFeatures = function() {
		$scope.chosenFeatures = [];
		featuresService.saveChosenFeatures($scope.chosenFeatures);
	}

	$scope.checkFeature = function(feature){
		var index = $scope.findValueInArray(feature, $scope.chosenFeatures);
		if (index > -1) {
			$scope.chosenFeatures.splice(index, 1);
		}
		else {
			$scope.chosenFeatures.push(feature);
		}

		featuresService.saveChosenFeatures($scope.chosenFeatures);
	}

    $scope.featureUp = function(index) {
    	if ($scope.inSelected) {
	         if (index > 0 && index < $scope.chosenFeatures.length)
	         {
			    var temp = $scope.chosenFeatures[index];
			    $scope.chosenFeatures[index] = $scope.chosenFeatures[index - 1];
			    $scope.chosenFeatures[index - 1] = temp;
			    $timeout(function(){
			 	   $scope.inSelected = index-1;
			    });
	        }

	    	featuresService.saveChosenFeatures($scope.chosenFeatures);
        }
    };

    $scope.featureDown = function(index) {
    	if ($scope.inSelected != null) {
	        if (index >= 0 && index < $scope.chosenFeatures.length - 1)
	        {
		        var temp = $scope.chosenFeatures[index];
		        $scope.chosenFeatures[index] = $scope.chosenFeatures[index*1 + 1];
		        $scope.chosenFeatures[index*1 + 1] = temp;

				$timeout(function(){
		        	$scope.inSelected = index*1+1;
				});
			}

	    	featuresService.saveChosenFeatures($scope.chosenFeatures);
		}
    };

    $scope.featureRemove = function(index) {
        $scope.chosenFeatures.splice(index, 1);
        $scope.inSelected = null;
    };

    $scope.choose = function(index){

    	if (checkedFeatures.length > 0) {
    		checkedFeatures.forEach(function(entry){
    			$scope.chosenFeatures.push(entry);
    			$scope.unChosenFeatures.splice(findValueInArray(entry, $scope.unChosenFeatures), 1);
    		});

    		checkedFeatures = [];
    		featuresService.saveChosenFeatures($scope.chosenFeatures);
    	}
    }

    $scope.unChoose = function(index){
    	if ($scope.inSelected) {
	    	$scope.unChosenFeatures.push($scope.chosenFeatures[index]);
	    	$scope.chosenFeatures.splice(index,1);
	    	$scope.inSelected = null;
	    	$scope.outSelected = null;

	    	featuresService.saveChosenFeatures($scope.chosenFeatures);
    	}
    }
}]);
