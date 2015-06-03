angular.module('proDucts.controllers').controller('productTypeController', ['$scope', '$location',  
	function($scope, $location) {
		$scope.productTypes = [
		{
			"Name" : "Cellular",
			"ID" : "1",
			"Img" : "http://fmmobiles.ie/wp-content/uploads/phones.png",
			"HebName":"סלולרי"
		},
		{
			"Name" : "Computer",
			"ID" : "2",
			"HebName" : "מחשבים"
		},
		{
			"Name" : "Waching Machine",
			"ID" : "3",
			"HebName" : "מכונות כביסה"
		}
	];

	$scope.selectedItem = 0;
	$scope.typeChosen = null;

	// Doesnt change
	$scope.chooseProductType = function(event) {
		$scope.typeChosen = event.target.id;
	}

	$scope.chooseByModule = function() {
		$location.url('/model');
	}

	$scope.chooseByCriteria = function() {
		$location.url('/criteria');	
	}
}])
