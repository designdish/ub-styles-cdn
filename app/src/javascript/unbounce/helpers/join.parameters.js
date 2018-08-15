var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    baseParamVal = getValue(baseParam);
    newParamVal = baseParamVal != undefined ? baseParamVal : " ";

    for (var i = targetParam.length - 1; i >= 0; i--) {
        //for each parameter in our target parameter array, check for a parameter or a cookie
        var target = targetParam[i],
            targetVal =
                getValue(targetParam[i]) != undefined
                    ? getValue(targetParam[i])
                    : " ",
            subParam = targetVal != undefined ? target + "=" + targetVal : " ",
            appendedParam =
                targetVal != undefined
                    ? target + "-" + targetVal
                    : target + "-";

        if (targetVal != undefined) {
            if (newParamVal != undefined) {
                if (newParamVal.indexOf(appendedParam) === -1) {
                    newParamVal = updateSubParams(newParamVal, appendedParam);
                } else {
                    newParamVal = joinSubParams(newParamVal, target, targetVal);
                }
                url = updateParam(url, target, targetVal);
            }

            if (subParam != " ") {
                if (url.indexOf(subParam) === -1) {
                    url = appendParam(url, target, targetVal);
                    url.replace(/\s+/g, "");
                } else {
                    url = updateParam(url, target, targetVal);
                    url.replace(/\s+/g, "");
                }
            }
            setCookie(baseParam, newParamVal);
        }
    }
    result = updateParam(url, baseParam, newParamVal);
    return result;
};
