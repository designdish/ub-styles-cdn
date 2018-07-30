<script>


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

const copyCouponCode = str =>{
  const el = getParamerterByName('coupon', modalLink.href);
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-99999px';
  document.body.appendChild(el);
  const selected = 
  document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el); 

  if(selected){
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};


var updateModalLink = function(event){
  var modalLink = document.getElementsByTagName('a')[0];
  var urlParams = event.data;
  
  if(typeof(urlParams) === "string"){
    console.log("base link from modal is " + modalLink.href);
    if(modalLink.href.charAt(modalLink.href.length -1 ) != "&") {
      modalLink.href = modalLink.href + "&";
      console.log("appended ampersand to modal link to accommodate parameters " + '\n' + "new link is now " + modalLink.href);
      }
    var coupon = getParameterByName('coupon',urlParams);
    if(coupon){
      var scrubParams = urlParams.replace('&coupon=' + coupon, "");
      scrubParams = scrubParams.replace("?&", "");
      modalLink.href = modalLink + '&' + scrubParams;
    }else{
      console.log("message received was: " + urlParams + "\n current link is: " + modalLink);
            urlParams = urlParams.replace("?","");
            modalLink.href = modalLink + '&' + urlParams;
        }
    }else{
      window.addEventListener('message', listenForMessage, false);
    }

      modalLink.addEventListener('click', copyCouponCode, false);

}

 
var listenForMessage = function(event){ 
    if(~event.origin.indexOf('https://www.teamviewer.com')){
      updateModalLink(event);
      }
    else {
        return;
    }
};

try{
    window.addEventListener('message', listenForMessage, false);
}catch(e){
    console.log('script didnt work because ' + e);
};
                        
</script>


=============

<script>

var license, newURL, modalLink, replacementURL;
var hasCurrentDiscount = false; 


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



// Check for available upgrades within the DOM 
var checkForLicenseInfo = function(){
    var waitForLicenseInfo = timeoutms => new Promise(() =>{
        var check = () =>{
            if (license.length > 0){
                console.log(license + ' has been presented');
                updateModalLink();
              return;
            }else if((timeoutms -= 100) < 0){
                console.log('no license info available :-( ');
            }else {
                setTimeout(check, 100)
            }
        }
    setTimeout(check, 100);
    })

    setTimeout(()=>{license}, 1000);


    (async ()=>{
        waitForLicenseInfo(20000);
    })();
};
  
var replaceCouponCode = function(){
    var entryURL = window.location.href;
    var coupon = getParameterByName('coupon', entryURL);
    if (entryURL.indexOf(coupon)){
      hasCurrentDiscount = true;
      replacementURL = entryURL.replace("coupon=" + coupon, "");
    }
};

var updateModalLink = function(event){
  license = event.data;
  modalLink = document.getElementsByTagName('a')[0];
  
  if(typeof(license) === "string"){
    console.log("message received was: " + license + 
                "\n current link is: " + modalLink); 
    
    replaceCouponCode();
    
    if(hasCurrentDiscount){
        newURL = replacementURL + "license=" + license;
    } else if (!hasCurrentDiscount){
        newURL = typeof(license) === "string" ? modalLink.href + "license=" + license : modalLink.href;
    }

    if ((modalLink.href.indexOf('license') > -1) || (modalLink.href.indexOf('License') > -1)){
      window.addEventListener('message', listenForMessage, false);
    }else{
      modalLink.href = newURL;
    }
      console.log("compiled link is: " + modalLink);
    }else{
      window.addEventListener('message', listenForMessage, false);
    }

}

 
var listenForMessage = function(event){ 
    if(~event.origin.indexOf('https://www.teamviewer.com')){
      updateModalLink(event);
      }
    else {
        return;
    }
};

try{
    window.addEventListener('message', listenForMessage, false);
}catch(e){
    console.log('script didnt work because ' + e);
};
                        
</script>