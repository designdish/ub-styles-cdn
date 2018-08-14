var mId = 18045513; //mailid
var utmC = "news2018-Q3-August-Mig-MeetingUsers-T1-enUS"; //utm_campaign

var injectHubSpotForm = function(portalId, formId, target, style){
		var hForm = hbspt.forms.create({
			portalId: portalId,
			formId: formId,
			target:target,
			cssClass:style
		});
		return hForm;
};


var populateKnownFieldValues = function(){
	var hsPortal, hsGuid, input;

	var formFields = [];

	var fn, ln, em;

		fn = {
			input:'[name="firstname"]',
			value: user.firstName
		};

		ln = {
			input:'[name="lastname"]',
			value: user.lastName
		};
		em = {
			input:'[name="email"]',
			value: user.email
		};

		formFields.push(fn, ln, em);
		waitFor(document.querySelector(fn.input)).then(function(){
			for(var i = 0; i < formFields.length; i++){
				var field = formFields[i];
			input = document.querySelector(field.input);
			injectUserInfo(input, field.value);
		}
	});
};



var checkCredentials = function(token) {
	var lpContainer = document.getElementById("lp-pom-root");
	var hash = md5(mId + utmC);
	if (token != hash) {
		window.location = "http://teamviewer.us";
	} else {
		injectHubSpotForm("3361423","7eaaeb92-f486-4996-adff-448c9b276b0c", "#lp-code-348", "hbspt-form stacked");
		populateKnownFieldValues();
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
	
	el.value = str;

	if('createEvent' in document){
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', false, true);
		el.dispatchEvent(evt);
	}else{
		el.fireEvent("onChange");
	}
	el.value=str;
};

var token = md5(
	getParameterByName("mailid") + getParameterByName("utm_campaign")
);

checkCredentials(token);

// checkCredentials(token);

// var listenForHubSpotFormEvents = addEvent('message', event => {
// 	if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit'){

// 	}
// })


var injectHubSpotFormValues = function(fName, fValue){


}