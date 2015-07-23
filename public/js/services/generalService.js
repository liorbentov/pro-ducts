angular.module('proDucts').factory('generalService', function(){
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