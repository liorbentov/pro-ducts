angular.module('proDucts.controllers').controller('productTypeController', ['$scope', '$location', '$http', 'generalService',
	function($scope, $location, $http, generalService) {
		$scope.products = [
			{
				name : "טלפונים סלולריים",
				img : "cellphones.jpg",
				numberOfProducts : 347,
				isClickable: true
			},
			{
				name : "טאבלטים",
				img : "tablets.jpg",
				numberOfProducts : 500,
				isClickable: false
			},
			{
				name : "טלוויזיות",
				img : "tvs.jpg",
				numberOfProducts : 495,
				isClickable: false
			},
			{
				name : "מצלמות",
				img : "cameras.jpg",
				numberOfProducts : 518,
				isClickable: false
			},
			{
				name : "מכונות קפה",
				img : "coffeeMachines.jpg",
				numberOfProducts : 430,
				isClickable: false
			},
			{
				name : "מזגנים",
				img : "AirConditioner.jpg",
				numberOfProducts : 390,
				isClickable: false
			}
		];

		$scope.selectedItem = 0;
		$scope.typeChosen = null;

		// Doesnt change
		$scope.chooseProductType = function(productsType) {
			//console.log(event);
			productsType.typeChosen = true;			
			// if (name == 'טלפונים סלולריים') {
			// 	$scope.chooseByCriteria();
			// }
		};

		$scope.chooseByModule = function() {
			$location.url('/model');
		};

		$scope.chooseByCriteria = function() {
			generalService.setSearchMode("features");
			$location.url('/criteria');
		};
	
		$scope.filterProducts = function() {
			generalService.setSearchMode("filter");
			$location.url('/criteria');
		};
}]);
