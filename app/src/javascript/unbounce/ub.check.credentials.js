var mId = 18045513; //mailid
var utmC = 'news2018-Q3-August-Mig-MeetingUsers-T1-enUS'; //utm_campaign
var hash = md5(mId + utmC);

var checkCredentials = function(token, hash) {
    if (token != hash) {
        window.location('http://teamviewer.us');
    }
};

var user = {
    firstName: getParameterByName('first'),
    lastName: getParameterByName('last'),
    email: getParameterByName('email')
};

var injectUserInfo = function(el, str) {
    el.innerText = str;
};

window.onload = function() {
    var token = getParameterByName(utm_campaign) + getParameterByName(mailId);
    checkCredentials(token);
};