'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('ngScroll', [
    function(){
        return {
            link: function (scope, element, attr) {
                var clickAction = attr.confirmedClick;
                scope.$eval(clickAction)

                element.bind('click',function (event) {
                    event.preventDefault();

                    var elemData = element.data();
                    var scrollElemId = elemData.scrolldiv;
                    if(angular.isDefined(scrollElemId)) {
                        var $target = $(scrollElemId);
                        $("body").animate({scrollTop: $target.offset().top}, "slow");
                    }
                });
            }
        };
    }
]);