(function() {
    var addEvent = function(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + evt, fn);
        }
    };

    var checkViewportWidth = function() {
        var vw, vh;
        if (typeof window.innerWidth != 'undefined') {
            vw = window.innerWidth;
            vh = window.innerHeight;

            return {
                vw: vw,
                vh: vh
            };
        }
    };

    var toggleBreakpointClasses = function(el, cl, bp) {
        var vp = checkViewportWidth();
        if (vp.vw < bp) {
            el.classList.add(cl);
            console.log('viewport width is ' + vp.vw + ', toggling responsive classes');
        } else {
            el.classList.remove(cl);
        }
    };

    var toggleUbModal = function() {
        var ubModal = document.getElementsByClassName('ub-emb-container')[0];
        toggleBreakpointClasses(ubModal, 'hidden', 800);
    };

    window.ready = function() {
        addEvent(window, 'resize', toggleUbModal);
    };
})();