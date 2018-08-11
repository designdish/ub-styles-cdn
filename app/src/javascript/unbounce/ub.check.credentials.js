var getParameterByName = function(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var mId = 18045513; //mailid
var utmC = "news2018-Q3-August-Mig-MeetingUsers-T1-enUS"; //utm_campaign
var hash = md5(mId + utmC);

var checkCredentials = function(token, hash) {
	if (token != hash) {
		window.location = "http://teamviewer.us";
	}
};

var user = {
	firstName: getParameterByName("first"),
	lastName: getParameterByName("last"),
	email: getParameterByName("email")
};

var injectUserInfo = function(el, str) {
	el.innerText = str;
};

var token = md5(
	getParameterByName("mailid") + getParameterByName("utm_campaign")
);
// checkCredentials(token);

// var firstNameField = document.querySelector(".hs_firstname");
// var lastNameField = document.querySelector(".hs_lastname");
// var licenseField = document.querySelector(".hs_email");

// injectUserInfo(firstNameField, user.firstName);
// injectUserInfo(lastNameField, user.firstName);
// injectUserInfo(licenseField, user.firstName);
