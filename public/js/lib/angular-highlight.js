angular.module('angular-highlight', []).directive('highlight', function() {
	var component = function(scope, element, attrs) {
		
		if (!attrs.highlightClass) {
			attrs.highlightClass = 'angular-highlight';
		}

		if (!attrs.highlightClassPositive) {
			attrs.highlightClassPositive = 'angular-highlight-positive';
		}
		
		if (!attrs.highlightClassNegative) {
			attrs.highlightClassNegative = 'angular-highlight-negative';
		}

		if (!attrs.highlightClassNeutral) {
			attrs.highlightClassNeutral = 'angular-highlight-neutral';
		}

		var positiveReplacer = function(match, item) {
			return '<span class="'+attrs.highlightClassPositive+'">'+match+'</span>';
		}
		var negativeReplacer = function(match, item) {
			return '<span class="'+attrs.highlightClassNegative+'">'+match+'</span>';
		}
		var neutralReplacer = function(match, item) {
			return '<span class="'+attrs.highlightClassNeutral+'">'+match+'</span>';
		}

		var tokenize = function(keywords) {
			keywords = keywords.replace(new RegExp(',$','g'), '').split(',');
			var i;
			var l = keywords.length;
			for (i=0;i<l;i++) {
				keywords[i] = keywords[i].replace(new RegExp('^ | $','g'), '');
			}
			return keywords;
		}
		
		scope.$watch('keywords', function() {
			
			if (!scope.keywords || scope.keywords == '') {
				element.html(scope.highlight);
				return false;
			}
			
			Object.keys(scope.keywords).forEach(function(feature){

				var words = "";

				scope.keywords[feature].words.forEach(function(word){
					words += ((words == "" ? "" : ",") + word.word);
				});

				var tokenized	= tokenize(words);
				var regex 		= new RegExp(tokenized.join('|'), 'gmi');
				
				// Find the words
				if (!element.html() || element.html().trim() == ""){
					var html = scope.highlight;
				}
				else {
					var html = element.html();
				}
				
				switch (scope.keywords[feature].predicted) {
					case "Positive" : {
						html = html.replace(regex, positiveReplacer);
						break;
					}
					case "Negative" : {
						html = html.replace(regex, negativeReplacer);
						break;
					}
					case "Neutral" : {
						html = html.replace(regex, neutralReplacer);
						break;
					}
					default : {
						break;
					}
				}

				element.html(html);
			});
		});
	}
	return {
		link: 			component,
		replace:		false,
		scope:			{
			highlight:	'=',
			keywords:	'='
		}
	};
});