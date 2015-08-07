'use strict';

/* Controllers */
angular.module('InstaPaisaApp')
	.controller('LoanInfosController', ['$scope', 'MainService', '$cookies', '$state', 
		function ($scope, MainService, $cookies, $state) {
		$scope.companiesData = MainService.getCompanies();
		$scope.companiesData.success(function(data) {
			$scope.companies = data.result;
		});

		$scope.loanPurposesData = MainService.getLoanPurposes();
		$scope.loanPurposesData.success(function(data) {
			$scope.loanPurposes = data.result;
		});

		$scope.leadLoanInfo = function(loan_info) {
	 		loan_info.lead_id = $.cookie('lead_id');
	    	$scope.leadLoanInfo = MainService.leadLoanInfo(loan_info);
			$scope.leadLoanInfo.success(function(loan_info) {
				if(loan_info.result.success) {
					$.cookie('application_id', loan_info.result.id);
					$state.go('loan.step_2');
				}
			});
		}
	}
]);