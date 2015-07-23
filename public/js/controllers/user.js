angular.module('proDucts.controllers').controller('usersController', ['$scope', 'UserService', 'ModalService', 
	function($scope, UserService, ModalService){
	$scope.newUser = {};
	$scope.formAction = "";

	$scope.doFormAction = function(action) {
		//$scope[$scope.getCurrAction()]();
		console.log(action);
		$scope[action]();
	};

	($scope.getAllUsers = function() {
		UserService.GetAll().then(function(data){
			$scope.users = data;	
		});
	})();

	// $scope.$watch(function(){return UserService.getConnectedUsersCount();}, function(newValue, oldValue){
	// 	if (newValue !== oldValue) {
	// 		$scope.connectedUsers = newValue;
	// 		$scope.apply();
	// 	}
	// });

	$scope.$watch(function(){return $scope.panelShow}, function(newValue, oldValue){
		if (newValue !== oldValue) {
			var userMessage = document.getElementById("user-message");
			$(userMessage)
				.addClass("hidden");
		}
	});

	$scope.register = function(){
		console.log(this);
		UserService.Register($scope.newUser).then(function(answer){
			if (answer.success) {
				$scope.login(answer.success);
				$scope.newUser = {};
			}
			if (answer.error) {
				console.log(answer.error);

				// Set message
				var userMessage = document.getElementById("user-message");
				$(userMessage)
					.text('קיים משתמש עם שם זה')
					.removeClass("hidden")
					.removeClass("alert-info")
					.addClass("alert-warning")
			}
		});
	}

	$scope.changeAdminState = function(user) {
		$scope.isLoggedIn(user);
		UserService.setAdmin(user);
		localStorage.loggedIn = JSON.stringify(user);
	};

	$scope.isAdmin = function() {
		return UserService.isCurrentUserAdmin();
	}

	$scope.successfulLogin = function() {
		$scope.userLoggedIn = true;

		// Send a message to the server that the user logged in
		UserService.socket = io();
		UserService.socket.on('server-user-login', function(msg){
			console.log(msg);
			$scope.connectedUsers = msg;
			$scope.$apply();
		});

		UserService.socket.on('server-user-logout', function(msg){
			console.log(msg);
			$scope.connectedUsers = msg;
			$scope.$apply();
		});

		UserService.socket.emit('login', null);

		// Set message
		var userMessage = document.getElementById("user-message");
		$(userMessage)
			.text('ההתחברות בוצעה בהצלחה!')
			.removeClass("hidden")
			.removeClass("alert-warning")
			.addClass("alert-info");

		console.log($scope.panelShow);

		setTimeout(function(){
			$scope.panelShow = null;
			$scope.newUser = {};
			$scope.$apply();

		}, 1000);
	}

	$scope.login = function(user) {
		// Check if the user is already logged in
		if (!$scope.isLoggedIn()) {
			if (!user) {
				
				// Check if the user is registered
				UserService.GetByUsername($scope.newUser.username).then(function(result){
					if (result.success) {
						localStorage.loggedIn = JSON.stringify(result.success);
						$scope.successfulLogin();
					}
					if (result.error) {
						console.log("error");
					}
				})

			} else {
				localStorage.loggedIn = JSON.stringify(user);
				$scope.successfulLogin();
			}
		}
	};

	$scope.logout = function(user) {
		if ($scope.isLoggedIn()) {
			localStorage.removeItem("loggedIn");
			$scope.userLoggedIn = false;
			if (UserService.socket) {
				UserService.socket.emit("logout", null);
				$scope.$apply();
			}
		}
	};

	$scope.isLoggedIn = function() {
		return ((typeof localStorage.loggedIn) !== "undefined");
	};

	$scope.deleteUser = function(user) {
		UserService.Delete(user.username);
		$scope.getAllUsers();
	};

	$scope.getCurrAction = function() {
		return UserService.getCurrAction();
	}

  	$scope.show = function(action) {
  		debugger;
  		UserService.setCurrAction(action);
        ModalService.showModal({
            templateUrl: 'userModal.html',
            controller: "usersController"
        }).then(function(modal) {
        	$scope.modal = modal;
            $(modal.element).modal();
            modal.close.then(function(result) {
            	$scope.formAction = "";
            });
        }).catch(function(err){
        	console.log(err);
        });
    };
}]);