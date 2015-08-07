'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('isNumber', function () {
	return {
		// require: 'ngModel',
		link: function (scope) {	
			scope.$watch('shipping.phone', function(newValue, oldValue) {
                console.log('jj');
                console.log(newValue);
                console.log(oldValue);
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.shipping.phone = oldValue;
                }
            });
		}
	};
});