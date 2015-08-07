'use strict';

/* Controllers */
angular.module('InstaPaisaApp')
	.controller('PanInfosController', ['$scope', 'MainService', '$cookies', '$state', 
		function ($scope, MainService, $cookies, $state) {

		$scope.leadPanInfo = function(pan_info) {
	 		pan_info.application_id = $.cookie('application_id');
	  //   	$scope.leadPanInfo = MainService.leadPanInfo(pan_info);
			// $scope.leadPanInfo.success(function(pan_info) {
			// 	if(pan_info.result.success) {
			// 		$state.go('loan.step_3');
			// 	}
			// });
			$state.go('loan.step_3');
		},

		$scope.moveNext = function() {
	 		$state.go('loan.step_3');
		}
		
	}
]);