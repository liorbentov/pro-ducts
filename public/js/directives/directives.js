var multiRummi = angular.module('multiRummi.directives', []);

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

multiRummi.directive(directives);