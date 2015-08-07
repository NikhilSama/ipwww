'use strict';

angular.module('InstaPaisaApp')
.factory('MainService', ['$http', function($http){

    delete $http.defaults.headers.common["X-Requested-With"];
    var domainUrl = 'http://api.instapaisa.com';

    var obj = {};

    obj.getCompanies = function() {
        return $http.get(domainUrl + '/companies/getCompanies.json');
    },

    obj.getLoanPurposes = function() {
        return $http.get(domainUrl + '/loanpurposes/getLoanpurposes.json');
    },

    obj.leadUpdate = function(lead) {
        return $http.post(domainUrl + '/leads/update.json', lead);
    },

    obj.leadLoanInfo = function(lead) {
        return $http.post(domainUrl + '/applications/create.json', lead);
    },

    obj.leadPanInfo = function(lead) {
        return $http.post(domainUrl + '/applications/update.json', lead);
    },

    obj.placeOrderData = function(si, scopeData, orderTransactionType) {
        var postData                    = new Object();
        var app_id                      = $.cookie('app_id');
        var shippingCookieName          = app_id + '_shipping';
        var cartCookieName              = app_id + '_cart';
        var cartPriceCookieName         = app_id + '_cartPrice';
        var totalCartPriceCookieName    = app_id + '_totalCartPrice';
        var discountCookieName          = app_id + '_discount';
        var taxCookieName               = app_id + '_tax';
        var appTypeCookieName           = app_id + '_appType';
        var deliveryChargeCookieName    = app_id + '_deliveryCharge';
        var vatCookieName               = app_id + '_vat';
        var deliveryTaxCookieName       = app_id + '_deliveryTax';
        var deliveryVatCookieName       = app_id + '_deliveryVat';
        var packagingFeeCookieName      = app_id + '_packagingFee';
        var packagingTaxCookieName      = app_id + '_packagingTax';
        var packagingVatCookieName      = app_id + '_packagingVat';
        var currencyCodeCookieName      = app_id + '_currency_code';
        var couponCookieName            = app_id + '_coupon';
        var firstOrderCookieName        = app_id + '_first_order';

        if(angular.isDefined($.cookie(appTypeCookieName))) {
            postData.source = $.cookie(appTypeCookieName);
            postData.platform = '3';
        } else {
            postData.source = 'web';
            postData.platform = '4';
        }

        postData.ShippingAddress = $.cookie(shippingCookieName);
        postData.apptab_id = $.cookie('apptab_id');
        postData.fan_id = $.cookie('fan_id');
        postData.location_id = $.cookie('location_id');
        postData.mobapp_id = app_id;

        var typeCookieName = app_id + '_type';
        var type = $.cookie(typeCookieName);

        postData.special_instruction = si;
        postData.transaction_id = 0;
        postData.transaction_type = orderTransactionType;
        postData.items = $.cookie(cartCookieName);
        postData.currency_code = $.cookie(currencyCodeCookieName);

        var discountAmount = scopeData.discountAmount;

        var discountAmount = scopeData.itemLevelDiscount;
        
        //tax calculation
        var taxAmount = scopeData.taxAmount;

        //total cart price
        var totalCartPrice = scopeData.totalCartPrice;

        var cartPrice = scopeData.cartPrice;

        switch(type)
        {
            case 'delivery':
                postData.ordertype = 2;
                break;
            case 'pickup':
                postData.ordertype = 1;
                break;
            default:
                postData.ordertype = 2;
        }

        postData.amount = parseFloat(totalCartPrice);

        return postData;
    },

    // Login Info
    obj.accountCreate = function(postData) {
        var loginInfo = new Object();
        if(angular.isDefined(postData.login_id)) {
            loginInfo.login_id = postData.login_id;
        }
        if(angular.isDefined(postData.email)) {
            loginInfo.email = postData.email;
        }
        if(angular.isDefined(postData.verify)) {
            loginInfo.verify = 1;
        }
        loginInfo.password = postData.password;
        loginInfo.mobapp_id = $.cookie('app_id');
        return $http.post(domainUrl + '/fans/account_create.json', loginInfo);
    },

    obj.passwordUpdate = function(postData) {
        return $http.post(domainUrl + '/fans/update_password.json', postData);
    },

    obj.domainUrl = domainUrl;

    return obj;
}]);
