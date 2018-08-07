var injectSlideToggle = function() {
    var radioGroup = document.getElementsByClassName('hs-fieldtype-radio');
    var switchIndicator = document.createElement('div');
    switchIndicator.classList.add('switch__indicator');
    radioGroup[0].insertAdjacentElement('beforeend', switchIndicator);
};

window.onload = function() {
    injectSlideToggle();
};