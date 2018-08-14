var updateParam = function(url, param, paramVal) {
    var newURL, tempArray, baseURL, additionalURL, temp;

    newURL = "";
    tempArray = url.split("?");
    baseURL = tempArray[0];
    additionalURL = tempArray[1];
    temp = "";

    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            // setCookie(param, paramVal);
            if (tempArray[i].split("=")[0] != param) {
                newURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var paramText = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newURL + paramText;
};