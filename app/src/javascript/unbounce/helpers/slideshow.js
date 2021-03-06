
var showSlides = function(slides, time, inClass, outClass, slideIndex) {
	var currentSlideIndex;
	var loopTimer;
	var loader = document.getElementsByClassName("loader");

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
				removeEl(loader[0]);
			} else {
				loopTimer = setTimeout(sliding, time);
			}
		}
	};
	if (slideIndex < slides.length) {
		sliding();
	} else {
		clearTimeout(loopTimer);
	}
	removeEl(loader[0]);
};