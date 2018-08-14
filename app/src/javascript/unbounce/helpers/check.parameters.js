var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var paramVal = getParameterByName(param, url);

        if (paramVal === null) {
            paramVal = getCookie(param);
            if (paramVal === false) {
                // if no parameter is present in the url, set the cookie and the parameter value to default
                setCookie(param, "");
                paramVal = getCookie(param);
                logCookie(param, getCookie(param));
            }
            //append the newly created parameter to the url
            url = appendParam(url, param, paramVal);
            // setCookie(param, paramVal);
            // logCookie(param, getCookie(param));
        } else {
            // if a parameter value is present in the url, reset the cookie to reflect the parameter value
            setCookie(param, paramVal);
            url = updateParam(url, param, paramVal);
            // logCookie(param, getCookie(param));
        }
        // setTimeout(function() {
        // 	if (paramVal != getCookie(param)) {
        // 		eraseCookie(param);
        // 		setCookie(param, paramVal);
        // 	}
        // }, 1500);
    }
    return url;
};