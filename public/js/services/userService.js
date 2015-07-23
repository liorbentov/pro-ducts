(function () {
    'use strict';
 
    angular
        .module('proDucts')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
 
        service.GetAll = GetAll;
        service.GetByUsername = GetByUsername;
        service.Register = Create;
        service.Update = Update;
        service.Delete = Delete;
		service.setCurrAction = setCurrAction;
		service.getCurrAction = getCurrAction;
		service.isCurrentUserAdmin = isCurrentUserAdmin;
		service.setAdmin = setAdmin;
 
        return service;

		var currAction;
 
		function setCurrAction(action){
			this.currAction = action;
		}

		function getCurrAction(){
			return this.currAction;
		}

		function isCurrentUserAdmin() {
			var user = JSON.parse(localStorage.loggedIn);
			if (typeof user !== "undefiend") {
				return user.isAdmin;
			}
			return false;
		}

		function setAdmin(user) {
			user.isAdmin = !user.isAdmin;
			return $http.put('/users/admin/' + user.username).then(handleSuccess, handleError('Error getting all users'));
		}

        function GetAll() {
            return $http.get('/users').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetByUsername(username) {
            return $http.get('/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }
 
        function Create(user) {
            return $http.post('/users/register', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(username) {
            return $http.delete('/users/' + username).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(data) {
			console.log(data);
            return data.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();