var today = new Date();


var setCookie = function(cName, cValue, cExpires, cPath){
	if(!cPath){
		cPath = "/";
	}
	if(!cExpires){
		cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
	}
	document.cookie = cName + "=" + cValue + ";expires=" + cExpires.toGMTString() + "; path=" + cPath;
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

var clientInfo = function(){
	if(window.browserReport){
		browserReport(function(err, report){
		var os, browser, screenSize, language, lastvisit;
		
		os = report.os.name;
		browser = report.browser.name;
		screenSize =report.screen.height + " x " + report.screen.width;
		language = report.lang;
		lastvisit = report.timestamp;

		var aggInfo = 'os=' + os + ', browser=' + browser + ', screenSize=' + screenSize + ', language=' + language + ', last visit=' + lastvisit;  

		setCookie("client_info", aggInfo)

		});
	};
};

var toArray = function(obj){
	return Object.values(obj);
}

var formattedDate = function(){
	var month = String(today.getMonth()+1);
	var day = String(today.getDate());
	var year = String(today.getFullYear());
	var hour = String(today.getHours());
	var minute = String(today.getMinutes());
	
	return month + '/' + day + '/' + year + ' @ ' +  hour + ':' + minute;
}


var siteJourney = function(){
	var journey = getCookie('site_journey');
	var journeyArray;
	var path = window.location.pathname;
	var pageVisits; 
	var cExpires = new Date(today.getTime() + 365 * 24 * 3600 * 1000);

	if(path == '/buy-now/subscription-options/'){
		var shopping = getCookie('shopping');
		var shoppingTrips;
		var week = new Date(today.getTime() + 7 * 24 * 3600 * 1000);
		if(!shopping){
			shoppingTrips = 1; 
			setCookie('shopping',shoppingTrips, week);	
		}else {
			shoppingTrips = shopping + 1;
			updateCookie('shopping', shoppingTrips, week);
		}
		if(shopping > 2){
			setCookie('windowShopping', shoppingTrips, week)
		}
	};


	if(path == '/teamviewer-automatic-download/'){
		setCookie('tv_downloaded', formattedDate(), cExpires);
	};


	if(!journey){
		var firstVisit = formattedDate();
		var lastVisit = firstVisit;
		journeyArray = [];
		pageVisits = 1; 
		journeyArray.push({path, pageVisits, firstVisit});
	}

	else if(journey){
 		journeyArray = JSON.parse(journey);
		
	    if(journey.indexOf(path) != -1){
	    	for (var i = 0; i < journeyArray.length; i++){
	    		if(journeyArray[i].path == path){
	    			journeyArray[i].pageVisits++;
	    			journeyArray[i].lastVisit = formattedDate();
				}	
	    	}
		}

	       else{
	       	pageVisits = 1;
	       	var firstVisit = formattedDate();
			journeyArray.push({path, pageVisits, firstVisit});
	       }
	}


	var cArray = JSON.stringify(journeyArray);
	
	setCookie("site_journey", cArray, cExpires);

	for(var i = 0; i < journeyArray.length; i++){
		console.log('page #' + i + ': ' + journeyArray[i].path);
	}
}

var tvCookies = function(){
	var tvCookie, referringSite, visitCount, tvVersionDownloaded, convertingCampaign, convertingEntrance, convertingMedium, convertingSource, convertingTime, entrancePage, firstTouchTime, firstTouchMedium, firstTouchKeyword, firstTouchSource, firstTouchCampaign, firstTouchEntrance, firstPaidTouchTime, firstPaidTouchMedium, firstPaidTouchKeyword, firstPaidTouchSource, firstPaidTouchCampaign;


	referringSite = document.referrer ? document.referrer : null;

	
	var visits = getCookie('visit_count');
		if(!visits){
			visits = 0;
		}
	visits = parseInt(visits) + 1;
	
	console.log('you have visited teamviewer.com ' + visits + ' times in the last 30 days!');

	setCookie("visit_count", visits);
	setCookie("referring_site", referringSite);
	siteJourney();
	setTimeout(clientInfo, 2500);
}

siteJourney();
