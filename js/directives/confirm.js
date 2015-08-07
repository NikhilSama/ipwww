'use strict';

/* Directives */
angular.module('SnapLionApp')
.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var clickAction = attr.confirmedClick;
                scope.$eval(clickAction)

                element.bind('click',function (event) {
                    if(angular.isUndefined(element.attr('href'))) {
                        event.preventDefault();

                        var app_id = $.cookie('app_id');
                        var cartCookieName = app_id + '_cart';
                        var cartCountCookieName = app_id + '_cartCount';
                        var cartPriceCookieName = app_id + '_cartPrice';
                        var typeCookieName = app_id + '_type';
                        var currencyCookieName = app_id + '_currency';
                        var minOrderCookieName = app_id + '_min_order';
                        var pickupMinOrderCookieName          = app_id + '_pickup_min_order';
                        var appTypeCookieName = app_id + '_appType';

                        var elemCick = true;
                        var fan_id = $.cookie('fan_id');
                        var appType = $.cookie(appTypeCookieName);
                        var cart = $.cookie(cartCookieName);
                        var type = $.cookie(typeCookieName);
                        var location_id = $.cookie('location_id');
                        var minOrder = $.cookie(minOrderCookieName);
                        var pickupMinOrder = $.cookie(pickupMinOrderCookieName);
                        var currency = $.cookie(currencyCookieName);
                        var totalCartPrice = scope.totalCartPrice;
                        var cartPrice = scope.cartPrice;
                        var discountAmount = scope.discountAmount;
                        var subTotalCartPrice = parseFloat(cartPrice) + parseFloat(discountAmount);
                        var elemData = element.data();
                        if(angular.isDefined(elemData.type)) {
                            var msg = "We have " + scope.cartCount + " items in your cart, clicking " + elemData.type + " will clear the cart. Do you really want to?";    
                        } else if(angular.isDefined(elemData.location)) {
                            var msg = "We have " + scope.cartCount + " items in your cart, clicking " + elemData.location + " will clear the cart. Do you really want to?";    
                        } else if(angular.isDefined(elemData.typeclosed)) {
                            var msg = "Opps! We are currently closed. Please visit us later";
                        }
                        
                        if(cart != '') {
                            cart = JSON.parse(cart);
                            if(cart.length > 0) {
                                if(angular.isDefined(elemData.carttype)) {
                                    if(elemData.carttype == 'dinein') {
                                        alert('You are in Dine in category, please select either Delivery or Pick Up to place an order.');
                                        elemCick = false;
                                    }

                                    if(elemCick && angular.isDefined(elemData.typeclosed)) {
                                        if(elemData.typeclosed == 'closed') {
                                            elemCick = false;
                                            alert(msg);
                                        } else {
                                            if(type == 'delivery' && subTotalCartPrice < minOrder) {
                                                var minOrderMsg = 'The minimum amount to place an order should be ' + minOrder;
                                                alert(minOrderMsg);
                                                elemCick = false;
                                            }else if(type != 'delivery' && subTotalCartPrice < pickupMinOrder) {
                                                var minOrderMsg = 'The minimum amount to place an order should be ' + pickupMinOrder;
                                                alert(minOrderMsg);
                                                elemCick = false;
                                            }
                                        }
                                    }
                                } else if(angular.isDefined(elemData.type)) {
                                    if(elemData.type != type) {
                                        if ( window.confirm(msg) ) {
                                            var tempCartObj = [];
                                            $.cookie(cartCookieName, JSON.stringify(tempCartObj));
                                            $.cookie(cartCountCookieName, '0.00');
                                            $.cookie(cartPriceCookieName, '0.00');
                                            scope = angular.element($(".top_level_div")).scope();
                                            scope.$apply(function(){
                                                scope.cartCount = 0;
                                            });
                                        } else {
                                            elemCick = false;
                                        }
                                    }
                                } else if(angular.isDefined(elemData.location)) {
                                    if(elemData.location_id != location_id) {
                                        if ( window.confirm(msg) ) {
                                            var tempCartObj = [];
                                            $.cookie(cartCookieName, JSON.stringify(tempCartObj));
                                            $.cookie(cartCountCookieName, '0.00');
                                            $.cookie(cartPriceCookieName, '0.00');
                                            scope = angular.element($(".top_level_div")).scope();
                                            scope.$apply(function(){
                                                scope.cartCount = 0;
                                            });
                                        } else {
                                            elemCick = false;
                                        }
                                    }
                                }
                            }
                        }

                        if(elemCick === true) {
                            if(angular.isDefined(fan_id)) {
                                element.attr('href', element.attr('ng-click'));
                                element.trigger('click');
                            } else {
                                if(appType === 'fb') {
                                    scope.facebookLogin(element.attr('ng-click'));
                                } else if(appType === 'web') {
                                    $('#loginPopupBoxBtn').trigger('click');
                                }
                            }
                        }
                    }
                });
            }
        };
    }])