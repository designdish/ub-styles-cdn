<script>

var license;
var postedSessionInfo = window.sessionInfo;
// Check for available upgrades within the DOM 
var checkForLicenseInfo = function(){
    license = event.data;
    var waitForLicenseInfo = timeoutms => new Promise(() =>{
        var check = () =>{
            console.warn('checking for license');
          	if (postedSessionInfo != undefined){
              license = postedSessionInfo.licenseNumber;
            }
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
  
 
var updateModalLink = function(){
 var modalLink = document.getElementsByTagName('a')[0];
  console.log(license);
  console.log("message received was: " + license + 
              "\n current link is: " + modalLink); 
  newURL = typeof(license) === "string" ? modalLink.href + "&license=" + license : modalLink.href;
  if (modalLink.href.indexOf('license') > -1){
    return; 
  }else{
    modalLink.href = newURL;
  }
  console.log("compiled link is: " + modalLink);
}

 
var listenForMessage = function(){ 
  window.addEventListener('message', function(event){
      if(~event.origin.indexOf('https://www.teamviewer.com')){
        checkForLicenseInfo();
        }
      else {
          return;
      }
  });
}

try{
    listenForMessage();
}catch(e){
    console.log('script didnt work because ' + e);
};
                        
</script>