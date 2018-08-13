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
	// el.innerText = str;
	el.querySelector('input').value = str;
};

var token = md5(
	getParameterByName("mailid") + getParameterByName("utm_campaign")
);

checkCredentials(token);

// checkCredentials(token);



var firstNameField = document.querySelector(".hs_firstname");
var lastNameField = document.querySelector(".hs_lastname");
var emailField = document.querySelector(".hs_email");
// var licenseField = document.querySelector(".hs_license");

injectUserInfo(firstNameField, user.firstName);
injectUserInfo(lastNameField, user.lastName);
// injectUserInfo(licenseField, user.license);
injectUserInfo(emailField, user.email);

//			 https://try.teamviewer.com/bowie-test-nyop-migration-page/?mailid=18045513
//			 &utm_campaign=news2018-Q3-August-Mig-MeetingUsers-T1-enUS
//			 http://try.teamviewer.com/nyop/?license=Premium
//			 &first=Costa
//			 &last=Rodis
//			 &mailid=18045513
//			 &utm_source=TV-newsletter-en
//			 &utm_medium=Email
//			 &utm_campaign=news2018-Q3-August-Mig-MeetingUsers-T1-enUS
//			 &utm_content=Form
//			 &pid=news.2018-Q3-August-Mig-MeetingUsers-T1-enUS
//			 &lid=1567946
//			 &email=costa%40bergenit.net