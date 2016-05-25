angular.module('users', [ 
	'ngMaterial' 
])
     .controller('UserController', [
        'userService', 
        '$mdSidenav', 
        '$mdBottomSheet', 
        '$log',
        UserController
     ])
     .service('userService', [
     	'$q', 
     	UserService
     ]);