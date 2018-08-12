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

	setTimeout(showSlides, time);
}
