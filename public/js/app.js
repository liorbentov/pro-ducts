var proDucts = angular.module('proDucts', ['proDucts.controllers', 'ngRoute', 'proDucts.directives', 'angular-highlight' ,'angularModalService']);

proDucts.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/intro', {
		controller: 'productTypeController',
		templateUrl: 'views/intro.html'
	})
	.when('/criteria', {
		controller: 'featureController',
		templateUrl: 'views/criteria.html'
	})
	.when('/item', {
		controller: 'productController',
		templateUrl: 'views/item.html'
	})
	.when('/sentence', {
		controller: 'sentenceController',
		templateUrl: 'views/sentence.html'
	})
	.when('/grades', {
		controller: 'graphController',
		templateUrl: 'views/productsGrades.html'
	})
	.when('/users', {
		controller: 'usersController',
		templateUrl: 'views/users.html'
	})
	.when('/admin', {
		controller: 'usersController',
		templateUrl: 'views/admin.html'
	})
	.when('/about', {
		templateUrl: 'views/about.html'
	})
	.otherwise({redirectTo: '/intro'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

angular.module('proDucts.controllers', []);

proDucts.controller('AboutController', function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.font = "30px Arial";
	context.strokeText("proDucts",160,40);
});