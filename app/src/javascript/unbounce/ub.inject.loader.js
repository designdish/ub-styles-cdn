var messages = [
	{
		message: "Hi " + getUser().firstName + "!",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 1500
	},
	{
		message: "We think you're gonna like this...",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 1500
	},
	{
		message: "Thank You For Your Continued Loyalty",
		container: "h1",
		intro: ["fadeInUp", "slower"],
		outro: ["fadeOutDown", "slower"],
		delay: 1500
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
	var slides = [];
	for (var i = 0; i < messages.length; i++) {
		var intro = messages[i].intro,
			outro = messages[i].outro,
			delay = messages[i].delay,
			message = messages[i].message;
		var slide = document.createElement("div");
		var messageTag = "h1";
		slide.classList.add("slide");
		slide.dataset.slide = [i];

		slide.appendChild(initMessage(messageTag, message));
		el.appendChild(slide);
		slides.push(slide);
		// automateDisplay(slide, intro, outro,i);
		if ((slides.length = messages.length)) {
			showSlides(el, delay, intro, outro, i);
	}

	}
	if ((slides.length = messages.length)) {
// 		showSlides(el, delay, intro, outro, thisSlide);
	}
};

var constructMessage = function(msg, container) {
	var msgContainer = document.createElement(container);
	msgContainer.innerText = msg;
	return msgContainer;
};

var automateDisplay = function(el, inClass, outClass, delay) {
	delay = delay != undefined ? delay : 500;
	var thisSlide = el.dataset.slide;
	showSlides(el, delay, inClass, outClass, thisSlide);
};

var displayMessage = function(el, cl, inClass) {
	inClass = inClass != undefined ? inClass : ["fadeInUp", "slower"];
	// 	if (el.classList.contains("animated") != true) {
	// 		el.classList.add("animated");
	// 	}
	el.classList.add.apply(cl, inClass);
};

var removeMessage = function(el, cl, inClass, outClass) {
	outClass = outClass != undefined ? outClass : ["fadeOutDown", "slower"];
	el.classList.remove.apply(cl, inClass);
	el.classList.add.apply(cl, outClass);
	el.parentNode.removeChild(el);
};

var initMessage = function(el, msg) {
	var messageBox = constructMessage(msg, el);

	return messageBox;
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
