var removeEl = function(el) {
	if (el != undefined && el.parentNode.innerHTML.length > -1) {
		el.parentNode.removeChild(el);
	}
};
