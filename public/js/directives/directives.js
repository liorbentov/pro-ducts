var proDucts = angular.module('proDucts.directives', []);

var directives = {};

directives.product = function() {
    return {
        restrict: 'E',
        templateUrl: 'views/product.html',
        replace: true,
        require: 'ngModel'
    };
};

directives.productType = function() {
    return {
        restrict: 'E',
        templateUrl: 'views/productType.html',
        replace: true,
        require: 'ngModel'
    };
};

proDucts.directive(directives);