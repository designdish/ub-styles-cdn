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
		        return false;
		    }

		    var endSlice = cStr.indexOf(";", startSlice + 1);
		    if (endSlice == -1) {
		        endSlice = cStr.length;
		    }

		    var cData = cStr.substring(startSlice, endSlice);
		    var cValue = cData.substring(cData.indexOf("=") + 1, cData.length);
		    return cValue;
		};