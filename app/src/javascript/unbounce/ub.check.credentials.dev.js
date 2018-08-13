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

var populateKnownFieldValues = function(){
var formFields = [];
var fn, ln, em;

	fn = {
		input: document.querySelector('[name="firstname"]'),
		value: user.firstName
	};

	ln = {
		input: document.querySelector('[name="lastname"]'),
		value: user.lastName
	};
	em = {
		input: document.querySelector('[name="email"]'),
		value: user.email
	};

	formFields.push(fn, ln, em);


	for(var i = 0; i > formFields.length; i++){
		var field = formFields[i];
		injectUserInfo(field.input, field.value);
	};

}
