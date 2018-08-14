	var getValue = function(param) {
	    var parameter =
	        getParameterByName(param) != null ?
	        getParameterByName(param) :
	        getCookie(param);
	    if (
	        parameter === undefined ||
	        parameter === false ||
	        parameter === null
	    ) {
	        return "";
	    } else {
	        return parameter;
	    }
	};