var mId = 18045513; //mailid
var utmC = "news2018-Q3-August-Mig-MeetingUsers-T1-enUS"; //utm_campaign

var injectHubSpotForm = function(portalId, formId, target){
	return new Promise(resolve => {
		setTimeout(() =>{
			var hForm = hbspt.forms.create({
			portalId: portalId,
			formId: formId,
			target:target
		});
		resolve(h);
		return hForm;
		}, 100);
	})
	async function check(){
		var h = await injectHubSpotForm();
	}
	check();
};


var checkCredentials = function(token) {
	var lpContainer = document.getElementById("lp-pom-root");
	var hash = md5(mId + utmC);
	if (token != hash) {
		window.location = "http://teamviewer.us";
	} else {
		injectHubSpotForm("3361423","7eaaeb92-f486-4996-adff-448c9b276b0c", "#lp-code-348");
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
		element.dispatchEvent(evt);
	}else{
		el.fireEvent("onChange");
	}
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
var populateKnownFieldValues = function(){
var hsPortal, hsGuid;

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
