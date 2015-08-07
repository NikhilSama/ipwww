'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('chosen', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            // update the select when data is loaded
            scope.$watch('cities', function() {
                element.trigger('liszt:updated');
            });

            // update the select when the model changes
            // scope.$watch(attr.ngModel, function() {
            //     // element.trigger('chosen:updated');
            //     element.trigger('liszt:updated');
            // });

            // element.chosen();
        }
    };
});