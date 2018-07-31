jQuery.getScript('//9e32135595f542c7bafa3760c4bf85d3.js.ubembed.com');


jQuery(function($){ 
	$('.call-us').on('click', function() {
		$('.tel-no').fadeIn( "slow" );
	});
	
	var getRefQueryParam = function() {
		var temp = {};
		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			var decode = function(s) {
				return decodeURIComponent(s.split("+").join(" "));
			};
			
			temp[decode(arguments[1])] = decode(arguments[2]);
		});
		return temp;
	};
	
	var query = getRefQueryParam();
	
	if(query.preview)
		return;
	
	delete query.s;
	
	var params = jQuery.param( query );

	if(params)
		params = "?" + params;
	
	var addParamsToURL = function(elem, query) {
		
		var elem = $(elem);
		
		var url = elem.attr('href');
		
		if(url.indexOf('?') !== -1) {
			query = query.replace('?', '&');
		}
		
		elem.attr( 'href', url + query );
	}
	
    $('body').find('a[href^="/"]').each(function() {
		addParamsToURL(this, params);
	});
	
	$('body').find('a[href^="https://www.teamviewer.us"]').each(function() {
		addParamsToURL(this, params);
	});
	
    $('body').find('a[href^="https://www.teamviewer.com"]').each(function() {
		addParamsToURL(this, params);
	});

    $('body').find('a[href^="https://subscription-us.blizz.com"]').each(function() {
		addParamsToURL(this, params);
	});
	
	function fixPopupSize( $box ) {
		var windowWidth 	= $(window).width();
		var windowHeight 	= $(window).height();
		var popupHeight 	= $box.outerHeight();
		var contentHeight 	= $box.find('.spu-content').outerHeight();
		var popupWidth 		= $box.outerWidth();
		var intentWidth		= $box.data('width');
		var left 			= 0;
		var top 			= windowHeight / 2 - popupHeight / 2;
		var position 		= 'fixed';
		var currentScroll   = $(document).scrollTop();
        // don't fix position when box go into posts content
        if( $box.after_content )
            return;

		if( $box.hasClass('spu-centered') ){
			if( intentWidth < windowWidth ) {
				left = windowWidth / 2 - popupWidth / 2;
			}
			$box.css({
				"left": 	left,
				"position": position,
				"top": 		top,
			});
		}

		// if popup is higher than viewport we need to make it absolute
		if( (popupHeight + 50) > windowHeight && contentHeight > windowHeight ) {
			position 	= 'absolute';
			top 		= currentScroll;
            if( $box.hasClass('spu-full-screen') ){
                $box.css({ "height" : "auto" })
            }
            $box.css({
				"position": position,
				"top": 		top,
				"bottom": 	"auto",
			});

		} else {
            $box.css({
                "position": "fixed"

            });
        }
        if( $box.hasClass('spu-full-screen') ){
            $box.find('.spu-content').css('height',$box.find('.spu-box-container').height());
             $box.css({
                "display": "flex"

            });
        }
	}

	$('.spu-box input').on('change', function() {
		var elem = $(this).closest('.spu-box');
		var tm = setTimeout(function(){ fixPopupSize(elem); clearTimeout(tm) }, 1000);
	});

	$('.spu-box select').on('change', function() {
		var elem = $(this).closest('.spu-box');
		var tm = setTimeout(function(){ fixPopupSize(elem); clearTimeout(tm) }, 1000);
	});
});

(function(window) {
 
    addEvent(window, 'message', function(message) {
      var dataLayer = window.dataLayer || (window.dataLayer = []);
 
      if (message.data === 'popup') {
        dataLayer.push({
          'event': 'popup'
        });
      }
 
    });
 
    function addEvent(el, evt, fn) {
      if (el.addEventListener) {
        el.addEventListener(evt, fn);
      } else if (el.attachEvent) {
        el.attachEvent('on' + evt, function(evt) {
          fn.call(el, evt);
        });
      } else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {
        el['on' + evt] = function(evt) {
          fn.call(el, evt);
        };
      }
    }
 
})(window);

jQuery(function($){
$(".page-id-6023 .menu-item-4204 a").attr("href", "tel:877-245-6858");

$(".page-id-6023 .menu-item-4204 a span").text("(877) 245 6858");
});


var subHeader, phoneNumber, phoneLink, heroText, heroContainer, heroInnerColumn;

var getSitePhoneNumber = function(){
 subHeader = document.getElementById('secondary-menu');
 phoneNumber = subHeader.getElementsByTagName('li')[0];
 phoneLink = phoneNumber.innerHTML;

    return phoneLink;
};

var getHeroContainer = function(){
 heroContainer = document.getElementsByClassName('the_content_wrapper')[0]; 
 heroText = heroContainer.querySelectorAll('[class*= "-header-text"]')[0];
 if (heroText != undefined){
 heroInnerColumn = heroText.querySelectorAll('[class*= "_column-inner"]')[0];
    return heroText;
 } else return;
};

var injectSitePhoneNumber = function(){
    if (getHeroContainer(heroText)){
        getSitePhoneNumber();
        var featureContactNumber = document.createElement('div');
        var phoneIcon = '<i class="_mi _before dashicons dashicons-phone" aria-hidden="true" style="font-size:1.1em;"></i>'
        featureContactNumber.innerHTML = ' <h3 class="js-featured-phone">For more information give us a call at:<br />' + phoneLink + '</h3>';
            var icon = featureContactNumber.getElementsByTagName('i')[0];
        featureContactNumber.getElementsByTagName('a')[0].removeChild(icon);
        heroInnerColumn.insertAdjacentHTML('beforeend', featureContactNumber.innerHTML)
    }
};



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

var getClosest = function(elem, selector){
    for(; elem && elem !==document; elem = elem.parentNode){
        if(elem.matches(selector)) return elem;
        }
    return null;
};


var toggleVersionDisplay = function() {
    var clientVersion = getParameterByName('clientVersion');
    var versionFeatures = document.querySelectorAll('[data-featureversion]');
    for (var i = 0; i < versionFeatures.length; i++) {
        if (versionFeatures[i].dataset.featureversion < clientVersion) {
            versionFeatures[i].classList.add('hidden');
            var parent = getClosest(versionFeatures[i], '.wpb_column');
            var featureRow = getClosest(parent, '.vc_row');
            featureRow.removeChild(parent);
        }
    }
};
var today = new Date();

var setCookie = function(cName, cValue, cExpires, cPath){
	if(!cPath){
		cPath = "/";
	}
	if(!cExpires){
		cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
	}
	document.cookie = cName + "=" + cValue + ";expires=" + cExpires.toGMTString() + "; path=" + cPath;

	return cValue;
}

var updateCookie = function(cName, cValue){
	var expireDate = document.cookie.indexOf(cName) === -1
	? new Date(new Date().setTime(new Date().getTime() + 30 * 24 * 3600 * 1000))
	: unescape(document.cookie).split('expireDate=')[1];
	document.cookie = cName + '=' + cValue + ',expireDate=' + expireDate + ';expires=' + expireDate;
}

var getCookie = function(cName){
	var cStr = document.cookie;
	
	var startSlice = cStr.indexOf(cName + "=");
		if (startSlice == -1){
			return false
		}

	var endSlice = cStr.indexOf(";", startSlice + 1)
		if (endSlice == -1){
			endSlice = cStr.length
		}

	var cData = cStr.substring(startSlice, endSlice);
	var cValue = cData.substring(cData.indexOf("=")+1, cData.length);
	return cValue;
}


var getMLCookie = function(){
    var pid, ml_eg, lae_vid, mlAppendedString;

    

        pid = (getCookie('pid') != false) ? getCookie('pid') : setCookie('pid', 'test');
        ml_eg =  (getCookie('ml_eg') != false) ? getCookie('ml_eg') : setCookie('ml_eg', 'default');
        lae_vid =  (getCookie('lae_vid') != false) ? getCookie('lae_vid') : setCookie('lae_vid', 'default');
    	
         pid = (getCookie('pid'));
		 ml_eg =  (getCookie('ml_eg'));
		 lae_vid =  (getCookie('lae_vid'));

    if ((pid !== false) && (ml_eg !== false) && (lae_vid !== false)){
    	mlAppendedString = 'pid=' + pid + '-ml_eg-' + ml_eg + '-lae_vid-' + lae_vid;
    }
    else if (pid === false){
		mlAppendedString = 'pid=-ml_eg-' + ml_eg + '-lae_vid-' + lae_vid;

    }
    else if((ml_eg !== false) && (lae_vid !== false)){
        mlAppendedString = 'pid=-ml_eg-' + ml_eg + '-lae_vid-' + lae_vid;
    }


    updateURL(mlAppendedString);
	
};

var updateURL = function(params){
    var links = document.querySelectorAll('a');

    for(var i = 0; links.length > i; i++){
        var link = links[i];
        var url = link.href;

        if (url.indexOf('teamviewer.com') != -1){
        	url = (url.indexOf('?') != -1) ? url + '&' + params : url + '?' + params;

            // var newLink = url + params;
            // url = newLink;
            link.href = url;
            console.log(url);    
        }
	}
};


window.onload = function() {
	toggleVersionDisplay();
	injectSitePhoneNumber();
   	getMLCookie();
};