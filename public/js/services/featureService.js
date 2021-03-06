angular.module('proDucts').factory('featuresService', ['$http',  '$q', function($http, $q){

	var chosenFeatures;
	var features;

	// Gets a promise of all features
	var getFeatures = function() {
			return $q(function(resolve, reject) {
				if (features) {
					resolve(features);
				}
				else {
					var req = {
						method : 'GET',
						url : '/features/'
					}

					$http(req).
						success(function(data, status, headers, config){

							features = data;
							resolve(data);
						})
						.error(function(data, status, headers, config){

							reject(data);
						});
				}
			});
		};

	return {
		getChosenFeatures : function(){
			if (!chosenFeatures && localStorage.chosenFeatures) {
				chosenFeatures = JSON.parse(localStorage.chosenFeatures);
			}

			return chosenFeatures;
		},
		saveChosenFeatures : function(givenChosenFeatures){
			localStorage.chosenFeatures = JSON.stringify(givenChosenFeatures);
		},
		getFeatures : getFeatures,
		getFeaturesAsArray : function(){
			return $q(function(resolve, reject) {

				getFeatures().
					then(function(){
						resolve(Object.keys(features).map(function(currentValue, index, array){
							return {key : currentValue, name : features[currentValue]}
						}));
					}, function(){
						reject({error : data});
					});

    		});
		}
	};

}]);
