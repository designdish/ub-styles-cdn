var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    baseParamVal = getValue(baseParam);
    newParamVal = (baseParamVal != undefined) ? baseParamVal : undefined;

    for (var i = targetParam.length - 1; i >= 0; i--) {
        //for each parameter in our target parameter array, check for a parameter or a cookie
        var target = targetParam[i],
            targetVal = (getValue(targetParam[i]) != undefined) ? (getValue(targetParam[i])) : undefined,
            newParam = (targetVal != undefined) ? target + "=" + targetVal : "",
            appendedParam = (targetVal != undefined) ? target + "-" + targetVal : target + '-';

        if (targetVal != undefined) {
            if (newParamVal != undefined) {
                if (newParamVal.indexOf(appendedParam) === -1) {
                    newParamVal += "-" + appendedParam;
                } else {
                    newParamVal = updateJoinedParameters(
                        newParamVal,
                        target,
                        targetVal
                    );
                    url = updateParam(url, target, targetVal);
                }
            }

            if (url.indexOf(newParam) === -1) {
                url = appendParam(url, target, targetVal);
            } else {
                updateParam(url, target, targetVal);
            }
        } else if (targetVal === undefined) {
            newParamVal += "-" + appendedParam;
        }
        setCookie(baseParam, newParamVal);
    }

    result = updateParam(url, baseParam, newParamVal);
    return result;
};