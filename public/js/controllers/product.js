angular.module('proDucts.controllers').controller('ModalController', ['$scope','$http', 'close', 'productsService', function($scope, $http, close, productsService) {
  
 $scope.close = function(result) {
 	close(result, 500); 
 };

var productId = productsService.getProductId(productsService.getSelectedIndex());

($scope.getComments = function(productId) {
	productsService.getProductComments(productId, function(data){
		$scope.comments = data;
	})
})(productId);

$scope.shtuty = productsService.getProductName(productsService.getSelectedIndex());

}]);

angular.module('proDucts.controllers').controller('productController', ['$scope', '$http', '$location', 'productsService', 'featuresService', 'ModalService', 
	function($scope, $http, $location, productsService, featuresService, ModalService) {

	$scope.productsFilter = "";
	$scope.products = null;
	var selectedItem = $scope.selectedItem = productsService.getSelectedIndex();

	productsService.getProducts(function(results){$scope.products = results});

	productsService.setProductImage(0, function(results){
		$scope.products = results;
	});

	productsService.setProductImage(1, function(results){
		$scope.products = results;
	});

	productsService.setProductImage(2, function(results){
		$scope.products = results;
	});

	$scope.findFeatureInArray = function(feature, array) {
		if (feature && array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].featureId == feature) {
					return i;
				}
			};
		}
		return -1;
	};

	$scope.findValueInArray = function(value, array) {
		if (value && array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].key == value) {
					return i;
				}
			};
		}
		return -1;
	}

	$scope.selectedItemChanged = function() {
		// Set the selectedItem in the service
		productsService.setSelectedItem(selectedItem);

		// We need to set the list of the features so that we can see all the chosen features
		// and those that have grades
		var promise = featuresService.getFeaturesAsArray();
		promise.then(function(results){
			$scope.features = results;
			// Get chosenFeatures
			$scope.chosenFeatures = featuresService.getChosenFeatures();

			// For each feature
			$scope.features.forEach(function(feature){
				// If it is in the chosenFeatures array, add Bold attribute
				if ($scope.findValueInArray(feature.key, $scope.chosenFeatures) != -1) {
					feature.bolder = true;
				}
				else {
					feature.bolder = false;
				}

				var index = $scope.findFeatureInArray(feature.key, $scope.products[selectedItem].features);
				// If it have grade, add it - if not, set grade to zero
				if (index != -1) {
					feature.grade = ($scope.products[selectedItem].features[index].grade.toPrecision()*100).toFixed();
					feature.caption = ($scope.products[selectedItem].features[index].grade.toPrecision()*100).toFixed();
					feature.opacity = 1;
				}
				else {
					feature.grade = 0;
					feature.caption = "אין ציון";
					feature.opacity = 0.4;
				}
			});
		});
	}

	$scope.selectedItemChanged();

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
		  $scope.selectedItemChanged();
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
			$scope.selectedItemChanged();
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
			$scope.selectedItemChanged();
  		}
  	}

  	$scope.getComments = function(){
		$location.url('/comments');  		
  	}

  	$scope.show = function(index) {
  		productsService.setSelectedItem(index);
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {

            $(modal.element).modal();
            modal.close.then(function(result) {
            });
        });
    };

    $scope.showGradesGraph = function(productId) {
		$location.url('/grades');    	
    };

}]);
