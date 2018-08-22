var credentials = [{
        mailid: 18045513,
        campaign: "news2018-Q3-August-Mig-MeetingUsers-T1-enUS"
    },
    {
        mailid: 18073229,
        campaign: "news2018-Q3-August-Mig-NameYourPrice-T1B-enUS"
    }


];

var token = function() {
    if ((getParameterByName("mailid") != null) && (getParameterByName("utm_campaign") != null)) {
        var thisToken = md5(getParameterByName("mailid").toLowerCase() + getParameterByName("utm_campaign").toLowerCase());
        console.log(thisToken);
        return thisToken;
    }
    return false;
};

var user = {
    firstName: getParameterByName("first"),
    lastName: getParameterByName("last"),
    email: getParameterByName("email")
};

var visitorInfo = [{
        selector: '[name="firstname"]',
        val: getParameterByName('first')
    },
    {
        selector: '[name="lastname"]',
        val: getParameterByName('last')
    },
    {
        selector: '[name="email"]',
        val: getParameterByName('email')
    }
];

var populateKnownFieldValues = function(visitorInfo) {
    for (var i = 0; i > visitorInfo.length; i++) {
        var visitor = visitorInfo[i];
        injectUserInfo(visitor.selector, visitor.text);
    }
};

var hsForm = {
    portalId: "3361423",
    formId: "7eaaeb92-f486-4996-adff-448c9b276b0c",
    target: "#lp-code-348",
    style: "hbspt-form stacked",
    fn: setTimeout(function() { populateKnownFieldValues(visitorInfo); }, 250)
};


var genCredentialsHash = function(credentials) {
    var accessKeys = [];
    for (var i = credentials.length - 1; i >= 0; i--) {
        var key = credentials[i];
        key = (key.mailid + key.campaign.toLowerCase());
        key = md5(key);
        accessKeys.push(key);
    }
    return accessKeys;
};


var injectHubSpotForm = function(hsForm) {
    waitFor(window.hbspt).then(function() {
        var hForm = hbspt.forms.create({
            portalId: hsForm.portalId,
            formId: hsForm.formId,
            target: hsForm.target,
            cssClass: hsForm.style,
            onFormReady: hsForm.fn
        });
        return hForm;
    });
};



var checkCredentials = function(token, form) {

    var lpContainer = document.getElementById("lp-pom-root");
    var hash = genCredentialsHash(credentials);

    var access = function() {
        for (var i = hash.length - 1; i >= 0; i--) {
            if (hash[i] === token) {
                return true;
            }
        }
        if ((window.location.href.indexOf('taf') !== -1) && (token === false)) {
            return true;
        }
        return false;
    };
    if (access === false) {
        window.location = "http://teamviewer.us";
    } else {
        injectHubSpotForm(hsForm);
        var cl = lpContainer.classList;
        var classes = ["transition-all", "opacity-10"];
        lpContainer.classList.add.apply(cl, classes);
    }
};

var injectUserInfo = function(el, str) {

    waitFor(document.querySelector(el)).then(function() {
        el = document.querySelector(el);

        el.value = str;

        if ('createEvent' in document) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            el.dispatchEvent(evt);
        } else {
            el.fireEvent("onChange");
        }
        el.value = str;
    });
};

var accessToken = token();
checkCredentials(accessToken);
