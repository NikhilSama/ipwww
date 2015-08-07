'use strict';

/* Controllers */
angular.module('InstaPaisaApp')
	.controller('YodleeController', ['$scope', 'MainService', '$cookies', '$state', '$auth',
		function ($scope, MainService, $cookies, $state) {
			$scope.moveNext = function() {
		 		$state.go('loan.step_5');
			}
		}
	]);