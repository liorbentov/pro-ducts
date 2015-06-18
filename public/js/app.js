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
	.when('/model', {
		controller: 'productController',
		templateUrl: 'views/model.html'
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
		templateUrl: 'views/productsGrades.html'
	})
	.otherwise({redirectTo: '/intro'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

proDucts.factory('generalService', function(){

	var searchMode = "features";

	return {
		getSearchMode : function(){
			return searchMode;
		},
		setSearchMode : function(mode) {
			searchMode = mode;
		}
	};

});

angular.module('proDucts.controllers', []);
