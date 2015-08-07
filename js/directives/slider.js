'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('slider', [function(BigData) {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: '<div class="banner"></div>',
		controller: function($scope, BigData) {
			this.init = function(cbk) {
				$scope.bigdata.success(function(data) {
					$scope.homeimages = BigData.getHomeimages(data);
					console.log($scope.homeimages)
					cbk();
				});
			}
			
		},
		link: function(scope, element, attrs, parentController) {
			
			parentController.init(function() {
				console.log(element.attr("class"));
				element.unslider();
			});
			
		}

	}
}]);
