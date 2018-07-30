var getParameterByName = function(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
      , results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var checkParams = function(url, arr){
	for (var i = arr.length - 1; i >= 0; i--) {
		var param = arr[i];
		var paramVal = getParameterByName(param, url);
		
			if(paramVal === null){
				paramVal = getCookie(param);
					if (paramVal === false){ 
							setCookie(param, 'default');
							paramVal = getCookie(param);
						    console.log('cookie "' + param + '" created');
	                }
            	console.log('param ' + param + ' not presented, using cookie value of "' + paramVal + '" instead');
            	url = appendParam(url, param, paramVal);
			}else{
				url = updateParam(url, param, paramVal);
				console.log(url + ' upated with ' + param + ' value of ' + paramVal);
			}
		}	
		return url;
};

var updateParam = function(url, param, paramVal){
	var newURL, tempArray, baseURL, additionalURL, temp;

	newURL = '';
	tempArray = url.split('?');
	baseURL = tempArray[0];
	additionalURL = tempArray[1];
	temp = '';

	if (additionalURL){
		tempArray = additionalURL.split('&');
		for (var i = 0; i<tempArray.length; i++){
			if(tempArray[i].split('=')[0] != param){
				newURL += temp + tempArray[i];
				temp='&';
			}
		}
	}
	var paramText = temp + '' + param + '=' + paramVal;
	console.log('new URL should be: ' + baseURL + '?' + newURL + paramText);
	return baseURL + '?' + newURL + paramText;
};

var appendParam = function(url, param, paramVal){
	var newLink = (url.indexOf('?') != -1) ? url + '&' + param + '=' + paramVal : url + '?' + param + '=' + paramVal;
	return newLink;
}

var today = new Date();

var setCookie = function(cName, cValue, cExpires, cPath){
	if(!cPath){
		cPath = "/";
	}
	if(!cExpires){
		cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
	}
	document.cookie = cName + "=" + cValue + ";expires=" + cExpires.toGMTString() + "; path=" + cPath;

	return cValue;
}

var updateCookie = function(cName, cValue){
	var expireDate = document.cookie.indexOf(cName) === -1
	? new Date(new Date().setTime(new Date().getTime() + 30 * 24 * 3600 * 1000))
	: unescape(document.cookie).split('expireDate=')[1];
	document.cookie = cName + '=' + cValue + ',expireDate=' + expireDate + ';expires=' + expireDate;
}

var getCookie = function(cName){
	var cStr = document.cookie;
	
	var startSlice = cStr.indexOf(cName + "=");
		if (startSlice == -1){
			return false
		}

	var endSlice = cStr.indexOf(";", startSlice + 1)
		if (endSlice == -1){
			endSlice = cStr.length
		}

	var cData = cStr.substring(startSlice, endSlice);
	var cValue = cData.substring(cData.indexOf("=")+1, cData.length);
	return cValue;
}


var updateURL = function(params, str){
    var links = document.querySelectorAll('a');
    var currentPage = window.location.href;
   
    for(var i = 0; links.length > i; i++){
        var link = links[i];
        var linkURL = link.href;

        if (linkURL.indexOf(str) != -1){
        	link.href = checkParams(currentPage, params);
		    console.log(linkURL);    
        }
	}
};



var mlp = ['lae_vid', 'lae_eg', 'ml_eg', 'ml_acc', 'ml_count', 'pid'];
var tvURL = 'teamviewer.com';


updateURL(mlp, tvURL);