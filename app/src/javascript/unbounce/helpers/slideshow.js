var showSlides = function(slides, time, inClass, outClass) {
	var slideIndex;
	var slideIndex = 0;

	function sliding() {
		var i, cl;

		for (i = 0; i < slides.length; i++) {
			cl = slides[i].classList;
			slides[i].style.display = "none";
			if (i > 0) {
				slides[i].classList.remove.apply(cl, inClass);
			}
		}
		slideIndex++;
		if (slideIndex > slides.length) {
			slideIndex = 1;
		}
		var currentSlideIndex = slideIndex - 1;
		slides[currentSlideIndex].style.display = "block";
		// 		slides[slideIndex - 1].classList.remove.apply(cl, outClass);
		// 		slides[slideIndex - 1].classList.add.apply(cl, inClass);

		if (i < [currentSlideIndex]) {
			var loader = document.getElementsByClassName("loader");
			removeEl(loader);
		} else {
			setTimeout(sliding, time);
		}
	}
};
