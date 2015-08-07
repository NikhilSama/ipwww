'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('ngHover', [
    function(){
        return {
            link: function (scope, element, attr) {
                $(element).hover(function(){
                    var css= attr.ngHover;
                    // var css= '.choose_lower .blue-btn-plane:hover{background-color:#' + attr.ngHover + ' !important;}';
                    var style=document.createElement('style');
                    if (style.styleSheet) {
                        style.styleSheet.cssText=css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }
                });
            }
        };
    }])