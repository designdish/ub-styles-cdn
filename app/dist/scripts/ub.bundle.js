var mId = 18045513; //mailid
var utmC = 'news2018-Q3-August-Mig-MeetingUsers-T1-enUS'; //utm_campaign
var hash = md5(campaignId + utm_campaign);

var checkCredentials = function(token, hash) {
    if (token != hash) {
        window.location('http://teamviewer.us');
    }
};

var user = {
    firstName: getParameterByName('first'),
    lastName: getParameterByName('last'),
    email: getParameterByName('email')
};

var injectUserInfo = function(el, str) {
    el.innerText = str;
};

window.onload = function() {
    var token = getParameterByName(utm_campaign) + getParameterByName(mailId);
    checkCredentials(token);
};
var formatSelection = function() {
    var input = document.getElementByClassName('irs-hidden-input');
    var value = input.value.split(';');
    var formattedValue = '$' + value[0] + ' to $' + value[1];
    input.value(formattedValue);
};

var injectSlider = function() {
    var min, max;
    var NYOPInput = document.getElementById('nyop-7eaaeb92-f486-4996-adff-448c9b276b0c');
    var slider = $(NYOPInput).data("ionRangeSlider");

    min = 100;
    max = 400;

    $(NYOPInput).ionRangeSlider({
        type: "double",
        grid: true,
        min: min,
        max: max,
        prefix: "$",
        force_edges: true
    });
};

window.onload = function() {
    injectSlider();
};
var injectSlideToggle = function() {
    var radioGroup = document.getElementsByClassName('hs-fieldtype-radio');
    var switchIndicator = document.createElement('div');
    switchIndicator.classList.add('switch__indicator');
    radioGroup[0].insertAdjacentElement('beforeend', switchIndicator);
};

window.onload = function() {
    injectSlideToggle();
};
    var sessionInfo;

    var getParameterByName = function(name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var getSessionInfo = function() {
        sessionInfo = {
            pid: getParameterByName('pid'),
            utm_source: getParameterByName('utm_source'),
            utm_medium: getParameterByName('utm_medium'),
            utm_campaign: getParameterByName('utm_campaign'),
            utm_content: getParameterByName('utm_content'),
        };
        return sessionInfo;
    };

    var buildLink = function(targetURL, license, coupon) {

        getSessionInfo();

        for (var i = links.length - 1; i >= 0; i--) {

            link = targetURL + '?license=' + license + '&coupon=' + coupon;

            (sessionInfo.pid != null) ? link += '&pid=' + sessionInfo.pid: link = link;
            (sessionInfo.utm_source != null) ? link += '&utm_source=' + sessionInfo.utm_source: link = link;
            (sessionInfo.utm_medium != null) ? link += '&utm_medium=' + sessionInfo.utm_medium: link = link;
            (sessionInfo.utm_campaign != null) ? link += '&utm_campaign=' + sessionInfo.utm_campaign: link = link;
            (sessionInfo.utm_content != null) ? link += '&utm_content=' + sessionInfo.utm_content: link = link;
        };
    };

    var buildUbLinks = function() {
        var links = document.querySelectorAll('[data-dynamiclink="true"]');
        for (var i = links.length - 1; i >= 0; i--) {
            var link = links[i];
            buildLink(link.dataset.targetURL, link.dataset.license, link.dataset.coupon);
        }
    };

    window.onload = buildUbLinks();
var linksArray = [];
var url = window.location.hostname;


var addEvent = function(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    }
};

var identifyLinks = function() {
    var links = document.querySelectorAll('a');
    var pageTitle = document.getElementsByTagName('title')[0].innerText;

    for (var i = links.length - 1; i >= 0; i--) {
        link = links[i];

        props = {
            category: pageTitle + ' - ' + window.location.pathname.replace('/' [0], ''),
            action: 'click',
            label: link.innerText,
        };
        console.log(link.pathname + ' - ' + props.action);
        assignGAEvent(link);
    }
};

var createGAEvent = function(obj, props) {
    event = props.action;
    if (obj.addEventListener) {
        obj.addEventListener(props.action, assignGAEvent(obj, event), false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + props.action, assignGAEvent(obj, event));
    }
};

var assignGAEvent = function(obj) {
    console.log(obj);
    var pageTitle = document.getElementsByTagName('title')[0].innerText,
        category = obj.category ? obj.category : pageTitle,
        action = obj.action ? obj.action : 'click',
        label = obj.label ? obj.label : link.innerText,
        value = obj.value ? obj.value : undefined;

    if (label != undefined) {
        addEvent(obj, action, function() {
            console.log('ga event triggered');
            // 	ga('send', {
            // 		hitType: 'event',
            // 		eventCategory: category,
            // 		eventAction: action, 
            // 		eventLabel: label,
            // 		transport:'beacon'

            // });
            ga('send', 'event', category, action, label, {
                hitCallback: console.log("ga event sent to analytics" + "\n" +
                    "   category: " + category + "\n" +
                    "   action: " + action + "\n" +
                    "   label: " + label + "\n")
            });
        });
    }
};

var handleOutboundLinkClicks = function(event) {
    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: event.target.href,
        transport: 'beacon'
    });
};

addEvent('document', 'DOMContentLoaded', setTimeout(identifyLinks(), 1500));