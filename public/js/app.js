var proDucts = angular.module('proDucts', ['proDucts.controllers', 'ngRoute', 'proDucts.directives', 'angular-highlight']);

proDucts.config(function($routeProvider, $locationProvider) {
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
	.when('/sentence', {
		controller: 'sentenceController',
		templateUrl: 'views/sentence.html'
	})
	.otherwise({redirectTo: '/intro'});

	$locationProvider.html5Mode(true);
});
