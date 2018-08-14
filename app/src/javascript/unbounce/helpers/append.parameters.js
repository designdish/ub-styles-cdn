	var appendParam = function(url, param, paramVal) {
	    // check for the presence of a query initiator and inject one into the url if it isn't, otherwise chain the parameters with the connector
	    var newLink =
	        url.indexOf("?") != -1 ?
	        url + "&" + param + "=" + paramVal :
	        url + "?" + param + "=" + paramVal;
	    return newLink;
	};