var getValue = function(param) {
    var parameter =
        getParameterByName(param) != undefined ?
        getParameterByName(param) :
        getCookie(param);
    if (
        parameter === undefined ||
        parameter === false ||
        parameter === null
    ) {
        return undefined;
    } else {
        return parameter;
    }
};