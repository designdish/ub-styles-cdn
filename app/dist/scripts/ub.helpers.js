var addEvent = function(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent("on" + evt, fn);
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

var removeEl = function(el) {
	el[0].parentNode.removeChild(el[0]);
};

function showSlides(slides, time, inClass, outClass) {
	var slideIndex = 0;
	var i, cl;
	for (i = 0; i < slides.length; i++) {
		cl = slides[i].classList;
		if (i > 0) {
			slides[i].classList.remove.apply(cl, inClass);
			slides[i].classList.add.apply(cl, outClass);
		}
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	slides[slideIndex - 1].style.display = "block";
	slides[slideIndex - 1].classList.add.apply(cl, inClass);

	if (i < slideIndex - 1) {
		setTimeout(showSlides, time);
	} else {
		var loader = document.getElementsByClassName("loader");
		setTimeout(removeEl(loader), 1500);
	}
}


var wrap = function(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
