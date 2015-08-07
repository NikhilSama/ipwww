'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('gallery', [function() {
	return {
		link: function(scope, element, attrs) {
			element.magnificPopup({
				delegate: 'a',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: true,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300, 
					opener: function(element) {
						return element.find('img');
					}
				}
			});
		}
	}
}]);
