var load = (function() {
    function _load(tag) {
        return function(url) {
            return new Promise(function(resolve, reject) {
                var element = document.createElement(tag);
                var parent = "head";
                var attr = "src";
                element.onload = function() {
                    resolve(url);
                };
                element.onerror = function() {
                    waitForIt(url);
                };
                switch (tag) {
                    case "script":
                        element.async = true;
                        break;
                    case "link":
                        element.type = "text/css";
                        element.rel = "stylesheet";
                        attr = "href";
                        parent = "head";
                }

                element[attr] = url;
                document[parent].appendChild(element);
            });
        };
    }

    return {
        css: _load("link"),
        js: _load("script"),
        img: _load("img")
    };
})();

var waitForIt = function(obj) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(obj);
        }, 250);
    });
};

var buildUrl = function(files, cdn) {
    var urls = [];
    for (var i = 0; files.length > i; i++) {
        var file = "'" + cdn + files[i] + "'";
        urls.push(file);
    }
    return urls;
};

var jscripts = {
    files: [
        "inject.loader.js",
        "md5.js",
        "check.credentials.js",
        "get.user.js"
    ],
    cdn:
        "https://rawgit.com/designdish/ub-styles-cdn/master/app/src/javascript/unbounce/ub."
};

// Promise.all([load.js(buildUrl(jscript.files, jscript.cdn))]);

var promise1 = Promise.all([
    load.js(
        "https://rawgit.com/designdish/ub-styles-cdn/master/app/src/javascript/unbounce/ub.inject.loader.js"
    ),
    load.js(
        "https://rawgit.com/designdish/ub-styles-cdn/master/app/src/javascript/unbounce/ub.md5.js"
    )
]);

promise1.then(function() {
    load.js(
        "https://rawgit.com/designdish/ub-styles-cdn/master/app/src/javascript/unbounce/ub.check.credentials.js"
    );
    checkCredentials(token);
});
