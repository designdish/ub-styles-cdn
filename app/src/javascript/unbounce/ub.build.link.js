var sessionInfo;

var getSessionInfo = function() {
    sessionInfo = {
        pid: getParameterByName("pid"),
        utm_source: getParameterByName("utm_source"),
        utm_medium: getParameterByName("utm_medium"),
        utm_campaign: getParameterByName("utm_campaign"),
        utm_content: getParameterByName("utm_content")
    };
    return sessionInfo;
};

var buildLink = function(targetURL, license, coupon) {
    getSessionInfo();

    for (var i = links.length - 1; i >= 0; i--) {
        link = targetURL + "?license=" + license + "&coupon=" + coupon;

        sessionInfo.pid != null
            ? (link += "&pid=" + sessionInfo.pid)
            : (link = link);
        sessionInfo.utm_source != null
            ? (link += "&utm_source=" + sessionInfo.utm_source)
            : (link = link);
        sessionInfo.utm_medium != null
            ? (link += "&utm_medium=" + sessionInfo.utm_medium)
            : (link = link);
        sessionInfo.utm_campaign != null
            ? (link += "&utm_campaign=" + sessionInfo.utm_campaign)
            : (link = link);
        sessionInfo.utm_content != null
            ? (link += "&utm_content=" + sessionInfo.utm_content)
            : (link = link);
    }
};

var buildUbLinks = function() {
    var links = document.querySelectorAll('[data-dynamiclink="true"]');
    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        buildLink(
            link.dataset.targetURL,
            link.dataset.license,
            link.dataset.coupon
        );
    }
};

window.onload = buildUbLinks();
