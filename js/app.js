'use strict';

// Declare app level module which depends on filters, and services
angular.module('InstaPaisaApp', ['ngAnimate', 'ui.router', 'ngCookies', 'facebook', 'satellizer', 'ngLinkedIn'])
	// .config(function($routeProvider) {
	// 	$routeProvider.when('/', {
	// 		templateUrl: 'templates/home.html', 
	// 		controller: "HomesController"
	// 	})
	// 	.when('/loan', {
	// 		templateUrl: 'templates/loan_info.html', 
	// 		controller: "LoanInfosController"
	// 	});
	// }

	.config(function($stateProvider, $urlRouterProvider, FacebookProvider, $authProvider, $linkedInProvider) {
        FacebookProvider.init('986834338034233');
        
    	$stateProvider
        // route to show our basic form (/form)
        .state('loan', {
            url: '/loan',
            templateUrl: 'templates/home.html',
            controller: 'HomesController'
        })
        .state('loan.lead', {
            url: '/lead',
            templateUrl: 'templates/lead.html',
            controller: 'HomesController'
        })
        .state('loan.step_1', {
            url: '/step_1',
            templateUrl: 'templates/loan_info.html',
            controller: 'LoanInfosController'
        })
        .state('loan.step_2', {
            url: '/step_2',
            templateUrl: 'templates/pan_info.html',
            controller: 'PanInfosController'
        })
        .state('loan.step_3', {
            url: '/step_3',
            templateUrl: 'templates/social_info.html',
            controller: 'SocialInfosController'
        })
        .state('loan.step_4', {
            url: '/step_4',
            templateUrl: 'templates/yodlee_info.html',
            controller: 'YodleeController'
        })
        .state('loan.step_5', {
            url: '/step_5',
            templateUrl: 'templates/thanks.html',
            controller: 'ThanksController'
        });

        $urlRouterProvider.otherwise('/loan/lead');

        $linkedInProvider
            .set('appKey', '75jnj26havzl92')
            .set('scope', 'r_basicprofile r_emailaddress');
        // $authProvider.facebook({
        //     url: '/#/loan/step_3',
        //     clientId: '986834338034233',
        //     scope: 'email, user_about_me, user_tagged_places, user_relationships, user_birthday, user_status, user_relationship_details, user_hometown, user_likes, user_location, user_education_history',
        // });

        // // LinkedIn
        // $authProvider.linkedin({
        //     url: '/#/loan/step_3',
        //     redirectUri: 'http://demo.instapaisa.com',
        //     clientId: '75jnj26havzl92'
        // });

        // // Twitter
        // $authProvider.twitter({
        //     url: '/#/loan/step_3'
        // });
	});