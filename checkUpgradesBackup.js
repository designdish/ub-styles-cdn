"use strict";

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value; 
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

var to, from, modalTrigger, modalFired, updateLicenseButton;

modalFired = false;

//cross browser event handling (firefox doesn't like to recognize window events by default)
var addEvent = function addEvent(obj, evt, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  }
};

// inject modal triggering element - we're going to exploit the click option within unbounce to trigger a modal when the user leaves.
var injectModalTrigger = function injectModalTrigger() {
  var modalButton = document.createElement("button");
  modalTrigger = modalButton;
  modalButton.style.display = "none";
  modalButton.classList.add("exitModal");
  document.getElementsByTagName("body")[0].appendChild(modalButton);
};

var resetModal = function resetModal() {
  modalFired = !modalFired;
};

// Injecting script to detect when the user exits the window.
var injectExitDetection = function injectExitDetection() {
  if (modalFired === false) {
    addEvent(document, "mouseout", function(e) {
      e = e ? e : window.event;
      from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName == "HTML") {
        startExitTimer();
        console.warn(
          "window left + /n user left " + from + "the event was " + e
        );
        injectEntranceDetection();
      }
    });
  }
};

// Injecting script to check if the user re-enters the window
var injectEntranceDetection = function injectEntranceDetection() {
  if (modalFired === false) {
    addEvent(document, "mouseover", function(e) {
      e = e ? e : window.event;
      from = e.relatedTarget || e.toElement;
      if (from || from.nodeName == "HTML") {
        clearTimeout(exitTimer);
        console.warn("user re-entered the window");
      }
    });
  }
};

var exitTimer;

var startExitTimer = function startExitTimer() {
  //alert("timer's starting!");
  exitTimer = setTimeout(displayModal, 3000);
};

// display the modal
var displayModal = function displayModal() {
  if (!modalFired) {
    modalTrigger.click();
    modalFired = true;
    removeEventListener("mouseout", injectExitDetection, false);
    removeEventListener("mouseover", injectEntranceDetection, false);
  }
};

// Check for available upgrades within the DOM
var checkForUpgrades = function checkForUpgrades() {
  var _this = this;

  var availableUpgrade = document.getElementsByClassName("usBuyButton");
  var waitForUpgrades = function waitForUpgrades(timeoutms) {
    return new Promise(function() {
      var check = function check() {
        console.warn("checking for upgrades");
        if (availableUpgrade.length > 0) {
          console.log(availableUpgrade.length + " upgrades available");
          injectModalTrigger();
          injectExitDetection();
        } else if ((timeoutms -= 100) < 0) {
          console.log("no upgrades available :-( ");
        } else {
          setTimeout(check, 100);
        }
      };
      setTimeout(check, 100);
    });
  };

  setTimeout(function() {
    availableUpgrade;
  }, 1000);

  _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                waitForUpgrades(20000);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        _this
      );
    })
  )();
};

try {
  checkForUpgrades();
} catch (e) {
  console.log("script didnt work because " + e);
}
