angular.module('proDucts').controller('pieController', ['$scope', '$http', function($scope, $http){

	var categories = {
        "1": "מצלמה",
        "2": "סוללה",
        "5": "מסך",
	    "7": "רמקול",
	    "11": "ביצועים",
	    "13": "גודל ומשקל",
	    "14": "עיצוב ופלסטיקה",
	    "15": "קליטה וגלישה",
	    "16": "אביזרים נלווים",
	    "17": "מחיר",
	    "19": "תוכנה",
	    "20": "שרידות",
	    "21": "כללי",
	    "23": "נוחות וממשק"
        };
      
    var colors = ["#2484c1", "#0c6197", "#4daa4b", "#90c469", "#daca61", "#e4a14b", "#e98125", "#cb2121", "#830909", "#923e99", "#ae83d5", "#bf273e", "#ce2aeb", "#bca44a"];

    var searchStat = function (categoryId, amount) {
        this.categoryName = categories[categoryId];
        this.amount = amount;
    };

    var contentObjects = [];

    ($http.get('/features/status').then(function(data){
		var searchStats = data.data.map(function(currentValue, index, array){
			return new searchStat(currentValue.categoryId, currentValue.count);
		});

		for (var i = 0; i < searchStats.length; i++) {
            var currStats = searchStats[i];
            contentObjects.push(
            {
                "label": currStats.categoryName,
                "value": currStats.amount,
                "color": colors[i]
            });
        }

     var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "התפלגות העדפות",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"text": "העדפות המשתמשים על פי החיפוש באתר",
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "90%",
	},
	"data": {
		"sortOrder": "value-desc",
		"smallSegmentGrouping": {
			"enabled": false
		},
		"content": contentObjects
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
	// Code for preference graph
    
	}); 
	},
	function(error){
		console.log(error);
	}))();

}]);