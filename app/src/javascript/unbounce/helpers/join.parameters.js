var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    baseParamVal = getValue(baseParam);
    baseParamVal = (baseParamVal != undefined) ? baseParamVal : " ";

    for (var i = targetParam.length - 1; i >= 0; i--) {
    //for each parameter in our target parameter array, check for a parameter or a cookie
        var target = targetParam[i],
            targetVal = getValue(targetParam[i]),
            subParam = (targetVal != undefined) ? target + "=" + targetVal : undefined,
            appendedParam = (targetVal != undefined) ? target + "-" + targetVal : target + '-';


            // what happens when a both a target and a base parameter value are provided 
            if((targetVal != undefined) && (baseParamVal != undefined)){
                subParam = updateParam(baseParamVal, target, targetVal);
                result = appendParam(url, target, targetVal);
             }

            // what happens when neithher a target nor a base parameter value are provided 
            if((targetVal === undefined) && (baseParamVal === undefined)){
                subParam = joinSubParams(baseParam, target, targetVal)
                result = updateParam(url, target, targetVal); 
            }

            // what happens when we have target value but not a base parameter value 
            if((targetVal != undefined) && (baseParamVal === undefined)){
                result = updateParam(url, target, targetVal);
            }

            // what happens when a we have a base parameter value, but not a target value
            if((targetVal === undefined) && (baseParamVal != undefined)){
                if (baseParamVal.indexOf(appendedParam) === -1) {
                   baseParamVal = updateSubParams(baseParamVal, appendedParam);
                }
                result = appendParam(url, target, targetVal);;
            }


        // if (targetVal != undefined) {
        //     if (baseParamVal != undefined) {
        //         if (baseParamVal.indexOf(appendedParam) === -1) {
        //            baseParamVal = updateSubParams(baseParamVal, appendedParam);
        //         } else {
        //             baseParamVal = joinSubParams(baseParamVal, target, targetVal);
        //                 }
        //         url = updateParam(url, target, targetVal);
        //         }

        //         if (subParam != " ") {
        //             if (url.indexOf(subParam) === -1) {
        //                 url = appendParam(url, target, targetVal);
        //                 url.replace(/\s+/g, '');
        //             } else {
        //                 url = updateParam(url, target, targetVal);
        //                 url.replace(/\s+/g, '');
        //             }
        //         }
        //         setCookie(baseParam, baseParamVal);
        //     }
        // }

    }
    setCookie(baseParam, baseParamVal);
    return result;
};
