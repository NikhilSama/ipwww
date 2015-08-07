'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('ngLogin', [
    function(){
        return {
            link: function (scope, element, attr) {
                var clickAction = attr.confirmedClick;
                scope.$eval(clickAction)

                element.bind('click',function (event) {
                    event.preventDefault();

                    var app_id = $.cookie('app_id');
                    var appTypeCookieName = app_id + '_appType';
                    var fan_id = $.cookie('fan_id');
                    var appType = $.cookie(appTypeCookieName);

                    if(angular.isUndefined(fan_id)) {
                        if(appType === 'fb') {
                            scope.facebookLogin();
                        } else if(appType === 'web') {
                            $('#loginPopupBoxBtn').trigger('click');
                        }
                    } else {
                        element.attr('href', element.attr('ng-click'));
                        element.trigger('click');
                    }
                });
            }
        };
    }])