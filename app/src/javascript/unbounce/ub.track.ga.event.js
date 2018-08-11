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