angular.module('proDucts.controllers').controller('sentenceController', ['$scope', '$location', '$http', 'productsService','featuresService',
	function($scope, $location, $http, productsService, featuresService) {
		$scope.sentence;
		$scope.resultSentences;
		$scope.featuresNames;
		$scope.wait = false;

		var promise = featuresService.getFeatures();
		promise.then(function(results) {
			if (!$scope.featuresNames) {
				$scope.featuresNames = results;
			}
		});

		$scope.getFeaturesAndTheirGrade = function(sentences) {
			$scope.features = [];
			sentences.forEach(function(sentence){
				if (sentence.features){
					for (feature in sentence.features) {

						// Check if the current feature is in the array
						var tempFeature = $scope.searchFeature(feature, $scope.features);
						if (tempFeature == null){
							$scope.features.push({
								featureId : feature,
								grade : (sentence.features[feature].certainty * ((sentence.features[feature].predicted == "Negative") ? -1 : 1))
							});
						}
						else {
							if (sentence.features[feature].predicted == "Positive") {
								tempFeature += sentence.features[feature].certainty;
							} else if (sentence.features[feature].predicted == "Negative") {
								tempFeature -= sentence.features[feature].certainty;
							}
						}
					}
				}
			});

			console.log($scope.features);
		};

		$scope.searchFeature = function(nameKey, myArray){
		    for (var i=0; i < myArray.length; i++) {
		        if (myArray[i].featureId === nameKey) {
		            return myArray[i];
		        }
		    }
		}

		$scope.checkSentence = function() {
			if ($scope.sentence) {
			$scope.wait = true;
			var req = {
				method: 'GET',
				url: '/disassemble/',
				params: { "fullText":  $scope.sentence}
			}

			$http(req).
				success(function(data, status, headers, config) {
					 $scope.resultSentences = data;

					for (entry in $scope.resultSentences){
						$scope.resultSentences[entry].keywords = "";
						if ($scope.resultSentences[entry].features) {
							for (feature in $scope.resultSentences[entry].features) {
								$scope.resultSentences[entry].features[feature].words.forEach(function(word) {
									if ($scope.resultSentences[entry].keywords == ""){
										$scope.resultSentences[entry].keywords = word.word;
									}
									else {
										$scope.resultSentences[entry].keywords += ("," + word.word);
									}
								})
							}
						}
					}

					$scope.wait = false;
				}).
				error(function(data, status, headers, config) {
				});
			}
		};
}]);
