var multiRummi = angular.module('multiRummi', ['multiRummi.controllers', 'ngRoute', 'multiRummi.directives']);

var socket = io();

multiRummi.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/intro', {
		controller: 'productType',
		templateUrl: 'views/intro.html'
	})
	.when('/criteria', {
		controller: 'hostController',
		templateUrl: 'views/criteria.html'
	})
	.when('/model', {
		controller: 'hostController',
		templateUrl: 'views/model.html'
	})
	.when('/item', {
		controller: 'hostController',
		templateUrl: 'views/item.html'
	})
	.otherwise({redirectTo: '/intro'});

	$locationProvider.html5Mode(true);
});


function removeTilesFromDeck(tiles, deck){
	for (var tileIndex = 0; tileIndex < deck.length; tileIndex++) {
		for (var removableTileIndex = 0; removableTileIndex < tiles.length; removableTileIndex++) {
			if ((deck[tileIndex].number == tiles[removableTileIndex].number) && 
				(deck[tileIndex].color == tiles[removableTileIndex].color)) {
				deck.splice(tileIndex,1);
				tiles.splice(removableTileIndex,1);
				tileIndex--;
				break;
			}
		}
	}
}