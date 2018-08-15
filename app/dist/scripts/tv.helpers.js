var addEvent = function(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent("on" + evt, fn);
	}
};

var animationEnd = function(el) {
	var animations = {
		animation: "animationend",
		OAnimation: "oAnimationEnd",
		MozAnimation: "mozAnimationEnd",
		WebkitAnimation: "webkitAnimationEnd"
	};
	for (var t in animations) {
		if (el.style[t] !== undefined) {
			return animations[t];
		}
	}
};

var appendParam = function(url, param, paramVal) {
    // check for the presence of a query initiator and inject one into the url if it isn't, otherwise chain the parameters with the connector
    var newLink =
        url.indexOf("?") != -1 ?
        url + "&" + param + "=" + paramVal :
        url + "?" + param + "=" + paramVal;
    return newLink;
};
var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var cookieVal = getCookie(param);
        var paramVal = (getParameterByName(param, url) === undefined) ? cookieVal : getParameterByName(param, url);

        if ((paramVal === undefined) && (cookieVal === undefined)) {
            return url;
        } else {
            setCookie(param, paramVal);
            url = appendParam(url, param, paramVal);
            url = updateParam(url, param, paramVal);
            return url;
        }
    }
};
		var today = new Date();

		var eraseCookie = function(cName) {
		    document.cookie = name + "=; Max-Age=-99999999;";
		};

		var logCookie = function(cName, cValue) {
		    console.log("cookie name: " + cName + " | cookie value: " + cValue);
		};

		var setCookie = function(cName, cValue, cExpires, cPath) {
		    if (!cPath) {
		        //sets cookies to default to all subdomains
		        var domain =
		            "/;domain=" +
		            window.location.hostname.match(/[^\.]*\.[^.]*$/)[0];
		        cPath = domain;
		    }
		    if (!cExpires) {
		        cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
		    }
		    document.cookie =
		        cName +
		        "=" +
		        cValue +
		        ";expires=" +
		        cExpires.toGMTString() +
		        "; path=" +
		        cPath;

		    return cValue;
		};

		var updateCookie = function(cName, cValue) {
		    var expireDate =
		        document.cookie.indexOf(cName) === -1 ?
		        new Date(
		            new Date().setTime(
		                new Date().getTime() + 30 * 24 * 3600 * 1000
		            )
		        ) :
		        unescape(document.cookie).split("expireDate=")[1];
		    document.cookie =
		        cName +
		        "=" +
		        cValue +
		        ",expireDate=" +
		        expireDate +
		        ";expires=" +
		        expireDate;
		};

		var getCookie = function(cName) {
		    var cStr = document.cookie;

		    var startSlice = cStr.indexOf(cName + "=");
		    if (startSlice == -1) {
		        return undefined;
		    }

		    var endSlice = cStr.indexOf(";", startSlice + 1);
		    if (endSlice == -1) {
		        endSlice = cStr.length;
		    }

		    var cData = cStr.substring(startSlice, endSlice);
		    var cValue = cData.substring(cData.indexOf("=") + 1, cData.length);
		    return cValue;
		};
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
        parameter = undefined;
        return parameter;
    } else {
        return parameter;
    }
};
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
var getUser = function() {
	var user = {
		firstName: getParameterByName("first"),
		lastName: getParameterByName("last"),
		email: getParameterByName("email")
	};
	return user;
};

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

            if((targetVal != undefined) && (baseParamVal != undefined)){
                subParam = joinSubParams(baseParamVal, target, targetVal);
                url = appendParam(url, target, targetVal);
             }

            if((targetVal === undefined) && (baseParamVal === undefined)){
                subParam = joinSubParams(baseParam, target, targetVal)
                url = updateParam(url, target, targetVal); 
            }



        if (targetVal != undefined) {
            if (baseParamVal != undefined) {
                if (baseParamVal.indexOf(appendedParam) === -1) {
                   baseParamVal = updateSubParams(baseParamVal, appendedParam);
                } else {
                    baseParamVal = joinSubParams(baseParamVal, target, targetVal);
                        }
                url = updateParam(url, target, targetVal);
                }

                if (subParam != " ") {
                    if (url.indexOf(subParam) === -1) {
                        url = appendParam(url, target, targetVal);
                        url.replace(/\s+/g, '');
                    } else {
                        url = updateParam(url, target, targetVal);
                        url.replace(/\s+/g, '');
                    }
                }
                setCookie(baseParam, baseParamVal);
            }
        }
        result = updateParam(url, baseParam, baseParamVal);
return result;
};

var joinSubParams = function(paramVal,target, targetVal){
		joinedParameter =  updateJoinedParameters(
		paramVal,
		target, 
		targetVal);
		return joinedParameter;
};

var updateSubParams = function(paramVal, appendedParam){
	var updatedParameter = paramVal += "-" + appendedParam;
	return updatedParameter;
}


var removeEl = function(el) {
	if (el != undefined && el.parentNode.innerHTML.length > -1) {
		el.parentNode.removeChild(el);
	}
};


var showSlides = function(slides, time, inClass, outClass, slideIndex) {
	var currentSlideIndex;
	var loopTimer;
	var loader = document.getElementsByClassName("loader");

	var sliding = function() {
		if (slideIndex < slides.length) {
			var i, cl;

			for (i = 0; i < slides.length; i++) {
				cl = slides[i].classList;
				slides[i].classList.add.apply(cl, outClass);
				slides[i].style.display = "none";
				if (i > 0) {
					slides[i].classList.remove.apply(cl, outClass);
					slides[i].classList.add.apply(cl, inClass);
					slides[i - 1].style.display = "none";
					slides[i].style.display = "block";
				}
			}
			slideIndex = slideIndex++;
			// if (slideIndex > slides.length) {
			// 	slideIndex = 1;
			// }
			if (currentSlideIndex == undefined || slideIndex > 0) {
				currentSlideIndex = [slideIndex - 1];
				if ((currentSlideIndex = -1)) {
					currentSlideIndex = 0;
				}
			}
			slides[currentSlideIndex].style.display = "block";
			slides[currentSlideIndex].classList.remove.apply(cl, outClass);
			slides[currentSlideIndex].classList.add.apply(cl, inClass);

			if (i < [currentSlideIndex]) {
				var loader = document.getElementsByClassName("loader");
				removeEl(loader[0]);
			} else {
				loopTimer = setTimeout(sliding, time);
			}
		}
	};
	if (slideIndex < slides.length) {
		sliding();
	} else {
		clearTimeout(loopTimer);
	}
	removeEl(loader[0]);
};
var updateJoinedParameters = function(joinValue, param, paramVal) {
    newParam = "";
    tempArray = joinValue.replace(" ", "").split("-");
    baseParam = tempArray[0];
    additionalParam = tempArray[1];
    temp = "";

    if (additionalParam) {
        tempArray = additionalParam.split("-");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("-")[0] != param) {
                newParam += temp + tempArray[i];
                temp = "-";
            }
        }
    }

    var paramText = temp + "" + param + "-" + paramVal;
    return baseParam + "-" + newParam + paramText;
};
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
	var updateURL = function(params, str, joinParams) {
	    var links = document.querySelectorAll("a");
	    var currentPage = window.location.href;

	    for (var i = 0; links.length > i; i++) {
	        var link = links[i];
	        var linkURL = link.href;
	        // for (var k = str.length - 1; k >= 0; k--) {

	        if (
	            linkURL.indexOf(str) != -1 &&
	            linkURL.indexOf("mailto") === -1
	        ) {
	            link.href = checkParams(currentPage, params);

	            if (joinParams != undefined) {
	                link.href = joinParameters(
	                    linkURL,
	                    joinParams[0],
	                    joinParams[1]
	                );
	            }
	            console.log(link.href);
	        }
	    }
	};

var wrap = function(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
	return wrapper;
};
