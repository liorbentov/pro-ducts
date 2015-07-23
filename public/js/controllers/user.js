angular.module('proDucts.controllers').controller('usersController', ['$scope', 'UserService', 'ModalService', 
	function($scope, UserService, ModalService){
	$scope.newUser = {};
	$scope.formAction = "";

	$scope.doFormAction = function() {
		$scope[$scope.getCurrAction()]();
	};

	($scope.getAllUsers = function() {
		UserService.GetAll().then(function(data){
			$scope.users = data;	
		});
	})();

	var user;
	$scope.connectedUsers;
	$scope.$watch(function(){return user;}, function(newValue, oldValue){
		if (newValue !== oldValue) {
			console.log("new", newValue);
			console.log("old", oldValue);
			$scope.connectedUsers = newValue;
		}
	})

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
		var socket = io();

		socket.on('server-user-login', function(msg){
			console.log(msg);
			UserService.Login();
		});

		socket.on('server-user-logout', function(msg){
			console.log(msg);
			UserService.Logout();
		});

		// Set message
		var userMessage = document.getElementById("user-message");
		$(userMessage)
			.text('ההתחברות בוצעה הבהצלחה!')
			.removeClass("hidden")
			.removeClass("alert-warning")
			.addClass("alert-info")

		setTimeout(function(){
			var userModal = document.getElementById("user-modal");
			$(userModal).modal('toggle');
		}, 1500);
	}

	$scope.login = function(user) {
		debugger;
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

  	$scope.show = function(action) {
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