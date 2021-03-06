var proDucts = angular.module('proDucts.directives', []);

var directives = {};

directives.chosenFeature = function() {
    return {
        restrict: 'EA',
        templateUrl: 'views/chosenFeature.html',
        replace: true,
        require: 'ngModel'
    }
}

directives.userForm =  function(){
    return {
        restrict: 'E',
        templateUrl : 'views/userForm.html',
        controller : 'usersController'
    }
};


directives.sentence = function(productsService) {

    // var featuresNames = {
    //     "1" : "מצלמה",
    //     "2" : "בטריה",
    //     "5" : "מסך", 
    //     "7" : "שמע - פנימי וחיצוני",
    //     "11" : "ביצועים",
    //     "13" : "גודל, משקל ואחיזה",
    //     "14" : "עיצוב ופלסטיקה",
    //     "15" : "אותות, קרינה והעברת נתונים",
    //     "16" : "אביזרים נלווים",
    //     "17" : "מחיר", 
    //     "19" : "תוכנה",
    //     "20" : "שרידות",
    //     "21" : "כללי",
    //     "23" : "ממשק ונוחות"
    // };

    var component = function(scope, element, attrs) {

        var paintFeature = function(feature, featureName) {
            var htmlToReture = "<span class=";
            
            switch (feature.predicted) {
                case "Positive" : {
                    htmlToReture += '"angular-highlight-positive"';
                    break;
                }
                case "Negative" : {
                    htmlToReture += '"angular-highlight-negative"';
                    break;
                }
                case "Neutral" : {
                    htmlToReture += '"angular-highlight-neutral"';
                    break;
                }
                default : {
                    htmlToReture += '""';
                    break;
                }
            }

            htmlToReture += (">" + featureName + "</span>")
            return htmlToReture;
        }

        scope.$watch('features', function() {


            if (!scope.features || scope.features == '') {
                element.html(scope.sentence);
                return false;
            }
            else {
                var featuresString = "";
                for (featureId in scope.features) {
                    featuresString += ((featuresString == "" ? "" : ", ") + 
                        paintFeature(scope.features[featureId],scope.$parent.featuresNames[featureId]));
                }
                element.html(featuresString);
                return false;
            }
        });
    }

    return {
        link:           component,
        replace:        false,
        scope:          {
            features:   '='
        }
    };
};

proDucts.directive(directives);