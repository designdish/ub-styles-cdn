var getParameterByName = function(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};
var getUser = function() {
	var user = {
		firstName: getParameterByName("first"),
		lastName: getParameterByName("last"),
		email: getParameterByName("email")
	};
	return user;
};

var messages = [
	{
		message: "Hi " + getUser().firstName + "!",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 2500
	},
	{
		message: "Thank You For Your Continued Loyalty",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 2500
	},
	{
		message: "We think you're gonna like this...",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 2500
	}
];

var displayLoadingEl = function(el) {
	var loaderFrame = document.createElement("div");
	loaderFrame.classList.add("animated", "fadeIn", "loader");
	for (var i = el.length - 1; i >= 0; i--) {
		el[i].insertAdjacentElement("afterBegin", loaderFrame);
	}
	injectMessageContainer(loaderFrame);
};

var injectMessageContainer = function(el) {
	var div = document.createElement("div");
	div.classList.add("loader-content");
	el.insertAdjacentElement("afterBegin", div);
	constructWelcomeExperience(div);
};
var constructWelcomeExperience = function(el) {
	var int = messages.length * 2000;
	for (var i = messages.length - 1; i >= 0; i--) {
		setInterval(initMessage(el, messages[i]), int);
	}
};

var wrap = function(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};

var constructMessage = function(msg, container) {
	var msgContainer = document.createElement(container);
	msgContainer.innerText = msg;
	return msgContainer;
};

var automateDisplay = function(el, inClass, outClass, delay) {
	var cl = el.classList;
	delay = delay != undefined ? delay : 500;

	displayMessage(el, cl, inClass);
	if (animationEnd(el)) {
		removeMessage(el, cl, inClass, outClass);
	}
};

var animationEnd = function(el) {
	var animations = {
		animation: "animationend",
		OAnimation: "oAnimationEnd",
		MozAnimation: "mozAnimationEnd",
		WebkitAnimation: "webkitAnimationEnd"
	};
	for (var t in animations) {
		if (el.style[t] !== undefined) {
			return animations[t];
		}
	}
};

var displayMessage = function(el, cl, inClass) {
	inClass = inClass != undefined ? inClass : ["fadeInUp", "slower"];
	if (el.classList.contains("animated") != true) {
		el.classList.add("animated");
	}
	el.classList.add.apply(cl, inClass);
};

var removeMessage = function(el, cl, inClass, outClass) {
	outClass = outClass != undefined ? outClass : ["fadeOutDown", "slower"];
	el.classList.remove.apply(cl, inClass);
	el.classList.add.apply(cl, outClass);
	el.parentNode.removeChild(el);
};

var initMessage = function(el, msg) {
	var message = msg.message,
		container = msg.container,
		intro = msg.intro,
		outro = msg.outro,
		delay = msg.delay;

	container = el.appendChild(constructMessage(message, container));
	automateDisplay(container, intro, outro, delay);
};

var replaceMessage = function(container, str) {
	container.innerText = str;
};

var fadeIn = function(el) {
	el.classList.remove("fadeOutDown");
	setTimeout(el.classList.add("fadeInUp"), 2500);
};

var fadeOut = function(el) {
	el.classList.remove("fadeInUp");
	setTimeout(el.classList.add("fadeOutDown"), 2500);
};

var waitForBody = setInterval(function() {
	var body = document.getElementsByTagName("body");
	if (document.getElementsByTagName("body").length) {
		clearInterval(waitForBody);
		displayLoadingEl(body);
	}
}, 100);
waitForBody;
