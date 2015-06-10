angular.module('proDucts.controllers').controller('productTypeController', ['$scope', '$location',
	function($scope, $location) {
		$scope.products = [
			{
				name : "טלפונים סלולריים",
				img : "cellphones.jpg",
				numberOfProducts : 527
			},
			{
				name : "טאבלטים",
				img : "tablets.jpg",
				numberOfProducts : 500
			},
			{
				name : "טלוויזיות",
				img : "tvs.jpg",
				numberOfProducts : 495
			},
			{
				name : "מצלמות",
				img : "cameras.jpg",
				numberOfProducts : 518
			},
			{
				name : "מכונות קפה",
				img : "coffeeMachines.jpg",
				numberOfProducts : 430
			},
			{
				name : "מזגנים",
				img : "AirConditioner.jpg",
				numberOfProducts : 390
			}
		];

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
	$scope.chooseProductType = function(name) {
		//console.log(event);
		if (name == 'טלפונים סלולריים') {
			$scope.chooseByCriteria();
		}
		// $scope.typeChosen = event.target.id;
	}

	$scope.chooseByModule = function() {
		$location.url('/model');
	}

	$scope.chooseByCriteria = function() {
		$location.url('/criteria');
	}
}])
