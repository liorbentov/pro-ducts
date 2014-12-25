var multiRummi = angular.module('multiRummi.controllers', []);

var controllers = {};

var API_PATH = '/api/';

controllers.playerController = function($scope, $location) {
	$scope.playerDeck = [];
	$scope.stagingTiles=[];

	$scope.joinGame = function() {
		if ($scope.username != "") {
			socket.emit('joinGame', $scope.username);
			$location.url('/player');
		}
	};

	$scope.stageCards = function(){
		// $(".tileContainer.active"). 
		socket.emit('stageCards', $scope.stagingTiles);
		removeTilesFromDeck($scope.stagingTiles, $scope.playerDeck);
		$scope.stagingCards=[];
	};
	
	socket.on('clientTakeCard', function(tiles) {
		$scope.$apply(function(){ 
			$scope.playerDeck = $scope.playerDeck.concat(tiles);
		});
	});
};

controllers.productType = function($scope, $location) {
	$scope.productTypes = [
		{
			"Name" : "Cellular",
			"ID" : "1",
			"Img" : "http://fmmobiles.ie/wp-content/uploads/phones.png",
			"HebName":"סלולרי"
		},
		{
			"Name" : "Computer",
			"ID" : "2",
			"HebName" : "מחשבים"
		},
		{
			"Name" : "Waching Machine",
			"ID" : "3",
			"HebName" : "מכונות כביסה"
		}
	];


	$scope.typeChosen = null;

	// Doesnt change
	$scope.chooseProductType = function(event) {
		$scope.typeChosen = event.target.id;
		/*console.log(event.target.id);
		console.log(event.target.textContent)*/
	}

	$scope.chooseByModule = function() {
		$location.url('/model');
	}

	$scope.chooseByCriteria = function() {
		$location.url('/criteria');	
	}
}

controllers.hostController = function($scope, $routeParams, $http, $location, $timeout) {

	// For model.html
	$scope.products = [
		{"ID":1,
		 "Name":"Samsung s5",
		 "Img":"http://business.ee.co.uk/content/dam/everything-everywhere/images/SHOP/campaigns/nb/samsung_s5_2colshout_01_1600x900.png.eeimg.800.450.medium.png/1395066723412.png",
		 "Grade":3.96
		}, 
		{"ID":2,
		 "Name":"IPhone6",
		 "Grade":2.45,
		 "Img":"http://www.iclarified.com/images/news/28607/111946/111946-1280.png"
		}, 
		{"ID":2,
		 "Name":"LG G3",
		 "Grade":4.01,
		 "Img":"http://pics.redblue.de/doi/pixelboxx-mss-65216426/fee_786_587_png/LG-G3-32-GB-gold"
		}, 
		{"ID":2,
		 "Name":"Nokia Phone",
		 "Grade":1.1,
		 "Img":"http://i.webapps.microsoft.com/r/image/view/-/4680192/respXLFixed/3/-/535-orange-png.png"
		}, 
		{"ID":2,
		 "Name":"Samsung s4",
		 "Grade":3.15,
		 "Img":"http://www.samsung.com/ca/promotions/galaxys4/images/img_kv_01_phone.png"
		}
	]

	$scope.productsFilter = "";
	$scope.filterProduct = function (item){
	    if (item.Name.toUpperCase().indexOf($scope.productsFilter.toUpperCase())!=-1 || item.Grade.toString().indexOf($scope.productsFilter)!=-1) {
	            return true;
	    }
        return false;
  	};
	// End model.html

	// For criteria.html
    $scope.people = [{"first":'Adam'}, {"first":'Steve'}, {"first":'Jessie'}];
    $scope.chosenPeople = [{"first":'Kathy'}, {"first":'Amy'}, {"first":'Julie'}, 
    {"first":'Cindy'}];    

    $scope.personUp = function(index) {		
        /*if (index <= 0 || index >= $scope.chosenPeople.length)
            return;*/
         if (index > 0 && index < $scope.chosenPeople.length)
         {
		    var temp = $scope.chosenPeople[index];
		    $scope.chosenPeople[index] = $scope.chosenPeople[index - 1];
		    $scope.chosenPeople[index - 1] = temp;
		    $timeout(function(){
		 	   $scope.my = index-1;	
		    });
        }
    };

    $scope.personDown = function(index) {
        if (index < 0 || index >= ($scope.chosenPeople.length - 1))
            return;
        var temp = $scope.chosenPeople[index];
        $scope.chosenPeople[index] = $scope.chosenPeople[index*1 + 1];
        $scope.chosenPeople[index*1 + 1] = temp;

		$timeout(function(){
        	$scope.my = index*1+1;
		});
    };

    $scope.personRemove = function(index) {
        $scope.chosenPeople.splice(index, 1);
        $scope.my = null;
    };

    $scope.choose = function(index){
    	if ($scope.right){
	    	$scope.chosenPeople.push($scope.people[index]);
	    	$scope.people.splice(index,1);
	    	$scope.right = null;
	    	$scope.my = null;
    	}
    }

    $scope.unChoose = function(index){
    	if ($scope.my) {
	    	$scope.people.push($scope.chosenPeople[index]);
	    	$scope.chosenPeople.splice(index,1);
	    	$scope.my = null;
	    	$scope.right = null;
    	}
    }
	// Lior's addition


	// End

	$scope.hostGame = function() {
		// $http.post(API_PATH + 'games', {name: $scope.username});
		//$location.url('/host');
		//socket.emit('hostGame', $scope.username);
		console.log("Hello");
	};



	$scope.startGame = function(){
		socket.emit('startGame');
	};

	$scope.takeCard = function(){
		socket.emit('serverTakeCard');
	};

	socket.on('playerJoined', function(username) {
		$scope.players.push(username);
	});

	socket.on('boardStageCards', function(tiles) {
		$scope.$apply(function(){ 
			$scope.stagingTiles = $scope.stagingTiles.concat(tiles);
		});
	});
};

multiRummi.controller(controllers);