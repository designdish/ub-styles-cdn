	var joinParameters = function(url, baseParam, targetParam) {
	    var newParamVal, result, newLink, joinedParams, baseParamVal;

	    baseParamVal = getValue(baseParam);
	    newParamVal = (baseParamVal != undefined) ? baseParamVal : "";

	    for (var i = targetParam.length - 1; i >= 0; i--) {
	        //for each parameter in our target parameter array, check for a parameter or a cookie
	        var target = targetParam[i];
	        var targetVal = getValue(targetParam[i]);
	        var newParam = target + "=" + targetVal;
	        var appendedParam = target + "-" + targetVal;

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

	        if (url.indexOf(newParam) === -1) {
	            url = appendParam(url, target, targetVal);
	            if (targetVal === "") {
	                setCookie(target, "empty");
	            }
	        } else {
	            updateParam(url, target, targetVal);
	        }
	        setCookie(target, targetVal);
	    }
	    setCookie(baseParam, newParamVal);

	    result = updateParam(url, baseParam, newParamVal);

	    return result;
	};