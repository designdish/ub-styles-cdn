var to, from, modalTrigger, modalFired, sessionInfo, licenseInfo, licenseType, licenseVersion, offerModal, parsedURL;

modalFired = false;
var today = new Date();
var daily = new Date(today.getTime() + 1);


var userLicenseInputContainer = document.getElementsByClassName('updateWishContainer')[0],
    unbounceModalContainer = document.getElementsByClassName('ub-emb-iframe-wrapper')[0],
    modalDismissal = document.querySelector('.highslide-dimming'),
    proposalDismissal = document.querySelector('.proposalClose');



var setCookie = function(cName, cValue, cExpires, cPath) {
    if (!cPath) {
        cPath = "/";
    }
    if (!cExpires) {
        cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
    }
    document.cookie = cName + "=" + cValue + ";expires=" + cExpires.toUTCString() + "; path=" + cPath;
};

var listenForSelection = function() {
    var buyButton = document.querySelectorAll('.usBuyButton');
    addEvent('click', buyButton, injectNewPromoCode);
}

var updateCookie = function(cName, cValue) {
    var expireDate = document.cookie.indexOf(cName) === -1 ? new Date(new Date().setTime(new Date().getTime() + 30 * 24 * 3600 * 1000)) : unescape(document.cookie).split('expireDate=')[1];
    document.cookie = cName + '=' + cValue + ',expireDate=' + expireDate + ';expires=' + expireDate;
};

var getCookie = function(cName) {
    var cStr = document.cookie;

    var startSlice = cStr.indexOf(cName + "=");
    if (startSlice == -1) {
        return false;
    }

    var endSlice = cStr.indexOf(";", startSlice + 1);
    if (endSlice == -1) {
        endSlice = cStr.length;
    }

    var cData = cStr.substring(startSlice, endSlice);
    var cValue = cData.substring(cData.indexOf("=") + 1, cData.length);
    return cValue;
};

// check our url for licensing 
var getParameterByName = function(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// create a session info object
var getSessionInfo = function() {
    var userInputLicenseNumber = userLicenseInputContainer.querySelector('input[type="text"]').value;
    sessionInfo = {
        customOrder: getParameterByName('CustomOrder', url),
        country: getParameterByName('Countryiso', url),
        licenseNumber: (getParameterByName('license', url) == null) ? userInputLicenseNumber.replace(/\s/g, "") : getParameterByName('license', url).replace(/\s/g, ""),
        coupon: getParameterByName('coupon', window.location.href),
        OneOptionRedirect: getParameterByName('OneOptionRedirect', url),
    };
    console.log(sessionInfo);

    composeURL(sessionInfo);

    if (unbounceModalContainer != null) {
        checkForElement(unbounceModalContainer, 3E4, postMessageToIframe(parsedURL));
        console.log('passing ' + parsedURL + ' to unbounce for dynamic linking');
    } else {
        return sessionInfo;
    }
};

var composeURL = function(params) {
    var entryURL = window.location.href;
    parsedURL = entryURL.replace(window.location.origin, "");
    parsedURL = parsedURL.replace(window.location.pathname, "");


    if (parsedURL.indexOf(params.coupon)) {
        parsedURL = parsedURL.replace('coupon=' + params.coupon, "");
        console.log('coupon code ' + params.coupon + ' successfully parsed from url');
    }

    if (parsedURL.indexOf('&license') === -1 && parsedURL.indexOf('&License') === -1) {
        parsedURL += "&license=" + params.licenseNumber;
        console.log('license ' + params.licenseNumber + ' successfully injected into url');
    }

};

//replace an existing input field in the form with our new coupon code. 

var updateValue = function(el, value) {
    el.value = value;
    __doPostBack(el, value);
};

var injectNewPromoCode = function() {
    var couponBox = document.getElementById('UpdateShop1_couponTextBox');
    var newPromo = getParameterByName('coupon');
    var currentPromo = couponBox.value;

    if ((newPromo != currentPromo) && (newPromo != null)) {
        updateValue(couponBox, newPromo);
    }
};

// Pass our license to the address params
var updateAddress = function() {
    var newURL = "update.aspx?license=" + sessionInfo.licenseNumber;
    window.history.pushState(sessionInfo, "updateLicense", newURL);
};

// update our URL if there is no license passed through
var updateURLWithLicenseParams = function() {
    if (getParameterByName('license', url) == null) {
        updateAddress();
    }
};

var postMessageToIframe = function(message) {
    setTimeout(function() {
        var unbounceModal = unbounceModalContainer.querySelector('iframe');
        unbounceModal.contentWindow.postMessage(message, '*');
    }, 750);
};

//cross browser event handling (firefox doesn't like to recognize window events by default)
var addEvent = function(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    }
};

// inject modal triggering element - we're going to exploit the click option within unbounce to trigger a modal when the user leaves. 
var injectModalTrigger = function() {
    var modalButton = document.createElement('button');
    modalTrigger = modalButton;
    modalButton.style.display = 'none';
    modalButton.classList.add('exitModal');
    document.getElementsByTagName('body')[0].appendChild(modalButton);
};

var resetModal = function() {
    modalFired = !modalFired;
};

var checkForExistingSubscription = function() {
    if (subscriptionLabel) {
        modalFired = true;
    } else {
        injectModalTrigger();
    }
};

// Injecting script to detect when the user exits the window. 
var injectExitDetection = function() {
    if (modalFired === false) {
        addEvent(document, 'mouseout', function(e) {
            e = e ? e : window.event;
            from = e.relatedTarget || e.toElement;
            if (!from || from.nodeName == "HTML") {
                startExitTimer();
                // console.warn("user left window");
                injectEntranceDetection();
            }
        });
    }
};

// Injecting script to check if the user re-enters the window
var injectEntranceDetection = function() {
    if (modalFired === false) {
        addEvent(document, 'mouseover', function(e) {
            e = e ? e : window.event;
            from = e.relatedTarget || e.toElement;
            if (from || from.nodeName == "HTML") {
                clearTimeout(exitTimer);
                // console.warn("user re-entered the window");
            }
        });
    }
};

var exitTimer;

var startExitTimer = function() {
    exitTimer = setTimeout(displayModal, 750);
};

var displayModalOnOfferDismissal = function() {
    addEvent(modalDismissal, 'click', delayedModalDisplay(750));
    addEvent(proposalDismissal, 'click', delayedModalDisplay(750));
};

// display the modal 
var displayModal = function() {
    if (!modalFired) {
        setCookie("retention-score", 1, daily);
        unbounceModalContainer = document.getElementsByClassName('ub-emb-iframe-wrapper')[0];
        postMessageToIframe(parsedURL);
        modalTrigger.click();
        modalFired = true;
        removeEventListener('mouseout', injectExitDetection, false);
        removeEventListener('mouseover', injectEntranceDetection, false);
        // addEvent(unbounceModalContainer, 'click', injectDiscount(sessionInfo.coupon));
    }
};

var delayedModalDisplay = function(timer) {
    setTimeout(displayModal, timer);
};


var manualUpgradeCheck = function() {
    var userInputButton = userLicenseInputContainer.querySelector('.updateWishButton');
    // setTimeout(function(){addEvent(userInputButton, 'click', checkForUpgrades);}, 2500);
    addEvent(userInputButton, 'click', checkForUpgrades);
};

var checkForUpgrades = function() {
    setTimeout(function() {
        offerModal = document.getElementById('my-content');
        checkForElement(offerModal, 3E4, runUpgradeProcess);
    }, 2500);
    // checkForElement(offerModal, 3E4, runUpgradeProcess);
};

var waitForModal = function() {
    var offeredDiscount = getCookie("retention-score");
    if (!offeredDiscount) {
        offerModal = (document.getElementById('my-content')) ? document.getElementById('my-content') : 0;
        if (offerModal === 0) {
            manualUpgradeCheck();
        } else {
            checkForUpgrades();
        }
    }
};

var checkForElement = function(element, time, fn) {
    // console.warn(element, time, fn);
    var waitForElement = timeoutms => new Promise(() => {
        // console.warn('checking for ' + element);

        var check = () => {
            if ((element.length > 0) || (element.innerHTML.length)) {
                // console.log(element + ' is ready, that only took ' + time + 'ms');
                fn();
            } else if ((timeoutms -= 100) < 0) {
                console.log("element " + element + " not available!");
            } else {
                setTimeout(check, 100);
            }
        };
        setTimeout(check, 100);
    });
    setTimeout(() => { element }, (time / 10));
    (async() => {
        waitForElement(time);
    })();
};

var runUpgradeProcess = function() {

    if (offerModal != null) {
        licenseInfo = document.querySelector('[data-version]');
        licenseType = document.querySelector('[data-licensetype]').dataset.licensetype,
            licenseVersion = document.querySelector('[data-version]').dataset.version;




        if (licenseVersion != -1) {
            injectModalTrigger();
            injectExitDetection();
            injectEntranceDetection();
            checkForElement(userLicenseInputContainer, 3E4, getSessionInfo);
        }
    }
}

try {
    waitForModal();
} catch (e) {
    console.log('script didnt work because ' + e);
};