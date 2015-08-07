'use strict';

/* Controllers */
angular.module('InstaPaisaApp')
	.controller('HomesController', ['$scope', 'MainService', '$state', '$cookies', 
	function ($scope, MainService, $state, $cookies) {

	 	$scope.leadCreate = function(lead) {
	 		lead.id = $.cookie('lead_id');
	    	$scope.leadUpdate = MainService.leadUpdate(lead);
			$scope.leadUpdate.success(function(lead) {
				if(lead.result.success) {
					$cookies.lead_id = lead.result.id;
					$scope.$parent.loan_info = lead.result.user;
					$state.go('loan.step_1');
				}
			});
		}
	}
]);