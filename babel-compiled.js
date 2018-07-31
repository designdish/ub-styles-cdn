'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var to, from, modalTrigger, modalFired, sessionInfo, licenseInfo, licenseType, licenseVersion, offerModal, parsedURL;

modalFired = false;
var today = new Date();
var daily = new Date(today.getTime() + 1);

var userLicenseInputContainer = document.getElementsByClassName('updateWishContainer')[0],
    unbounceModalContainer = document.getElementsByClassName('ub-emb-iframe-wrapper')[0],
    modalDismissal = document.querySelector('.highslide-dimming'),
    proposalDismissal = document.querySelector('.proposalClose');

var setCookie = function setCookie(cName, cValue, cExpires, cPath) {
    if (!cPath) {
        cPath = "/";
    }
    if (!cExpires) {
        cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
    }
    document.cookie = cName + "=" + cValue + ";expires=" + cExpires.toUTCString() + "; path=" + cPath;
};

var listenForSelection = function listenForSelection() {
    var buyButton = document.querySelectorAll('.usBuyButton');
    addEvent('click', buyButton, injectNewPromoCode);
};

var updateCookie = function updateCookie(cName, cValue) {
    var expireDate = document.cookie.indexOf(cName) === -1 ? new Date(new Date().setTime(new Date().getTime() + 30 * 24 * 3600 * 1000)) : unescape(document.cookie).split('expireDate=')[1];
    document.cookie = cName + '=' + cValue + ',expireDate=' + expireDate + ';expires=' + expireDate;
};

var getCookie = function getCookie(cName) {
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
var getParameterByName = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// create a session info object
var getSessionInfo = function getSessionInfo() {
    var userInputLicenseNumber = userLicenseInputContainer.querySelector('input[type="text"]').value;
    sessionInfo = {
        customOrder: getParameterByName('CustomOrder', url),
        country: getParameterByName('Countryiso', url),
        licenseNumber: getParameterByName('license', url) == null ? userInputLicenseNumber.replace(/\s/g, "") : getParameterByName('license', url).replace(/\s/g, ""),
        coupon: getParameterByName('coupon', window.location.href),
        OneOptionRedirect: getParameterByName('OneOptionRedirect', url)
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

var composeURL = function composeURL(params) {
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

var updateValue = function updateValue(el, value) {
    el.value = value;
    __doPostBack(el, value);
};

var injectNewPromoCode = function injectNewPromoCode() {
    var couponBox = document.getElementById('UpdateShop1_couponTextBox');
    var newPromo = getParameterByName('coupon');
    var currentPromo = couponBox.value;

    if (newPromo != currentPromo && newPromo != null) {
        updateValue(couponBox, newPromo);
    }
};

// Pass our license to the address params
var updateAddress = function updateAddress() {
    var newURL = "update.aspx?license=" + sessionInfo.licenseNumber;
    window.history.pushState(sessionInfo, "updateLicense", newURL);
};

// update our URL if there is no license passed through
var updateURLWithLicenseParams = function updateURLWithLicenseParams() {
    if (getParameterByName('license', url) == null) {
        updateAddress();
    }
};

var postMessageToIframe = function postMessageToIframe(message) {
    setTimeout(function () {
        var unbounceModal = unbounceModalContainer.querySelector('iframe');
        unbounceModal.contentWindow.postMessage(message, '*');
    }, 750);
};

//cross browser event handling (firefox doesn't like to recognize window events by default)
var addEvent = function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    }
};

// inject modal triggering element - we're going to exploit the click option within unbounce to trigger a modal when the user leaves. 
var injectModalTrigger = function injectModalTrigger() {
    var modalButton = document.createElement('button');
    modalTrigger = modalButton;
    modalButton.style.display = 'none';
    modalButton.classList.add('exitModal');
    document.getElementsByTagName('body')[0].appendChild(modalButton);
};

var resetModal = function resetModal() {
    modalFired = !modalFired;
};

var checkForExistingSubscription = function checkForExistingSubscription() {
    if (subscriptionLabel) {
        modalFired = true;
    } else {
        injectModalTrigger();
    }
};

// Injecting script to detect when the user exits the window. 
var injectExitDetection = function injectExitDetection() {
    if (modalFired === false) {
        addEvent(document, 'mouseout', function (e) {
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
var injectEntranceDetection = function injectEntranceDetection() {
    if (modalFired === false) {
        addEvent(document, 'mouseover', function (e) {
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

var startExitTimer = function startExitTimer() {
    exitTimer = setTimeout(displayModal, 750);
};

var displayModalOnOfferDismissal = function displayModalOnOfferDismissal() {
    addEvent(modalDismissal, 'click', delayedModalDisplay(750));
    addEvent(proposalDismissal, 'click', delayedModalDisplay(750));
};

// display the modal 
var displayModal = function displayModal() {
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

var delayedModalDisplay = function delayedModalDisplay(timer) {
    setTimeout(displayModal, timer);
};

var manualUpgradeCheck = function manualUpgradeCheck() {
    var userInputButton = userLicenseInputContainer.querySelector('.updateWishButton');
    // setTimeout(function(){addEvent(userInputButton, 'click', checkForUpgrades);}, 2500);
    addEvent(userInputButton, 'click', checkForUpgrades);
};

var checkForUpgrades = function checkForUpgrades() {
    setTimeout(function () {
        offerModal = document.getElementById('my-content');
        checkForElement(offerModal, 3E4, runUpgradeProcess);
    }, 2500);
    // checkForElement(offerModal, 3E4, runUpgradeProcess);
};

var waitForModal = function waitForModal() {
    var offeredDiscount = getCookie("retention-score");
    if (!offeredDiscount) {
        offerModal = document.getElementById('my-content') ? document.getElementById('my-content') : 0;
        if (offerModal === 0) {
            manualUpgradeCheck();
        } else {
            checkForUpgrades();
        }
    }
};

var checkForElement = function checkForElement(element, time, fn) {
    var _this = this;

    // console.warn(element, time, fn);
    var waitForElement = function waitForElement(timeoutms) {
        return new Promise(function () {
            // console.warn('checking for ' + element);

            var check = function check() {
                if (element.length > 0 || element.innerHTML.length) {
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
    };
    setTimeout(function () {
        element;
    }, time / 10);
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        waitForElement(time);

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }))();
};

var runUpgradeProcess = function runUpgradeProcess() {

    if (offerModal != null) {
        licenseInfo = document.querySelector('[data-version]');
        licenseType = document.querySelector('[data-licensetype]').dataset.licensetype, licenseVersion = document.querySelector('[data-version]').dataset.version;

        if (licenseVersion != -1) {
            injectModalTrigger();
            injectExitDetection();
            injectEntranceDetection();
            checkForElement(userLicenseInputContainer, 3E4, getSessionInfo);
        }
    }
};

try {
    waitForModal();
} catch (e) {
    console.log('script didnt work because ' + e);
};
