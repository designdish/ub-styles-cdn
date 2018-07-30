var to, from, modalTrigger, modalLimited ; 
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
}


// Injecting script to detect when the user exits the window. 
var injectExitDetection = function(){    
    if(modalLimited === undefined){
        addEvent(document, 'mouseout', function(e){
            e = e ? e:window.event;
            from = e.relatedTarget || e.toElement; 
            if(!from || from.nodeName == "html"){
                startExitTimer();
            }
      });
    }
}

// Let the browser know that it's already displayed the modal
var limitModalDisplay = function(){
    modalLimited = document.getElementsByTagName('html')[0];
      modalLimited.dataset.hideexitmodal = true;
      modalLimited = true;
      resetTimer();
};

// var injectExitDetection = function(){
//     document.addEventListener('mouseout', startExitTimer()); 
//     injectEntranceDetection();
// };

var injectEntranceDetection = function(){
    document.removeEventListener('mouseout', injectExitDetection);
};


// Injecting script to check if the user re-enters the window
// var injectEntranceDetection = function(){
//     document.onmouseover = clearTimeout(exitTimer)
//     console.log("timer stopped");
// };




//jQuery solution
// var injectExitDetection = function(){
//     $('body').on('mouseleave', startExitTimer());
//     injectEntranceDetection();
// }

// var injectEntranceDetection = function(){
//     $('body').on('mouseenter', resetTimer());
// };


var exitTimer; 

var startExitTimer = function(){
    alert("timer's starting!");
    exitTimer = setTimeout(displayModal, 2500);
}

var resetTimer = function(){
    clearTimeout(exitTimer);
    injectEntranceDetection();
}

// display the modal 
var displayModal = function(){
    modalTrigger.click();
    limitModalDisplay();
}

// Check for available upgrades within the DOM 
var checkForUpgrades = function(){
    var availableUpgrade = document.getElementsByClassName('usBuyButton');
    if (availableUpgrade.length > 0){
        injectModalTrigger();
        injectExitDetection();
    }
};

window.ready = function(){
    checkForUpgrades();
}