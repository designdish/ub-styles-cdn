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
	el = el[0];
	el[0].parentNode.removeChild(el[0]);
};

var showSlides = function(slides, time, inClass, outClass, slideIndex) {
	var currentSlideIndex;

	var sliding = function() {
		if (slideIndex < slides.length) {
			var i, cl;

			for (i = 0; i < slides.length; i++) {
				cl = slides[i].classList;
				slides[i].classList.add.apply(cl, outClass);
				slides[i].style.display = "none";
				if (i > 0) {
					slides[i].classList.remove.apply(cl, outClass);
					slides[i].classList.add.apply(cl, inClass);
					slides[i - 1].style.display = "none";
					slides[i].style.display = "block";
				}
			}
			slideIndex = slideIndex++;
			// if (slideIndex > slides.length) {
			// 	slideIndex = 1;
			// }
			if (currentSlideIndex == undefined || slideIndex > 0) {
				currentSlideIndex = [slideIndex - 1];
				if ((currentSlideIndex = -1)) {
					currentSlideIndex = 0;
				}
			}
			slides[currentSlideIndex].style.display = "block";
			slides[currentSlideIndex].classList.remove.apply(cl, outClass);
			slides[currentSlideIndex].classList.add.apply(cl, inClass);

			if (i < [currentSlideIndex]) {
				var loader = document.getElementsByClassName("loader");
				removeEl(loader);
			} else {
				setTimeout(sliding, time);
			}
		}
	};
	if (slideIndex < slides.length) {
		sliding();
	} else {
		var loader = document.getElementsByClassName("loader");
		removeEl(loader);
	}
};


var wrap = function(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
