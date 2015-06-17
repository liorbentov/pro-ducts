angular.module('proDucts').factory('featuresService', ['$http',  '$q', function($http, $q){

	var chosenFeatures;
	var features;

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
		getFeatures : function() {
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
		},
		getFeaturesAsArray : function(){

			// perform some asynchronous operation, resolve or reject the promise when appropriate.
			return $q(function(resolve, reject) {

				if (features) {
				resolve(Object.keys(features).map(function(currentValue, index, array){
					return {key : currentValue, name : features[currentValue]}}));
				}
				else {
					var req = {
						method : 'GET',
						url : '/features/'
					}

					$http(req).
						success(function(data, status, headers, config){
							resolve(Object.keys(data).map(function(currentValue, index, array){
						return {key : currentValue, name : data[currentValue]}}));
						})
						.error(function(data, status, headers, config){
							reject({error : data});
						});
				}

    		});
			}
	};

}]);
