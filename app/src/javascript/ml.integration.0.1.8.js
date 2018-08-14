var load = (function() {
    function _load(tag) {
        return function(url) {
            return new Promise(function(resolve, reject) {
                var element = document.createElement(tag);
                var parent = "body";
                var attr = "src";
                element.onload = function() {
                    resolve(url);
                };
                element.onerror = function() {
                    reject(url);
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

Promise.all([
    load.js(
        "https://rawgit.com/designdish/ub-styles-cdn/master/app/dist/scripts/tv.helpers.js"
    )
]);


var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count"];
var tvURL = "teamviewer.com";
updateURL(mlp, tvURL, ["pid", mlp]);