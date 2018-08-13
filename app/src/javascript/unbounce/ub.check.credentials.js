var mId = 18045513; //mailid
var utmC = "news2018-Q3-August-Mig-MeetingUsers-T1-enUS"; //utm_campaign

var checkCredentials = function(token) {
	var lpContainer = document.getElementById("lp-pom-root");
	var hash = md5(mId + utmC);
	if (token != hash) {
		window.location = "http://teamviewer.us";
	} else {
		var cl = lpContainer.classList;
		var classes = ["transition-all", "opacity-10"];
		lpContainer.classList.add.apply(cl, classes);
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

checkCredentials(token);

// checkCredentials(token);

// var firstNameField = document.querySelector(".hs_firstname");
// var lastNameField = document.querySelector(".hs_lastname");
// var licenseField = document.querySelector(".hs_email");

// injectUserInfo(firstNameField, user.firstName);
// injectUserInfo(lastNameField, user.firstName);
// injectUserInfo(licenseField, user.firstName);
