angular.module('proDucts.controllers').controller('usersController', ['$scope', 'UserService', 'ModalService', 
	function($scope, UserService, ModalService){
	$scope.newUser = {};
	$scope.formAction = "";

	$scope.doFormAction = function(action) {
		console.log(action);
		$scope[action]();
	};

	($scope.getAllUsers = function() {
		UserService.GetAll().then(function(data){
			$scope.users = data;	
		});
	})();

	$scope.$watch(function(){return $scope.panelShow}, function(newValue, oldValue){
		if (newValue !== oldValue) {
			var userMessage = document.getElementById("user-message");
			$(userMessage)
				.addClass("hidden");
		}
	});

	$scope.register = function(){
		UserService.Register($scope.newUser).then(function(answer){
			if (answer.success) {
				$scope.login(answer.success);
				$scope.newUser = {};
			}
			if (answer.error) {
				setUserFormMessage('קיים משתמש עם שם זה', false);
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
		setUserFormMessage('ההתחברות בוצעה בהצלחה!', true);

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
						
						// Set message
						setUserFormMessage('לא קיים משתמש עם שם זה', false);
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
		var deleteUserConfirm = confirm("Are you sure you want to delete user - " + user.username + "?");

		if (deleteUserConfirm) {
			UserService.Delete(user.username);
			$scope.getAllUsers();
		}
	};

	$scope.getCurrAction = function() {
		return UserService.getCurrAction();
	}

    var setUserFormMessage = function(message, isGood){
    	var userMessage = document.getElementById("user-message");
		$(userMessage)
			.text(message)
			.removeClass("hidden");


		if (isGood) {
			$(userMessage)
				.addClass("alert-info")
				.removeClass("alert-warning");
		} else {
			$(userMessage)
				.removeClass("alert-info")
				.addClass("alert-warning");
		}
    };
  
}]);