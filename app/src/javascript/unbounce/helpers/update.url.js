	var updateURL = function(params, str, joinParams) {
	    var links = document.querySelectorAll("a");
	    var currentPage = window.location.href;

	    for (var i = 0; links.length > i; i++) {
	        var link = links[i];
	        var linkURL = link.href;
	        // for (var k = str.length - 1; k >= 0; k--) {

	        if (
	            linkURL.indexOf(str) != -1 &&
	            linkURL.indexOf("mailto") === -1
	        ) {
	            link.href = checkParams(currentPage, params);

	            if (joinParams != undefined) {
	                link.href = joinParameters(
	                    linkURL,
	                    joinParams[0],
	                    joinParams[1]
	                );
	            }
	            console.log(link.href);
	        }
	    }
	};