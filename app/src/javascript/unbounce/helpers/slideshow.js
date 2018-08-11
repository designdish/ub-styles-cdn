function showSlides(slides, time, cl, inClass, outClass) {
	var slideIndex = 0;
	var i;
	for (i = 0; i < slides.length; i++) {
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
	slides[i].classList.add.apply(cl, inClass);

	setTimeout(showSlides, time);
}
