var productIdMap = {};

var masterProductInfoList = [];
var firstthreedays = "";
var buttonText = "";
var footerText = "";
var priceArrayMonthly = "";
var priceArrayYealy = "";
var discountedAmount = "";
var productflag = "product_yearly";
var translations = {};
var promiseTranslation;
var promiseTranslationResolve;
var language_country = '';
var language = '';
var isOrientationLandscape = '';
var scrollFlag = "YES";
var isiPad = (window.location.href.indexOf("ipad") > -1) ? true : false;

var MIN_SCROLL_DISTANCE=80;
function initialize()
{
	const smoothingImageAfter =lozad('#smoothing-image-after', {
		loaded: function(el) {
			const smootheningElement = document.getElementById("smootheningContainer");
			if (isiPad) {
				const smootheningViewer = new ImageCompare(smootheningElement, {
					startingPoint: 53,
					controlColor: "#FFFFFF",
					controlShadow: false,
					addCircle: true
				})
					.mount();
			}
			else {
				const smootheningViewer = new ImageCompare(smootheningElement, {
					startingPoint: 52,
					controlColor: "#FFFFFF",
					controlShadow: false,
					addCircle: true
				})
					.mount();
			}
		}
	});

	smoothingImageAfter.observe();

	const smilingImageAfter =lozad('#smiling-image-after', {
		loaded: function(el) {
			const smileElement = document.getElementById("smileContainer");
			if (isiPad) {
				const smileViewer = new ImageCompare(smileElement, {
					controlColor: "#FFFFFF",
					controlShadow: false,
					addCircle: true
				})
					.mount();
			}
			else {
				const smileViewer = new ImageCompare(smileElement, {
					startingPoint: 48,
					controlColor: "#FFFFFF",
					controlShadow: false,
					addCircle: true
				})
					.mount();
			}
		}
	});

	smilingImageAfter.observe();

	window.addEventListener("orientationchange", function () {
		if (window.orientation == 0 || window.orientation == 180 ) {
			document.getElementById("container1").style.position = "fixed";
			document.getElementById("container1").style.bottom = "0";
	     	document.getElementById("container").style.height = (window.innerHeight - document.getElementById("container1").clientHeight) + 'px';
	    }
	    else if (window.orientation == 90 || window.orientation == -90 ) {
	    	document.getElementById("container1").style.position = "fixed";
	    	document.getElementById("container1").style.bottom = "0";
	     	document.getElementById("container").style.height = (window.innerHeight - document.getElementById("container1").clientHeight) + 'px';
	    }

	});	

	isOrientationLandscape = window.matchMedia("(orientation:landscape)");
	var languageToCountryCode = 
        	{
	        	'cs':'cs_cz', 'cs-cz': 'cs_cz', 
	        	'da':'da_dk', 'da-dk':'da_dk',
	        	'de':'de_de', 'de-de':'de_de',
	        	'el':'el_gr', 'el-gr':'el_gr',
	        	'es':'es_es', 'es-es':'es_es',
	        	'fi':'fi_fi', 'fi-fi':'fi_fi',
	        	'fr':'fr_fr', 'fr-fr':'fr_fr',
	        	'id':'id_id', 'id-id':'id_id',
	        	'it':'it_it', 'it-it':'it_it',
	        	'ja':'ja_jp', 'ja-jp':'ja_jp',
	        	'ko':'ko_kr', 'ko-kr':'ko_kr',
	        	'lv':'lv_lv', 'lv-lv':'lv_lv',
	        	'ms':'ms_my', 'ms-my':'ms_my',
	        	'nb':'nb_no', 'nb-no':'nb_no',
	        	'nl':'nl_nl', 'nl-nl':'nl_nl',
	        	'pl':'pl_pl', 'pl-pl':'pl_pl',
	        	'pt':'pt_br', 'pt-br':'pt_br',
	        	'ro':'ro_ro', 'ro-ro':'ro_ro',
	        	'ru':'ru_ru', 'ru-ru':'ru_ru',
	        	'sv':'sv_se', 'sv-se':'sv_se',
	        	'th':'th_th', 'th-th':'th_th',
	        	'tr':'tr_tr', 'tr-tr':'tr_tr',
	        	'uk':'uk_ua', 'uk-ua':'uk_ua',
	        	'vi':'vi_vn', 'vi-vn':'vi_vn',
	        	'zh':'zh_cn', 'zh-cn':'zh_cn', 'zh-tw':'zh_tw',
	        	'zz':'zz_zz', 'zz-zz':'zz_zz',
	        	'fil':'ph_ph', 'fil-ph':'ph_ph',
	        	'tl':'ph_ph', 'tl-tl':'ph_ph'
        	};

		language = window.navigator.userLanguage || window.navigator.language;
		language = language.toLowerCase();
		var lan_code = language.split('-');

		if(language in languageToCountryCode){
			language_country = languageToCountryCode[language];
		}
		else if (lan_code[0] in languageToCountryCode){
			language_country = languageToCountryCode[lan_code[0]];
		}
		else{
			language_country = 'en_us';
		}
	
	// TODO - Code to identify if we need to use US or not
	
	// Download JS object for Language
	url = "Strings/"+ language_country+"/translation.json";
	var request = new XMLHttpRequest();
	request.open('GET', url, true);  // `false` makes the request synchronous
	request.send(null);

	promiseTranslation = new Promise((resolve, reject) => {
		promiseTranslationResolve = resolve;
	 request.onreadystatechange = function () {
	        if (request.readyState === 4 && request.status === 200) {
	        	processTranslations(JSON.parse(request.responseText));
			}
			else{
				let message = {
					"action":"load_translations",
					"path":url
				}
				window.webkit.messageHandlers.interOp.postMessage(message);
			}
		}
	
	})


	// JSS specific to iPhone 5s
	var x = window.matchMedia("(device-width:320px) and (orientation:portrait)")
	if (x.matches){
		if (language_country === "ja_jp" || language_country === "ja"){
			document.getElementById("premiumText").style.fontSize = "13px";
			document.getElementById("editorThemesAbout").style.fontSize = "9px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "9px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "9px";
			document.getElementById("replaceEyeAbout").style.fontSize = "9px";
			document.getElementById("collageThemesAbout").style.fontSize = "9px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "9px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "9px";
			document.getElementById("infinteContentAbout").style.fontSize = "9px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "9px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "9px";
			document.getElementById("restore").style.fontSize = "9px";
			document.getElementById("manyMoreText").style.fontSize = "9px";
			document.getElementById("editorThemesText").style.fontSize = "13px";
			document.getElementById("selectiveEditingText").style.fontSize = "13px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "13px";
			document.getElementById("replaceEyeText").style.fontSize = "13px";
			document.getElementById("layersIncompositionText").style.fontSize = "13px";
			document.getElementById("grabcutMasking").style.fontSize = "13px";
			document.getElementById("collageThemesText").style.fontSize = "13px";
			document.getElementById("scrapBookCollageText").style.fontSize = "13px";
			document.getElementById("creativeCameraEdits").style.fontSize = "13px";
			document.getElementById("infinteContentText").style.fontSize = "13px";
			document.getElementById("editorText1").style.fontSize = "8px";
			document.getElementById("editorText2").style.fontSize = "8px";
			document.getElementById("editorText3").style.fontSize = "8px";
			document.getElementById("smootheningText").style.fontSize = "13px";
			document.getElementById("smileText").style.fontSize = "13px";
			document.getElementById("smootheningAbout").style.fontSize = "9px";
			document.getElementById("smileAbout").style.fontSize = "9px";
			document.getElementById("smootheningText2").style.fontSize = "8px";
			document.getElementById("smileText2").style.fontSize = "8px";
			document.getElementById("editorText4").style.fontSize = "8px";
		}

		else if (language_country === "de_de" || language_country === "de"){
			document.getElementById("premiumText").style.fontSize = "13px";
		}

		else if (language_country === "es_es" || language_country === "fr_fr" || language_country === "id_id" || language_country === "es_mx" || language_country === "fr_ca" || 
				language_country === "cs_cz" || language_country === "pt_br" || language_country === "ph_ph" || language_country === "es"
				|| language_country === "fr" || language_country === "id" || language_country === "cs" || language_country === "pt" || language_country === "ph_ph"){
			document.getElementById("premiumText").style.fontSize = "14px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "14px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			
		}

		else if (language_country === "nl_nl" || language_country === "nl"){
			document.getElementById("premiumText").style.fontSize = "15px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "14px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
		}

		else if (language_country === "nb_no" || language_country === "tr_tr" || language_country ==="tr" || language_country === "nb"){
			document.getElementById("premiumText").style.fontSize = "13px";
			document.getElementById("editorThemesText").style.fontSize = "13px";
			document.getElementById("selectiveEditingText").style.fontSize = "13px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "13px";
			document.getElementById("replaceEyeText").style.fontSize = "13px";
			document.getElementById("collageThemesText").style.fontSize = "13px";
			document.getElementById("scrapBookCollageText").style.fontSize = "13px";
			document.getElementById("creativeCameraEdits").style.fontSize = "13px";
			document.getElementById("infinteContentText").style.fontSize = "13px";
			document.getElementById("layersIncompositionText").style.fontSize = "13px";
			document.getElementById("grabcutMasking").style.fontSize = "13px";
			document.getElementById('yearlyMonthlyPrice').style.fontSize = "13px";
		}

		else if (language_country === "pl_pl" || language_country === "ru_ru" || language_country === "pl" || language_country === "ru"){
			document.getElementById("premiumText").style.fontSize = "12px";
			document.getElementById("editorThemesText").style.fontSize = "12px";
			document.getElementById("selectiveEditingText").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "12px";
			document.getElementById("replaceEyeText").style.fontSize = "12px";
			document.getElementById("collageThemesText").style.fontSize = "12px";
			document.getElementById("scrapBookCollageText").style.fontSize = "12px";
			document.getElementById("creativeCameraEdits").style.fontSize = "12px";
			document.getElementById("infinteContentText").style.fontSize = "12px";
			document.getElementById("layersIncompositionText").style.fontSize = "12px";
			document.getElementById("grabcutMasking").style.fontSize = "12px";
		}

		else if(language_country === "ko_kr" || language_country === "ko"){
			document.getElementById("premiumText").style.fontSize = "16px";
		}

		else if(language_country === "el_gr" || language_country === "el"){
			document.getElementById("premiumText").style.fontSize = "12px";
			document.getElementById("editorThemesText").style.fontSize = "11px";
			document.getElementById("selectiveEditingText").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "11px";
			document.getElementById("replaceEyeText").style.fontSize = "11px";
			document.getElementById("collageThemesText").style.fontSize = "11px";
			document.getElementById("scrapBookCollageText").style.fontSize = "11px";
			document.getElementById("creativeCameraEdits").style.fontSize = "11px";
			document.getElementById("infinteContentText").style.fontSize = "11px";
			document.getElementById("layersIncompositionText").style.fontSize = "11px";
			document.getElementById("grabcutMasking").style.fontSize = "11px";
			document.getElementById("editorThemesAbout").style.fontSize = "10px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "10px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "10px";
			document.getElementById("replaceEyeAbout").style.fontSize = "10px";
			document.getElementById("collageThemesAbout").style.fontSize = "10px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "10px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "10px";
			document.getElementById("infinteContentAbout").style.fontSize = "10px";
			document.getElementById("manyMoreText").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "10px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "10px";
		}

		else if(language_country === "uk_ua" || language_country === "uk"){
			document.getElementById("premiumText").style.fontSize = "13px";
			document.getElementById("editorThemesText").style.fontSize = "12px";
			document.getElementById("selectiveEditingText").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "12px";
			document.getElementById("replaceEyeText").style.fontSize = "12px";
			document.getElementById("layersIncompositionText").style.fontSize = "12px";
			document.getElementById("grabcutMasking").style.fontSize = "12px";
			document.getElementById("collageThemesText").style.fontSize = "12px";
			document.getElementById("scrapBookCollageText").style.fontSize = "12px";
			document.getElementById("creativeCameraEdits").style.fontSize = "12px";
			document.getElementById("infinteContentText").style.fontSize = "12px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
		}

	}

	// JSS specific to iPhone iPhone 6/7/8
	x = window.matchMedia("(device-width:375px) and (device-height:667px) and (orientation:portrait)")
	if (x.matches){
		if (language_country === "ja_jp" || language_country === "ja"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesAbout").style.fontSize = "10px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "10px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "10px";
			document.getElementById("replaceEyeAbout").style.fontSize = "10px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "10px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "10px";
			document.getElementById("collageThemesAbout").style.fontSize = "10px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "10px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "10px";
			document.getElementById("infinteContentAbout").style.fontSize = "10px";
			document.getElementById("restore").style.fontSize = "10px";
			document.getElementById("manyMoreText").style.fontSize = "10px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "14px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
		}

		else if (language_country === "de_de" || language_country === "de"){
			document.getElementById("premiumText").style.fontSize = "16px";
		}

		else if (language_country === "fr_fr" || language_country === "id_id" || language_country === "cs_cz" || language_country === "fr_ca"
			|| language_country === "fr" || language_country === "id" || language_country === "cs"
			|| language_country === "nl_nl" || language_country === "pt_br" || language_country === "es_es" || language_country === "es_mx" || language_country === "ph_ph"
			|| language_country === "nl" || language_country === "pt" || language_country == "es" || language_country === "ph_ph"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
		}


		else if (language_country === "nb_no" || language_country === "tr_tr" || language_country === "nb" || language_country === "tr"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "pl_pl" || language_country === "ru_ru" || language_country === "pl" || language_country === "ru"){
			document.getElementById("premiumText").style.fontSize = "15px";
			document.getElementById("editorThemesText").style.fontSize = "15px";
			document.getElementById("selectiveEditingText").style.fontSize = "15px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "15px";
			document.getElementById("replaceEyeText").style.fontSize = "15px";
			document.getElementById("layersIncompositionText").style.fontSize = "15px";
			document.getElementById("grabcutMasking").style.fontSize = "15px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if(language_country === "el_gr" || language_country === "el"){
			document.getElementById("premiumText").style.fontSize = "14px";
			document.getElementById("editorThemesText").style.fontSize = "13px";
			document.getElementById("selectiveEditingText").style.fontSize = "13px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "13px";
			document.getElementById("replaceEyeText").style.fontSize = "13px";
			document.getElementById("layersIncompositionText").style.fontSize = "13px";
			document.getElementById("grabcutMasking").style.fontSize = "13px";
			document.getElementById("collageThemesText").style.fontSize = "13px";
			document.getElementById("scrapBookCollageText").style.fontSize = "13px";
			document.getElementById("creativeCameraEdits").style.fontSize = "13px";
			document.getElementById("infinteContentText").style.fontSize = "13px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "12px";
		}

		else if(language_country === "uk_ua" || language_country === "uk"){
			document.getElementById("premiumText").style.fontSize = "15px";
			document.getElementById("editorThemesText").style.fontSize = "12px";
			document.getElementById("selectiveEditingText").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "12px";
			document.getElementById("replaceEyeText").style.fontSize = "12px";
			document.getElementById("layersIncompositionText").style.fontSize = "12px";
			document.getElementById("grabcutMasking").style.fontSize = "12px";
			document.getElementById("collageThemesText").style.fontSize = "12px";
			document.getElementById("scrapBookCollageText").style.fontSize = "12px";
			document.getElementById("creativeCameraEdits").style.fontSize = "11px";
			document.getElementById("infinteContentText").style.fontSize = "12px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "12px";
		}

		if (language_country === "nb_no" || language_country === "nb" || language_country ==="ru_ru" || language_country === "ru"){
			document.getElementById('yearlyMonthlyPrice').style.fontSize = "13px";
			document.getElementById('discountedPercentage').style.fontSize = "13px";
			document.getElementById('yearlyAmount').style.fontSize = "13px";
			document.getElementById('product_monthly').style.fontSize = "13px";
		}

	}

	// JSS specific to iPhone iPhone 6/7/8 +
	x = window.matchMedia("(device-width:414px) and (device-height:736px) and (orientation:portrait)")
	if (x.matches){
		if (language_country === "ja_jp" || language_country === "ja"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("restore").style.fontSize = "11px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "11px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
			document.getElementById("editorText1").style.fontSize = "8px";
			document.getElementById("editorText2").style.fontSize = "8px";
			document.getElementById("editorText3").style.fontSize = "8px";
			document.getElementById("editorText4").style.fontSize = "8px";
		}

		else if (language_country === "es_es" || language_country === "es_mx" || language_country === "es"){
			document.getElementById("premiumText").style.fontSize = "19px";
			document.getElementById("editorThemesAbout").style.fontSize = "13px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "13px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "13px";
			document.getElementById("replaceEyeAbout").style.fontSize = "13px";
			document.getElementById("collageThemesAbout").style.fontSize = "13px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "13px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "13px";
			document.getElementById("infinteContentAbout").style.fontSize = "13px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "13px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "13px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "fr_fr" || language_country === "fr" || language_country === "fr_ca"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
		}

		else if (language_country === "id_id" || language_country === "id"){
			document.getElementById("premiumText").style.fontSize = "19px";
			document.getElementById("editorThemesText").style.fontSize = "17px";
			document.getElementById("selectiveEditingText").style.fontSize = "17px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "17px";
			document.getElementById("replaceEyeText").style.fontSize = "17px";
			document.getElementById("collageThemesText").style.fontSize = "17px";
			document.getElementById("scrapBookCollageText").style.fontSize = "17px";
			document.getElementById("creativeCameraEdits").style.fontSize = "17px";
			document.getElementById("infinteContentText").style.fontSize = "17px";
			document.getElementById("layersIncompositionText").style.fontSize = "17px";
			document.getElementById("grabcutMasking").style.fontSize = "17px";
		}

		else if (language_country === "nb_no" || language_country === "pl_pl" || language_country === "cs_cz"
			|| language_country === "nb" || language_country === "pl" || language_country === "cs"
			 || language_country === "ru_ru" || language_country === "tr_tr" || language_country === "el_gr" || language_country === "ph_ph"
			 || language_country === "ru" || language_country === "tr" || language_country === "el" || language_country === "ph_ph"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("layersIncompositionText").style.fontSize = "15px";
			document.getElementById("grabcutMasking").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if(language_country === "uk_ua" || language_country === "uk"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "13px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}
		


	}

	// JSS specific to iPhone iPhone iPhoneX
	x = window.matchMedia("(device-width:375px) and (device-height:812px) and (orientation:portrait)")
	if (x.matches){
		if (language_country === "ja_jp" || language_country === "ja"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesAbout").style.fontSize = "10px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "10px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "10px";
			document.getElementById("replaceEyeAbout").style.fontSize = "10px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "10px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "10px";
			document.getElementById("collageThemesAbout").style.fontSize = "10px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "10px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "10px";
			document.getElementById("infinteContentAbout").style.fontSize = "10px";
			document.getElementById("restore").style.fontSize = "10px";
			document.getElementById("manyMoreText").style.fontSize = "10px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "14px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
		}

		else if (language_country === "de_de" || language_country === "de"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "12px";
		}

		else if (language_country === "es_es" || language_country === "pl_pl" || language_country === "fr_fr" || language_country === "es_mx" || language_country === "fr_ca"
			|| language_country === "es" || language_country === "pl" || language_country === "fr" || 
			language_country === "id_id" || language_country === "cs_cz" || language_country === "nl_nl" || language_country === "pt_br" || language_country === "ph_ph"
			|| language_country === "id" || language_country === "cs" || language_country === "nl" || language_country === "pt" || language_country === "ph_ph"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "nb_no" || language_country === "nb"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesText").style.fontSize = "15px";
			document.getElementById("selectiveEditingText").style.fontSize = "15px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "15px";
			document.getElementById("replaceEyeText").style.fontSize = "15px";
			document.getElementById("layersIncompositionText").style.fontSize = "15px";
			document.getElementById("grabcutMasking").style.fontSize = "15px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById('yearlyMonthlyPrice').style.fontSize = "13px";
			document.getElementById('discountedPercentage').style.fontSize = "12px";
			document.getElementById('yearlyAmount').style.fontSize = "13px";
			document.getElementById('product_monthly').style.fontSize = "13px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "pl_pl" || language_country=== "el_gr" || language_country === "pl" || language_country === "el"){
			document.getElementById("premiumText").style.fontSize = "14px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "14px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "ru_ru" || language_country === "tr_tr" || language_country === "ru" || language_country === "tr"){
			document.getElementById("premiumText").style.fontSize = "15px";
			document.getElementById("editorThemesText").style.fontSize = "15px";
			document.getElementById("selectiveEditingText").style.fontSize = "15px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "15px";
			document.getElementById("replaceEyeText").style.fontSize = "15px";
			document.getElementById("layersIncompositionText").style.fontSize = "15px";
			document.getElementById("grabcutMasking").style.fontSize = "15px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if(language_country === "uk_ua" || language_country === "uk"){
			document.getElementById("premiumText").style.fontSize = "14px";
			document.getElementById("editorThemesText").style.fontSize = "12px";
			document.getElementById("selectiveEditingText").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "12px";
			document.getElementById("replaceEyeText").style.fontSize = "12px";
			document.getElementById("layersIncompositionText").style.fontSize = "12px";
			document.getElementById("grabcutMasking").style.fontSize = "12px";
			document.getElementById("collageThemesText").style.fontSize = "12px";
			document.getElementById("scrapBookCollageText").style.fontSize = "12px";
			document.getElementById("creativeCameraEdits").style.fontSize = "11px";
			document.getElementById("infinteContentText").style.fontSize = "12px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "12px";
		}

		if (language_country === "nb_no" || language_country === "nb" || language_country ==="ru_ru" || language_country === "ru"){
			document.getElementById('yearlyMonthlyPrice').style.fontSize = "13px";
			document.getElementById('discountedPercentage').style.fontSize = "13px";
			document.getElementById('yearlyAmount').style.fontSize = "13px";
			document.getElementById('product_monthly').style.fontSize = "13px";
		}

	}

	// JSS specific to iPhone iPhone iPhone XS Max/XR portrait
	x = window.matchMedia("(device-width:414px) and (device-height:896px) and (orientation:portrait)")
	if (x.matches){
		if (language_country === "ja_jp" || language_country === "ja"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("restore").style.fontSize = "11px";
			document.getElementById("editorThemesAbout").style.fontSize = "11px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "11px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "11px";
			document.getElementById("replaceEyeAbout").style.fontSize = "11px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "11px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "11px";
			document.getElementById("collageThemesAbout").style.fontSize = "11px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "11px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "11px";
			document.getElementById("infinteContentAbout").style.fontSize = "11px";
			document.getElementById("manyMoreText").style.fontSize = "11px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
			document.getElementById("editorText1").style.fontSize = "8px";
			document.getElementById("editorText2").style.fontSize = "8px";
			document.getElementById("editorText3").style.fontSize = "8px";
			document.getElementById("editorText4").style.fontSize = "8px";
		}

		else if (language_country === "es_es" || language_country === "es" || language_country === "es_mx"){
			document.getElementById("premiumText").style.fontSize = "19px";
			document.getElementById("editorThemesAbout").style.fontSize = "13px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "13px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "13px";
			document.getElementById("replaceEyeAbout").style.fontSize = "13px";
			document.getElementById("collageThemesAbout").style.fontSize = "13px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "13px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "13px";
			document.getElementById("infinteContentAbout").style.fontSize = "13px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "13px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "13px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if (language_country === "fr_fr" || language_country === "fr" || language_country === "fr_ca"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "16px";
			document.getElementById("scrapBookCollageText").style.fontSize = "16px";
			document.getElementById("creativeCameraEdits").style.fontSize = "16px";
			document.getElementById("infinteContentText").style.fontSize = "16px";
			document.getElementById("layersIncompositionText").style.fontSize = "16px";
			document.getElementById("grabcutMasking").style.fontSize = "16px";
		}

		else if (language_country === "id_id" || language_country === "id"){
			document.getElementById("premiumText").style.fontSize = "19px";
			document.getElementById("editorThemesText").style.fontSize = "17px";
			document.getElementById("selectiveEditingText").style.fontSize = "17px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "17px";
			document.getElementById("replaceEyeText").style.fontSize = "17px";
			document.getElementById("collageThemesText").style.fontSize = "17px";
			document.getElementById("scrapBookCollageText").style.fontSize = "17px";
			document.getElementById("creativeCameraEdits").style.fontSize = "17px";
			document.getElementById("infinteContentText").style.fontSize = "17px";
			document.getElementById("layersIncompositionText").style.fontSize = "17px";
			document.getElementById("grabcutMasking").style.fontSize = "17px";
		}

		else if (language_country === "nb_no" || language_country === "pl_pl" || language_country === "cs_cz"
			|| language_country === "nb" || language_country === "pl" || language_country === "cs"
			 || language_country === "ru_ru" || language_country === "tr_tr" || language_country === "el_gr" || language_country === "ph_ph"
			 || language_country === "ru" || language_country === "tr" || language_country === "el" || language_country === "ph_ph"){
			document.getElementById("premiumText").style.fontSize = "17px";
			document.getElementById("editorThemesText").style.fontSize = "16px";
			document.getElementById("selectiveEditingText").style.fontSize = "16px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "16px";
			document.getElementById("replaceEyeText").style.fontSize = "16px";
			document.getElementById("collageThemesText").style.fontSize = "15px";
			document.getElementById("scrapBookCollageText").style.fontSize = "15px";
			document.getElementById("creativeCameraEdits").style.fontSize = "15px";
			document.getElementById("infinteContentText").style.fontSize = "15px";
			document.getElementById("layersIncompositionText").style.fontSize = "15px";
			document.getElementById("grabcutMasking").style.fontSize = "15px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}

		else if(language_country === "uk_ua" || language_country === "uk"){
			document.getElementById("premiumText").style.fontSize = "16px";
			document.getElementById("editorThemesText").style.fontSize = "14px";
			document.getElementById("selectiveEditingText").style.fontSize = "14px";
			document.getElementById("advancedSpotHealingText").style.fontSize = "14px";
			document.getElementById("replaceEyeText").style.fontSize = "14px";
			document.getElementById("layersIncompositionText").style.fontSize = "14px";
			document.getElementById("grabcutMasking").style.fontSize = "14px";
			document.getElementById("collageThemesText").style.fontSize = "14px";
			document.getElementById("scrapBookCollageText").style.fontSize = "14px";
			document.getElementById("creativeCameraEdits").style.fontSize = "13px";
			document.getElementById("infinteContentText").style.fontSize = "14px";
			document.getElementById("editorThemesAbout").style.fontSize = "12px";
			document.getElementById("selectiveEditingAbout").style.fontSize = "12px";
			document.getElementById("advancedSpotHealingAbout").style.fontSize = "12px";
			document.getElementById("replaceEyeAbout").style.fontSize = "12px";
			document.getElementById("collageThemesAbout").style.fontSize = "12px";
			document.getElementById("scrapBookCollageAbout").style.fontSize = "12px";
			document.getElementById("creativeCameraEditsAbout").style.fontSize = "12px";
			document.getElementById("infinteContentAbout").style.fontSize = "12px";
			document.getElementById("layersIncompositionAbout").style.fontSize = "12px";
			document.getElementById("grabcutMaskingAbout").style.fontSize = "12px";
			document.getElementById("manyMoreText").style.fontSize = "13px";
		}
	}

	if(language_country === "ko_kr" || language_country === "ja_jp" || language_country === "zh_cn" ||  language_country === "ko" || language_country === "ja" 
		|| language_country === "zh_tw" || language_country === "zh" || language_country === "zh_hans" || language_country === "zh_hant"){
		document.getElementById("editorText1").style.fontSize = "10px";
		document.getElementById("editorText1").style.paddingTop = "3px";
		document.getElementById("editorText1").style.paddingBottom = "3px";
		document.getElementById("editorText2").style.fontSize = "10px";
		document.getElementById("editorText2").style.paddingTop = "3px";
		document.getElementById("editorText2").style.paddingBottom = "3px";
		document.getElementById("editorText3").style.fontSize = "10px";
		document.getElementById("editorText3").style.paddingTop = "3px";
		document.getElementById("editorText3").style.paddingBottom = "3px";
		document.getElementById("editorText4").style.fontSize = "10px";
		document.getElementById("editorText4").style.paddingTop = "3px";
		document.getElementById("editorText4").style.paddingBottom = "3px";
		document.getElementById("collageText1").style.fontSize = "10px";
		document.getElementById("collageText1").style.paddingTop = "3px";
		document.getElementById("collageText1").style.paddingBottom = "3px";
		document.getElementById("collageText2").style.fontSize = "10px";
		document.getElementById("collageText2").style.paddingTop = "3px";
		document.getElementById("collageText2").style.paddingBottom = "3px";
		document.getElementById("captureText").style.fontSize = "10px";
		document.getElementById("captureText").style.paddingTop = "3px";
		document.getElementById("captureText").style.paddingBottom = "3px";
		document.getElementById("composeText1").style.fontSize = "10px";
		document.getElementById("composeText1").style.paddingTop = "3px";
		document.getElementById("composeText1").style.paddingBottom = "3px";
		document.getElementById("composeText2").style.fontSize = "10px";
		document.getElementById("composeText2").style.paddingTop = "3px";
		document.getElementById("composeText2").style.paddingBottom = "3px";

	}

	if(language_country === "pl"){
		document.getElementById("button-primary").style.height = 55 + 'px';
	}
}

function handleWidthOverflow(tagId)
{
	document.getElementById(tagId).style.position = "relative";
	document.getElementById(tagId).style.marginLeft = "0px";
	document.getElementById(tagId).style.marginTop = "10px";
	document.getElementById(tagId).style.marginBottom = "10px";
}

function isWidthOverflow(id){
	var d = document.getElementById(id);

	if (d.offsetWidth < d.scrollWidth) {
		return true;
	} else {
	  return false;
	}

}

function processTranslations(_translations) {
	translations = _translations;
	function localizeLabel(labelId) {
		document.getElementById(labelId).innerHTML = translations[labelId];
    }
	var paywall_strings = ['premiumText', 'editorThemesAbout', 'selectiveEditingAbout', 'smootheningAbout', 'smileAbout', 'advancedSpotHealingAbout', 'replaceEyeAbout','grabcutMaskingAbout','layersIncompositionAbout',
 						'collageThemesAbout', 'creativeCameraEditsAbout', 'infinteContentAbout', 'editorThemesText',
						'selectiveEditingText', 'smootheningText', 'smileText', 'advancedSpotHealingText', 'replaceEyeText','grabcutMasking','layersIncompositionText', 'collageThemesText', 'creativeCameraEdits',
						'infinteContentText', 'manyMoreText', 'terms', 'policy' ,'disclaimer'];							
	for (var i = 0; i < paywall_strings.length; i++) {
		localizeLabel(paywall_strings[i]);
	}
	
	document.getElementById('editorText1').innerHTML = translations['EDIT'];
	document.getElementById('editorText2').innerHTML = translations['EDIT'];
	document.getElementById('editorText3').innerHTML = translations['EDIT'];
	document.getElementById('editorText4').innerHTML = translations['EDIT'];
	document.getElementById('collageText1').innerHTML = translations['COLLAGE'];
	document.getElementById('composeText1').innerHTML = translations['COMPOSE'];
	document.getElementById('composeText2').innerHTML = translations['COMPOSE'];
	document.getElementById('captureText').innerHTML = translations['CAPTURE'];
	document.getElementById('smootheningText2').innerHTML = translations['FIX'];
	document.getElementById('smileText2').innerHTML = translations['FIX'];
	document.getElementById('restore').innerHTML = translations['Restore Purchases'];
	document.getElementById('discountBannerCopyTopLabel').innerHTML = translations['heading1'];
	document.getElementById('discountBannerCopyBottomLabel').innerHTML = translations['discountFirstYear'];
	document.getElementById('offerTerms').innerHTML = translations['offerTerms'];
	
	const observer = lozad();
	observer.observe();

	const pictureObserver = lozad('.lozad-picture', {
    	threshold: 0.1
    })

    pictureObserver.observe();
	promiseTranslationResolve();
	if(isWidthOverflow("layersIncompositionTextDiv")){
		handleWidthOverflow("composeText2");
	}
}

function showPremiumFeatures(featureList) {
	
	for(var index = 0; index < featureList.length; index++){
		if(featureList[index].startsWith('composition')){
			document.getElementById('grabcutMaskingDiv').style.display = "block";
			document.getElementById('grabcutMaskingAbout').style.display = "block";
			document.getElementById('grabCutVideo').style.display = "block";
			document.getElementById('layersIncompositionTextDiv').style.display = "block";
			document.getElementById('layersIncompositionAbout').style.display = "block";
			document.getElementById('layersImage').style.display = "block";
			if(isWidthOverflow("layersIncompositionTextDiv")){
				handleWidthOverflow("composeText2");
			}
		}
		else if(featureList[index].startsWith('xcapture')){
			document.getElementById('captureDiv').style.display = "block";
			document.getElementById('creativeCameraEditsAbout').style.display = "block";
			document.getElementById('captureCard').style.display = "block";
		}
		else if(featureList[index].startsWith('fix.skinsmoothening')){
			document.getElementById('smoothContainer').style.display = "block";
			document.getElementById('smilingContainer').style.display = "block";
		}
		else if(featureList[index].startsWith('fix.fal.lips.smile')){
			document.getElementById('smilingContainer').style.display = "block";
		}
	}
}

function cancel() {
	var message =
	{
		"action": "cancel"
	}
	window.webkit.messageHandlers.interOp.postMessage(message);
}

function subscribe() {
	var message =
	{
		"action": "continue",
		"product_id": productIdMap[productflag]
	}
	window.webkit.messageHandlers.interOp.postMessage(message);
}

function restorePurchase() {
	var message =
	{
		"action": "restore_purchase"
	}
	window.webkit.messageHandlers.interOp.postMessage(message);
}

function privacyPolicy() {
	var message =
	{
		"action": "privacy_policy"
	}
	window.webkit.messageHandlers.interOp.postMessage(message);
}

function termsOfUse() {
	var message =
	{
		"action": "terms_of_use"
	}
	window.webkit.messageHandlers.interOp.postMessage(message);
}

function onOfferTermsTap() 
{
    var message =
    {
        "action": "offer_terms"
    }
    window.webkit.messageHandlers.interOp.postMessage(message);
}

function paywall_scroll_performed() {
	if (document.getElementById('container').scrollTop >= MIN_SCROLL_DISTANCE) {
		document.getElementById("scrollGifContainer").style.display = 'none';
	}
	if (scrollFlag === 'YES') {
		scrollFlag = 'NO';
		var message =
		{
			"action": "paywall_scroll_performed"
		}

		window.webkit.messageHandlers.interOp.postMessage(message);
	}
}

function adjustScrollIndicator() {
	var footerHeight = document.getElementById("container1").offsetHeight;
	document.getElementById('scrollGifContainer').style.bottom = footerHeight + 'px';
}

function changeRadioImage(productInfo){

	if(masterProductInfoList.length == 2){

		if (productInfo === 'yearly') {
			document.getElementById("yearlySection").src = "resources/Radio_blue.png";
			document.getElementById("monthlySection").src = "resources/Radio_black.png";
			document.getElementById('yearlyBorder').style.borderStyle = "solid";
			document.getElementById('yearlyBorder').style.backgroundColor = "#1A1A1A";
	    	document.getElementById('monthlyBorder').style.borderStyle = "none";
	    	document.getElementById('monthlyBorder').style.backgroundColor = "#1E1E1E";
	    	var updateButtonText = buttonText;
			document.getElementById("button-primary").innerHTML = updateButtonText.bold();
			productflag = 'product_yearly'

			if (masterProductInfoList[0].spikeProduct === 1) {
				document.getElementById("button-primary").innerHTML = translations['buttonPrimary2'].bold();
				document.getElementById("disclaimer").innerHTML = translations['yearlyPlanBottomDisclaimer'];
			}
			
		}
		else if (productInfo === 'monthly'){
			document.getElementById("monthlySection").src = "resources/Radio_blue.png";
			document.getElementById("yearlySection").src = "resources/Radio_black.png";
			document.getElementById('monthlyBorder').style.borderStyle = "solid";
			document.getElementById('monthlyBorder').style.backgroundColor = "#1A1A1A";
			document.getElementById('yearlyBorder').style.borderStyle = "none";
			document.getElementById('yearlyBorder').style.backgroundColor = "#1E1E1E";
			var updateButtonText = translations['Continue'];
			document.getElementById("button-primary").innerHTML = updateButtonText.bold();
			productflag = 'product_monthly';

			if (masterProductInfoList[0].spikeProduct === 1) {
				document.getElementById("button-primary").innerHTML = translations['buttonPrimary2'].bold();
				document.getElementById("disclaimer").innerHTML = translations['monthlyPlanBottomDisclaimer'];
			}
		}
	}

	setContainerHeight();
}

function updateProductInfo(info) {
	masterProductInfoList.push(info);
	updateUIBasedOnProductInfo(masterProductInfoList);
}

function formatPriceUsingCurrencyCode(price, currencyCode){
	return Intl.NumberFormat(language, { style: 'currency', currency: currencyCode}).format(price);
}

function computeContainerHeightWithOrWithoutContainer2(shouldCalculateHeightWithContainer2)
{
	if (shouldCalculateHeightWithContainer2)
	{
		return window.innerHeight - document.getElementById("container1").clientHeight - document.getElementById("container2").clientHeight;
	}
	else
	{
		return window.innerHeight - document.getElementById("container1").clientHeight;
	}
}

function setContainerHeight()
{
	var iPhoneXResolution = window.matchMedia("(device-width:375px) and (device-height:812px) and (orientation:portrait)")
	var iPhoneXSMaxResolution = window.matchMedia("(device-width:414px) and (device-height:896px) and (orientation:portrait)")

	
	if (iPhoneXResolution.matches)
	{
		document.getElementById("container").style.height = (computeContainerHeightWithOrWithoutContainer2(false) - 8) + 'px';
	}
	else if (iPhoneXSMaxResolution.matches)
	{
		document.getElementById("container").style.height = (computeContainerHeightWithOrWithoutContainer2(false) - 5) + 'px';
	}
	else
	{
		document.getElementById("container").style.height = computeContainerHeightWithOrWithoutContainer2(false) + 'px';
	}
}

function updateContainerUIForSpikeProduct(product, product_type) {

	var elementBorder;
	if (product_type === "monthly") {
		elementBorder = document.getElementById("monthlyBorder");
	}
	else {

		elementBorder = document.getElementById("yearlyBorder");
		
		discountYearlyPercentage = Math.floor(((((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)).toFixed(2)) * 100));
		document.getElementById("discountPercentageLabel").innerHTML = translations['bannerDiscountPercentage'].replace("$DISCOUNT$", discountYearlyPercentage);

		var formattedYearlyPrice = formatPriceUsingCurrencyCode(product.price, product.currencyCode);
		var nextYearPriceString = translations['nextYearPriceString'].replace("$PRICE$", formattedYearlyPrice);
		nextYearPriceString = nextYearPriceString + "&lrm;"
		document.getElementById("discountedPercentage").innerHTML = nextYearPriceString;

		var formattedDiscountedPrice = formatPriceUsingCurrencyCode(parseFloat(product.discountPrice), product.currencyCode);
		var discountedPriceString = translations['discountedPriceString'].replace("$DISCOUNTED_PRICE$", formattedDiscountedPrice).bold();
		discountedPriceString = discountedPriceString + "&lrm;"
		document.getElementById("yearlyMonthlyPrice").innerHTML = discountedPriceString;
	}

	elementBorder.style.display = "flex";
	elementBorder.style.alignItems = "center";

	document.getElementById("radioImage1").style.marginRight = 10 + "px";
	document.getElementById("radioImage2").style.marginRight = 10 + "px";

}

function updateUIBasedOnProductInfo(productInfoList){
	productInfoList = [...productInfoList];

	promiseTranslation.then(() => {
		
		document.getElementById('button-primary').disabled = false;
		var monthlydiscountedPrice;

		if (productInfoList.length == 1){

			document.getElementById("unlockPremiumText").style.display = "block";
			productIdMap[productInfoList[0].productPeriod] = productInfoList[0].productId;

			buttonText = translations['Continue'];
			document.getElementById("button-primary").innerHTML = buttonText.bold();

			if (productInfoList[0].productPeriod === "product_monthly"){
				
				if (language === 'ru-ru' || language === 'ru'){
					var priceArray = productInfoList[0].formattedPrice.split(" ");
					var priceInfo = priceArray[0];
					var bottomFreeText = translations['GetTrialText'].replace("$PRICE$", priceInfo.bold()).replace("$SUBSCRIPTION_PERIOD$",priceArray[2].bold()).replace("$TRIAL_PERIOD$",productInfoList[0].freeTrial.bold());
					document.getElementById("monthlySingleProductLabel").innerHTML = bottomFreeText;
				}
				else if (language === 'tr-tr' || language === 'tr'){
					var priceArray = productInfoList[0].formattedPrice.split(" ");
					var priceInfo = priceArray[1];
					var bottomFreeText = translations['GetTrialText'].replace("$PRICE$", priceInfo.bold()).replace("$SUBSCRIPTION_PERIOD$",priceArray[0].bold()).replace("$TRIAL_PERIOD$",productInfoList[0].freeTrial.bold());
					document.getElementById("monthlySingleProductLabel").innerHTML = bottomFreeText;
				}

				else if (language === 'zh-tw' || language === 'zh' || language === 'zh-hant'){
					
					var priceArray = productInfoList[0].formattedPrice.split(" ");
					var priceInfo = priceArray[1];
					var bottomFreeText = translations['GetTrialText'].replace("$PRICE$", priceInfo.bold()).replace("$SUBSCRIPTION_PERIOD$",priceArray[0].bold()).replace("$TRIAL_PERIOD$",productInfoList[0].freeTrial.bold());
					document.getElementById("monthlySingleProductLabel").innerHTML = bottomFreeText;
				}

				else{
					var priceArray = productInfoList[0].formattedPrice.split("/");
					var priceInfo = priceArray[0];
					var bottomFreeText = translations['GetTrialText'].replace("$PRICE$", priceInfo.bold()).replace("$SUBSCRIPTION_PERIOD$",priceArray[1].bold()).replace("$TRIAL_PERIOD$",productInfoList[0].freeTrial.bold());
					document.getElementById("monthlySingleProductLabel").innerHTML = bottomFreeText;
				}

				document.getElementById("monthlySingleProduct").style.display = "block";
				productflag = 'product_monthly';
				buttonText = translations['Unlock Premium'];
				document.getElementById("button-primary").innerHTML = buttonText.bold();
			}

			else if(productInfoList[0].productPeriod === "product_yearly"){
				document.getElementById('yearlySingleProductLabel').innerHTML = productInfoList[0].formattedPrice.bold();
				monthlydiscountedPrice = formatPriceUsingCurrencyCode((parseFloat(productInfoList[0].price)/12).toFixed(2), productInfoList[0].currencyCode);			
				document.getElementById('yearlySingleProductMonthlyPrice').innerHTML = translations['yearlySingleProductMonthlyPrice'].replace("$DICOUNTEDPRICE$", monthlydiscountedPrice);
				document.getElementById("yearlySingleProduct").style.display = "block";
				productflag = 'product_yearly';
			}
		}

		else if(productInfoList.length == 2){
			var monthlyText = '';
			var discountPercentage = '';
			var monthlyPrice = '';
			

			document.getElementById("unlockPremiumText").style.display = "none";
			document.getElementById("yearlySingleProduct").style.display = "none";
			document.getElementById("monthlySingleProduct").style.display = "none";
			
			productflag = 'product_yearly';

			for (var i = productInfoList.length - 1; i >= 0; i--) {

				document.getElementById("unlockPremiumLabel").style.display = "none";

	   			productIdMap[productInfoList[i].productPeriod] = productInfoList[i].productId;

				if (productInfoList[i].productPeriod === "product_monthly"){
					monthlyPrice = productInfoList[i].price;
					monthlyText = translations['monthlyPlan'].replace("$PRICE$", formatPriceUsingCurrencyCode(monthlyPrice,productInfoList[i].currencyCode));
					document.getElementById("product_monthly").innerHTML = monthlyText.bold();

					if (productInfoList[i].spikeProduct === 1) {
						updateContainerUIForSpikeProduct(productInfoList[i],"monthly")
					}
					else {
						document.getElementById("monthlyBorder").style.display = "block";
						document.getElementById("discountedPercentage").style.marginLeft = 5 + "px";
					}
				}

				else if (productInfoList[i].productPeriod === "product_yearly") {

					if (productInfoList[i].spikeProduct === 1) {
						updateContainerUIForSpikeProduct(productInfoList[i],"yearly")
					}
					else {

						document.getElementById("yearlyBorder").style.display = "block";

						document.getElementById("yearlySection").style.position = "relative";
						document.getElementById("yearlySection").style.bottom = 7 + "px";

						document.getElementById("discountedPercentage").style.marginLeft = 5 + "px";
						document.getElementById("product_yearly").style.marginLeft = 5 + "px";

						var trialString = translations['firstthreedays'].replace("$TRIAL_PERIOD$", productInfoList[i].freeTrial);
						var updatedString = trialString.toUpperCase();
						document.getElementById("firstthreedays").innerHTML = updatedString;

						if (!(productInfoList[i].hasOwnProperty("freeTrial")) || productInfoList[i].freeTrial === "") {
							buttonText = translations['Continue'];
						}
						else if (productInfoList[i].hasOwnProperty("discountPrice")) {
							buttonText = translations['Continue'];
						}
						else {
							buttonText = translations['buttonPrimary'].replace("$TRIAL_PERIOD$", productInfoList[i].freeTrial);
						}

						document.getElementById("button-primary").innerHTML = buttonText.bold();
						monthlydiscountedPrice = (parseFloat(productInfoList[i].price) / 12).toFixed(2);
						var formattedMonthlydiscountedPrice = formatPriceUsingCurrencyCode(monthlydiscountedPrice, productInfoList[i].currencyCode);

						document.getElementById("yearlyMonthlyPrice").innerHTML = translations['yearlyPlan'].replace("$DICOUNTEDPRICE$", formattedMonthlydiscountedPrice).bold();

						var formattedYearlyPrice = formatPriceUsingCurrencyCode(productInfoList[i].price, productInfoList[i].currencyCode);
						var yearlyAmount = translations['totalYearlyPrice'].replace("$PRICE$", formattedYearlyPrice);
						yearlyAmount = yearlyAmount + "&lrm;";
						document.getElementById("product_yearly").innerHTML = yearlyAmount.bold();

					}
				}

				if (productInfoList[i].spikeProduct === 1) {
					document.getElementById("totalAmount").style.display = "none";
					document.getElementById("discountBanner").style.display = "block";
					document.getElementById("button-primary").innerHTML = translations['buttonPrimary2'].bold();
					document.getElementById("disclaimer").style.color = "#C8C8C8";
					document.getElementById("disclaimer").style.paddingLeft = "30px";
					document.getElementById("disclaimer").style.paddingRight = "30px";
					document.getElementById('disclaimer').innerHTML = translations['yearlyPlanBottomDisclaimer'];
				}
				else {
					discountPercentage = Math.floor(((((parseFloat(monthlyPrice) - parseFloat(monthlydiscountedPrice)) / parseFloat(monthlyPrice)).toFixed(2)) * 100));
					document.getElementById("discountedPercentage").innerHTML = translations['discountPercentage'].replace("$DISCOUNT$", discountPercentage);
				}
			}
	}

		setContainerHeight();

		if (language_country === 'ru_ru' || language_country === 'fr_fr' || language_country === 'fr_ca' || language_country === 'id_id'){
			document.getElementById("button-primary").style.fontSize = "14px";
		}
		if (!isiPad && language_country === 'uk_ua')
		{
			document.getElementById("product_yearly").style.marginTop = "2px";
			document.getElementById("product_yearly").style.top = "10%";
		}
		if (isiPad)
		{
			if ((language_country === 'pt_br' || language_country === 'fi_fi'))
			{
				document.getElementById("product_yearly").style.marginTop = "2px";
				document.getElementById("product_yearly").style.top = "10%";
			}
			else if (language_country === 'uk_ua')
			{
				document.getElementById("product_yearly").style.marginTop = "0px";
				document.getElementById("product_yearly").style.top = "8%";
			}
		}
		adjustScrollIndicator()
	})
}


