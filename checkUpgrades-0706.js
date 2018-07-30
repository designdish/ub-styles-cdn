var to, from, modalTrigger, modalFired, sessionInfo,licenseInfo, licenseType, licenseVersion, offerModal; 

modalFired = false;


var userLicenseInputContainer = document.getElementsByClassName('updateWishContainer')[0],
    unbounceModalContainer    = document.getElementsByClassName('ub-emb-iframe-wrapper')[0],
    modalDismissal            = document.querySelector('.highslide-dimming'),
    proposalDismissal         = document.querySelector('.proposalClose');
    // availableUpgrade          = document.getElementsByClassName('usBuyButton'),
    // subscriptionLabel         = document.getElementById('UpdateView1_lbSubToSubBundleTitle'),
    // licenseType               = document.querySelector('[data-licensetype]').dataset.licensetype,
    // licenseVersion            = document.querySelector('[data-version]').dataset.version;

// check our url for licensing 
var getParameterByName = function(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
      , results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// create a session info object
var getSessionInfo = function(){
   var userInputLicenseNumber = userLicenseInputContainer.querySelector('input[type="text"]').value;
    sessionInfo =  { 
        customOrder: getParameterByName('CustomOrder', url),
        country: getParameterByName('Countryiso', url),
        licenseNumber: (getParameterByName('license', url) == null) ?  userInputLicenseNumber : getParameterByName('license', url),
        coupon: getParameterByName('coupon', window.location.href),
        OneOptionRedirect: getParameterByName('OneOptionRedirect', url),
    };
    var postSessionLicense =  postMessageToIframe(sessionInfo.licenseNumber);
    console.log(sessionInfo);
    if(unbounceModalContainer != null){
        // checkForElement(unbounceModalContainer, 3E4, postMessageToIframe(sessionInfo.licenseNumber));
       checkForElement(unbounceModalContainer, 3E4, postSessionLicense);
    }else{
        return sessionInfo;
    } 
};
    
// Pass our license to the address params
var updateAddress = function(){
    var newURL = "update.aspx?license=" + sessionInfo.licenseNumber;
    window.history.pushState(sessionInfo, "updateLicense", newURL);
};

// update our URL if there is no license passed through
var updateURLWithLicenseParams = function(){
    if (getParameterByName('license', url) == null){
        updateAddress();
    }
};

var postMessageToIframe = function(message){
    var unbounceModal = unbounceModalContainer.querySelector('iframe');
    unbounceModal.contentWindow.postMessage(message,'*');
};

//cross browser event handling (firefox doesn't like to recognize window events by default)
var addEvent = function(obj, evt, fn){
    if(obj.addEventListener){
        obj.addEventListener(evt, fn, false);
    }
    else if(obj.attachEvent){
        obj.attachEvent('on' + evt, fn);
    }
};

// inject modal triggering element - we're going to exploit the click option within unbounce to trigger a modal when the user leaves. 
var injectModalTrigger = function(){
    var modalButton = document.createElement('button');
    modalTrigger = modalButton;
    modalButton.style.display = 'none';
    modalButton.classList.add('exitModal');
    document.getElementsByTagName('body')[0].appendChild(modalButton); 
};

var resetModal = function(){
    modalFired = !modalFired;
};

var checkForExistingSubscription = function(){
    if (subscriptionLabel){
        modalFired = true;
    } else{
        injectModalTrigger();
    }
};

// Injecting script to detect when the user exits the window. 
var injectExitDetection = function(){
    if (modalFired === false){
        addEvent(document, 'mouseout', function(e){
            e = e ? e:window.event;
            from = e.relatedTarget || e.toElement; 
            if(!from || from.nodeName == "HTML"){
                startExitTimer();
                console.warn("user left window");
                injectEntranceDetection();
            }
        });
    }
};

// Injecting script to check if the user re-enters the window
var injectEntranceDetection = function(){
    if (modalFired === false){
        addEvent(document, 'mouseover', function(e){
            e = e ? e:window.event;
            from = e.relatedTarget || e.toElement; 
            if(from || from.nodeName == "HTML"){
                clearTimeout(exitTimer);
                console.warn("user re-entered the window");
            }
        });
    }
};

var exitTimer; 

var startExitTimer = function(){
    exitTimer = setTimeout(displayModal, 2000);
};

var displayModalOnOfferDismissal = function(){
    addEvent(modalDismissal, 'click', delayedModalDisplay(750));
    addEvent(proposalDismissal, 'click', delayedModalDisplay(750));
};

// display the modal 
var displayModal = function(){
    if (!modalFired){
        modalTrigger.click();
        modalFired = true;
        removeEventListener('mouseout', injectExitDetection, false);
        removeEventListener('mouseover', injectEntranceDetection, false);
    }   
};

var delayedModalDisplay = function(timer){
    setTimeout(displayModal, timer);
};


var manualUpgradeCheck = function(){
    var userInputButton = userLicenseInputContainer.querySelector('.updateWishButton');
    setTimeout(function(){addEvent(userInputButton, 'click', checkForUpgrades);}, 2500);
};

var checkForUpgrades = function(){
    offerModal = document.getElementById('my-content');
    checkForElement(offerModal, 3E4, runUpgradeProcess);
};

var waitForModal = function(){
    offerModal = (document.getElementById('my-content')) ? document.getElementById('my-content') : 0;
    if (offerModal === 0){
        manualUpgradeCheck();
    }else{
        checkForUpgrades();
    }
}

var checkForElement = function(element, time, fn){
    console.warn(element, time, fn);
    var waitForElement = timeoutms => new Promise(() =>{
        console.warn('checking for ' + element);

        var check = () =>{
            if ((element.length > 0) || (element.innerHTML.length)){
                console.log(element + ' is ready, that only took ' + time + 'ms');
                fn();
            }
            else if((timeoutms -= 100) < 0){
                    console.log("element " + element + " not available!");
            }else{
                    setTimeout(check, 100)
                }
            }
            setTimeout(check, 100);
    })
    setTimeout(() => {element}, (time / 10));
    (async() => {
        waitForElement(time);
    })();
};

var runUpgradeProcess = function(){
    if(offerModal != null){
        licenseInfo = document.querySelector('[data-version]');
        licenseType = document.querySelector('[data-licensetype]').dataset.licensetype,
        licenseVersion  = document.querySelector('[data-version]').dataset.version;

        if (licenseVersion > 0 ){
                injectModalTrigger();
                injectExitDetection();
                injectEntranceDetection();
                checkForElement(userLicenseInputContainer, 3E4, getSessionInfo);
        } 
    } else{
        checkForUpgrades();
    }
}

try{
    waitForModal();  
}catch(e){
    console.log('script didnt work because ' + e);
};