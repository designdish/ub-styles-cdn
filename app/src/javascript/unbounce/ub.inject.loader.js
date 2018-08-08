var displayLoadingEl = function(el) {
	var loaderFrame = document.createElement("div");
	loaderFrame.classList.add("loader");
	for (var i = el.length - 1; i >= 0; i--) {
		el[i].insertAdjacentElement("afterBegin", loaderFrame);
	}
	injectMessageContainer(loaderFrame);
};

var injectMessageContainer = function(el) {
	var div = document.createElement("div");
	div.classList.add("loader-content");
	el.insertAdjacentElement("afterBegin", div);
};

var html = document.getElementsByTagName("html");

displayLoadingEl(html);
