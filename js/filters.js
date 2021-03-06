'use strict';

/* Filters */
angular.module('SnapLionApp')
.filter('show_breaks', [function() {
	return function(text) {
		return String(text).replace(/(\n|\r)/g, "<br />");
	}
}])

.filter('format_youtube_url', [function() {
    return function(url) {
        return String(url).replace("watch?v=", "embed/");
    }
}])

.filter('format_image_url', [function() {
    return function(url) {
    	var finalUrl = url;        

        var imgResizeUrl = String(finalUrl).indexOf("imgresizer");
        if(imgResizeUrl == -1) {
            finalUrl = String(finalUrl).replace("http://", "");
            finalUrl = String(finalUrl).replace("https://", "");
            finalUrl = "http://imgresizer.snaplion.com/?url=" + finalUrl + "&h=100&w=100&t=square";
        }

        return finalUrl;
    }
}])

.filter('timeago', [function() {
    return function(input, p_allowFuture) {
        var substitute = function (stringOrFunction, number, strings) {
            var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
            var value = (strings.numbers && strings.numbers[number]) || number;
            return string.replace(/%d/i, value);
        },
        nowTime = (new Date()).getTime(),
        date = (new Date(input * 1000)).getTime(),
        //refreshMillis= 6e4, //A minute
        allowFuture = p_allowFuture || false,
        strings= {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: "ago",
            suffixFromNow: "from now",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years"
        },
        dateDifference = nowTime - date,
        words,
        seconds = Math.abs(dateDifference) / 1000,
        minutes = seconds / 60,
        hours = minutes / 60,
        days = hours / 24,
        years = days / 365,
        separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
    
        // var strings = this.settings.strings;
        prefix = strings.prefixAgo,
        suffix = strings.suffixAgo;
            
        if (allowFuture) {
            if (dateDifference < 0) {
                prefix = strings.prefixFromNow;
                suffix = strings.suffixFromNow;
            }
        }

        days = Math.floor(days);
        if(days < 7) {
            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);

            return $.trim([prefix, words, suffix].join(separator));
        } else {
            return '';
        }
    }
}])

.filter('format_image_url_60_60', [function() {
    return function(url) {
        var finalUrl = url;
        finalUrl = String(finalUrl).replace("http://", "");
        finalUrl = String(finalUrl).replace("https://", "");
        return finalUrl;
    }
}])