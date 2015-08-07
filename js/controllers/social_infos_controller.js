'use strict';

/* Controllers */
angular.module('InstaPaisaApp')
	.controller('SocialInfosController', ['$scope', 'MainService', '$cookies', '$state', '$auth', '$linkedIn',
		function ($scope, MainService, $cookies, $state, $auth, $linkedIn) {
			$scope.fbLogin = function() {
		 		
			},

			$scope.linkedInLogin = function() {
		 		$linkedIn.authorize();

		 		var profile = $linkedIn.api('profile', []);
		 		console.log(profile);

		 		// console.log($linkedIn.api('connections'));
		 		// console.log($linkedIn.api('memberUpdates'));
			},

			$scope.authenticate = function(provider) {
	      		$auth.authenticate(provider).then(function(response) {
	      			console.log(response);
				});
	    	},

			$scope.leadSocialInfo = function(social_info) {
		 		social_info.application_id = $.cookie('application_id');
		    	$scope.leadSocialInfo = MainService.leadSocialInfo(social_info);
				$scope.leadSocialInfo.success(function(social_info) {
					if(social_info.result.success) {
						// $state.go('loan.loan_info');
					}
				});
			},
			
			$scope.moveNext = function() {
		 		$state.go('loan.step_4');
			}
		}
	]);