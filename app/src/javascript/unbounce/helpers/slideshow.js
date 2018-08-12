function showSlides(slides, time, inClass, outClass) {
	var slideIndex;

	function sliding() {
		var i, cl;
		var slideIndex = 0;

		for (i = 0; i < slides.length; i++) {
			cl = slides[i].classList;
			slides[i].style.display = "none";
			if (i > 0) {
				slides[i].classList.remove.apply(cl, inClass);
				slides[i].classList.add.apply(cl, outClass);
			}
		}
		slideIndex++;
		if (slideIndex > slides.length) {
			slideIndex = 1;
		}
		slides[slideIndex - 1].style.display = "block";
		slides[slideIndex - 1].classList.add.apply(cl, inClass);

		if (i > [slideIndex - 1]) {
			setTimeout(sliding, time);
		} else {
			var loader = document.getElementsByClassName("loader");
			setTimeout(removeEl(loader), 1500);
		}
	}
	sliding();
}
