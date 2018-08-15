var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    baseParamVal = getValue(baseParam);
    newParamVal = (baseParamVal != undefined) ? baseParamVal : " ";

    for (var i = targetParam.length - 1; i >= 0; i--) {
        //for each parameter in our target parameter array, check for a parameter or a cookie
        var target = targetParam[i],
            targetVal = (getValue(targetParam[i]) != undefined) ? (getValue(targetParam[i])) : " ",
            newParam = (targetVal != undefined) ? target + "=" + targetVal : " ",
            appendedParam = (targetVal != undefined) ? target + "-" + targetVal : target + '-';

        if (targetVal != undefined) {
            if (newParamVal != undefined) {
                if (newParamVal.indexOf(appendedParam) === -1) {
                    if (newParamVal === " ") {
                        newParamVal = newParamVal.replace(/\s+/g, '');
                    } else {
                        newParamVal += "-" + appendedParam;
                    }
                } else {
                    if (targetVal === " ") {
                        newParamVal = updateJoinedParameters(
                            newParamVal,
                            target,
                            targetVal.replace(/\s+/g, '')
                        );
                    } else {
                        newParamVal = updateJoinedParameters(
                            newParamVal,
                            target,
                            targetVal.replace(/\s+/g, '')
                        );
                        url = updateParam(url, target, targetVal);
                    }

                }

                if (newParam != " ") {

                    if (url.indexOf(newParam) === -1) {
                        url = appendParam(url, target, targetVal).replace(/\s+/g, '');
                    } else {
                        updateParam(url, target, targetVal).replace(/\s+/g, '');
                    }
                }
                //         else if (targetVal === undefined) {
                //             newParamVal += "-";
                //         }
                setCookie(baseParam, newParamVal);
            }
        }
    }
    result = updateParam(url, baseParam, newParamVal);
    return result;

};