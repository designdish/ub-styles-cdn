var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var cookieVal = getCookie(param);
        var paramVal = (getParameterByName(param, url) === undefined) ? cookieVal : getParameterByName(param, url);

        if ((paramVal === undefined) && (cookieVal === undefined)) {
            return url;
        } else {
            setCookie(param, paramVal);
            url = appendParam(url, param, paramVal);
            url = updateParam(url, param, paramVal);
            return url;
        }
    }
};