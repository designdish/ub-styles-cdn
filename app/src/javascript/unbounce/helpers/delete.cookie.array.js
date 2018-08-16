var deleteCookieArray = function(cookies) {
    for (var i = 0; i < cookies.length; i++) {
        eraseCookie(cookies[i]);
    }
};