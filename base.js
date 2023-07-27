var productIdMap = {};

var masterProductInfoList = [];
var firstthreedays = "";
var buttonText = "";
var footerText = "";
var priceArrayMonthly = "";
var priceArrayYealy = "";
var discountedAmount = "";
var productflag = "product_yearly";
var kkishitaxoxo = {};
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
	if(language_country == 'en_us')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "GET PREMIUM FREE FOR THE FIRST $TRIAL_PERIOD$",
			"EDIT": "EDIT",
			"COMPOSE": "MIX",
			"FIX": "RETOUCH",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Editor Themes",
			"editorThemesAbout": "Get inspired with stunning themes, letting you create a masterpiece in a single tap. Personalize your work with texts, stickers, borders & looks.",
			"selectiveEditingText": "Selective Editing",
			"smootheningText": "Smooth Skin",
			"smileText": "Smile",
			"selectiveEditingAbout": "Edit a specific section of an image. Auto object selection makes it easy to modify and create unique effects.",
			"smootheningAbout": "Authentic & natural skin smoothing",
			"smileAbout": "Missed a smile in a photo. No worries, add it now.",
			"advancedSpotHealingText": "Advanced Healing",
			"advancedSpotHealingAbout": "Quickly remove or clone part of an image. Perfect the imperfections with advanced options.",
			"replaceEyeText": "Replace Eyes",
			"replaceEyeAbout": "Have someone blink in a photo? Use this to open closed eyes to create the perfect shot.",
			"grabcutMasking": "Auto Selection",
			"grabcutMaskingAbout": "Create automatic cut-outs and customize as you need.",
			"layersIncompositionText": "Cut out, Combine, Create",
			"layersIncompositionAbout": "Create a masterpiece using layer editing and selection tools.",
			"collageThemesText": "Collage Themes",
			"collageThemesAbout": "Unlock stunning collage themes. Personalize your collage with stickers, borders, layouts, stylish texts, unique effects, and more!",
			"scrapBookCollageText": "Cutout Collage",
			"scrapBookCollageAbout": "Create visually striking collages with a single tap. Stylize with strokes, text, borders, backgrounds, and more.",
			"creativeCameraEdits": "Camera Effects",
			"creativeCameraEditsAbout": "Capture creative photos with live filters, realistic tattoos & artistic effects.",
			"infinteContentText": "Unlock All Premium Content",
			"infinteContentAbout": "Get creative with full access to creative contents with blending looks, hundreds of layouts, fun stickers, borders, backgrounds, texts and more!",
			"manyMoreText": "...and many more creative features",
			"buttonPrimary": "Continue with $TRIAL_PERIOD$ free",
			"buttonPrimary2": "Agree and Subscribe",
			"Continue":"Continue",
			"RestorePurchases": "Restore Purchases",
			"GetTrialText": "Get $TRIAL_PERIOD$ FREE, then $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Payment will be charged to iTunes Account at confirmation of purchase. Subscription automatically renews unless auto-renew off at least 24-hours before the end of the current period. Your account will be charged for renewal within 24-hours prior to the end of the current period. Your account will be charged $PRICE$ / $SUBSCRIPTION_PERIOD$ for renewal within 24 hours prior to the end of the current period. You can manage or turn off auto renew in your Apple ID Account Settings any time after purchase.",
			"terms": "Terms of use",
			"policy": "Privacy Policy",
			"yearlyPlan":"12 Months: $DICOUNTEDPRICE$/mo",
			"monthlyPlan":"1 Month: $PRICE$/mo",
			"discountPercentage":"Save $DISCOUNT$% per year",
			"totalYearlyPrice":"Total $PRICE$",
			"disclaimer":"No Commitment. Cancel Anytime",
			"monthlyPlanBottomDisclaimer":"No commitment. You’ll be charged monthly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"yearlyPlanBottomDisclaimer": "You’ll be charged yearly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"unlockPremiumText":"Unlock Premium features and content.",
			"yearlySingleProduct":"$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice":"($DICOUNTEDPRICE$/mo)",
			"UnlockPremium": "Unlock Premium",
			"heading1" : "OFFER ENDS 15TH NOV",
			"discountFirstYear" : "DISCOUNT FOR 1ST YEAR",
			"offerTerms" : "See offer terms",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString":"$DISCOUNTED_PRICE$ for 1st year",
			"nextYearPriceString":"Then $PRICE$ from next year onwards."
		};
	}
	else if(language_country == 'cs_cz')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "ZÍSKEJTE VERZI PREMIUM ZDARMA NA DOBU PRVNÍCH $TRIAL_PERIOD$",
			"EDIT": "UPRAVIT",
			"COMPOSE": "MIX",
			"FIX": "RETUŠOVAT",
			"COLLAGE": "KOLÁŽ",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Motivy editoru",
			"editorThemesAbout": "Nechte se inspirovat úžasnými motivy, které vám umožní vytvářet mistrovská díla jediným klepnutím. Upravte svůj výtvor s využitím textů, nálepek, okrajů a vzhledů.",
			"selectiveEditingText": "Selektivní úpravy",
			"smootheningText": "Vyhlazení pleti",
			"smileText": "Úsměv",
			"selectiveEditingAbout": "Upravujte konkrétní části obrazu. Automatický výběr objektů zjednodušuje úpravu a vytváření jedinečných efektů.",
			"smootheningAbout": "Autentické a přirozené vyhlazení pleti",
			"smileAbout": "Chybí vám na fotografii úsměv? Žádné obavy, přidejte jej nyní.",
			"advancedSpotHealingText": "Pokročilé zacelení",
			"advancedSpotHealingAbout": "Rychle odeberte nebo klonujte část obrazu. Využijte rozšířené možnosti a opravte nedokonalosti.",
			"replaceEyeText": "Nahrazení očí",
			"replaceEyeAbout": "Někdo při focení mrknul? Použijte tento nástroj k otevření zavřených oči a vytvořte dokonalý snímek.",
			"grabcutMasking": "Automatický výběr",
			"grabcutMaskingAbout": "Vytvářejte automatické výřezy a přizpůsobte si je podle sebe.",
			"layersIncompositionText": "Vystřihněte, zkombinujte, vytvořte",
			"layersIncompositionAbout": "Vytvořte mistrovské dílo pomocí nástrojů pro úpravu a výběr vrstev.",
			"collageThemesText": "Motivy koláží",
			"collageThemesAbout": "Vyzkoušejte úžasné motivy koláží. Upravte svou koláž s využitím nálepek, okrajů, rozvržení, moderních textů, jedinečných efektů a dalších prvků.",
			"scrapBookCollageText": "Koláž z výstřižků",
			"scrapBookCollageAbout": "Vytvářejte vizuálně působivé koláže jediným klepnutím. Při úpravě stylu využijte tahy, text, okraje, pozadí a další prvky.",
			"creativeCameraEdits": "Fotografické efekty",
			"creativeCameraEditsAbout": "Pořizujte kreativní fotografie s využitím živých filtrů, realistických tetování a uměleckých efektů.",
			"infinteContentText": "Získejte celý obsah verze Premium",
			"infinteContentAbout": "Buďte kreativní díky neomezenému přístupu ke kreativnímu obsahu s rozmanitými vzhledy, stovkami rozvržení, zábavnými nálepkami, okraji, pozadími, texty a řadou dalších prvků.",
			"manyMoreText": "...a mnoho dalších kreativních funkcí",
			"buttonPrimary": "Pokračovat zdarma po dobu $TRIAL_PERIOD$",
			"buttonPrimary2": "Souhlasím, koupit předplatné",
			"Continue": "Pokračovat",
			"RestorePurchases": "Obnovit nákupy",
			"GetTrialText": "Získejte aplikaci na dobu $TRIAL_PERIOD$ ZDARMA, potom za $PRICE$ na $SUBSCRIPTION_PERIOD$",
			"footerText": "Po potvrzení nákupu bude platba stržena z účtu služby iTunes. Pokud alespoň 24 hodin před koncem aktuálního období nevypnete funkci automatického obnovení, bude předplatné automaticky obnoveno. Platba za obnovení bude z vašeho účtu stržena maximálně 24 hodin před koncem aktuálního období. Platba za obnovení ve výši $PRICE$ / $SUBSCRIPTION_PERIOD$ bude z vašeho účtu stržena maximálně 24 hodin před koncem aktuálního období. Funkci automatického obnovení můžete kdykoli po nákupu spravovat nebo ji vypnout v nastavení účtu Apple ID.",
			"terms": "Podmínky použití",
			"policy": "Zásady ochrany osobních údajů",
			"yearlyPlan": "12 měsíců: $DICOUNTEDPRICE$/měsíc",
			"monthlyPlan": "1 měsíc: $PRICE$/měsíc",
			"discountPercentage": "Ušetřete $DISCOUNT$ % za rok",
			"totalYearlyPrice": "Celkem $PRICE$",
			"disclaimer": "Žádný závazek. Lze kdykoli zrušit",
			"monthlyPlanBottomDisclaimer": "S předplatným nejsou spjaty žádné závazky. Poplatek za předplatné vám bude účtován každý měsíc do doby, dokud je nezrušíte. Předplatné můžete zrušit kdykoli v nastavení účtu Apple ID.",
			"yearlyPlanBottomDisclaimer": "Poplatek za předplatné vám bude účtován každý rok do doby, dokud je nezrušíte. Předplatné můžete zrušit kdykoli v nastavení účtu Apple ID.",
			"unlockPremiumText": "Zpřístupněte funkce a obsah verze Premium.",
			"yearlySingleProduct": "$PRICE$ na dobu $SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/měsíc)",
			"UnlockPremium": "Získat verzi Premium",
			"heading1": "NABÍDKA KONČÍ 15. LISTOPADU",
			"discountFirstYear": "SLEVA ZA PRVNÍ ROK",
			"offerTerms": "Zobrazit podmínky nabídky",
			"bannerDiscountPercentage": "$DISCOUNT$ %",
			"discountedPriceString": "$DISCOUNTED_PRICE$ za první rok",
			"nextYearPriceString": "Od dalšího roku za $PRICE$"
		};
	}
	else if(language_country == 'da_dk')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "FÅ PREMIUM GRATIS I $TRIAL_PERIOD$",
			"EDIT": "REDIGER",
			"COMPOSE": "MIX",
			"FIX": "RETOUCHER",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "PERFEKTE FOTOS",
			"editorThemesText": "Editortemaer",
			"editorThemesAbout": "Bliv inspireret med pragtfulde temaer, så du kan skabe et mesterværk med blot et enkelt klik. Sæt dit personlige præg på værket med tekster, klistermærker, rammer og filtre.",
			"selectiveEditingText": "Selektiv redigering",
			"smootheningText": "Udglat hud",
			"smileText": "Smil",
			"selectiveEditingAbout": "Rediger et bestemt udsnit af et billede. Automatisk objektvalg gør det nemt at ændre og skabe unikke effekter.",
			"smootheningAbout": "Autentisk og naturlig udjævning af huden",
			"smileAbout": "Var der en, som ikke smilede i et billede. Intet problem, tilføj smilet nu.",
			"advancedSpotHealingText": "Avanceret reparation",
			"advancedSpotHealingAbout": "Fjern eller klon hurtigt en del af et billede. Gør billedet helt perfekt med avancerede indstillinger.",
			"replaceEyeText": "Rediger øjne",
			"replaceEyeAbout": "Kom nogen til at blinke, da du tog billedet? Brug funktionen til at åbne lukkede øjne, så du får det perfekte billede.",
			"grabcutMasking": "Automatisk valg",
			"grabcutMaskingAbout": "Opret automatisk udskæringer og tilpas efter behov.",
			"layersIncompositionText": "Klip ud, kombiner, skab",
			"layersIncompositionAbout": "Opret et mesterværk ved hjælp af lagredigering og markeringsværktøjer.",
			"collageThemesText": "Collagetemaer",
			"collageThemesAbout": "Lås op for fantastiske collagetemaer. Gør din collage personlig med klistermærker, rammer, layout, stilfulde tekster, unikke effekter og meget mere!",
			"scrapBookCollageText": "Fritlægningscollage",
			"scrapBookCollageAbout": "Skab utroligt flotte collager med blot et enkelt tryk. Tilpas med streger, tekst, rammer, baggrunde og meget mere.",
			"creativeCameraEdits": "Kameraeffekter",
			"creativeCameraEditsAbout": "Tag kreative fotos med filtre, realistiske tatoveringer og kunstneriske effekter.",
			"infinteContentText": "Lås op for alt Premium-indhold",
			"infinteContentAbout": "Vær kreativ med fuld adgang til kreativt indhold som blandingsfiltre, hundredvis af layout, sjove klistermærker, rammer, baggrunde, tekster og meget mere!",
			"manyMoreText": "... og mange andre kreative funktioner",
			"buttonPrimary": "Fortsæt med $TRIAL_PERIOD$ gratis",
			"buttonPrimary2": "Acceptér, og tegn abonnement",
			"Continue": "Fortsæt",
			"RestorePurchases": "Gendan køb",
			"GetTrialText": "Få $TRIAL_PERIOD$ GRATIS, derefter $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Beløbet opkræves på din iTunes-konto, når du bekræfter købet. Abonnementet fornys automatisk, medmindre automatisk fornyelse deaktiveres mindst 24 timer før den indeværende periodes udløb. Betalingen for næste abonnementsperiode trækkes inden for 24 timer inden udløbet af den indeværende abonnementsperiode. Der opkræves $PRICE$/$SUBSCRIPTION_PERIOD$ for fornyelse inden for 24 timer før udløbet af den indeværende periode. Du kan administrere eller deaktivere den automatiske fornyelse via kontoindstillingerne for dit Apple-id når som helst efter købet.",
			"terms": "Vilkår for brug",
			"policy": "Privatlivspolitik",
			"yearlyPlan": "12 måneder: $DICOUNTEDPRICE$/måned",
			"monthlyPlan": "1 måned: $PRICE$/måned",
			"discountPercentage": "Spar $DISCOUNT$% om året",
			"totalYearlyPrice": "I alt $PRICE$",
			"disclaimer": "Uden binding. Annuller når som helst",
			"monthlyPlanBottomDisclaimer": "Uden binding. Du faktureres månedligt, indtil du opsiger abonnementet. Abonnementet kan opsiges når som helst via dit Apple ID",
			"yearlyPlanBottomDisclaimer": "Du faktureres årligt, indtil du opsiger abonnementet. Abonnementet kan opsiges når som helst via dit Apple ID",
			"unlockPremiumText": "Lås op for Premium-funktioner og -indhold.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/måned)",
			"UnlockPremium": "Lås op for Premium",
			"heading1": "TILBUDDET GÆLDER TIL D. 15. NOV.",
			"discountFirstYear": "RABAT DET FØRSTE ÅR",
			"offerTerms": "Se tilbudsvilkår",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ for 1. år",
			"nextYearPriceString": "Derefter $PRICE$ fra næste år og frem."
		};
	}
	else if(language_country == 'de_de')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "KOSTENLOSES PREMIUM FÜR DIE ERSTEN $TRIAL_PERIOD$",
			"EDIT": "BEARBEITEN",
			"COMPOSE": "MIX",
			"FIX": "RETUSCHIEREN",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "ERFASSEN",
			"editorThemesText": "Editor-Designs",
			"editorThemesAbout": "Lassen Sie sich von atemberaubenden Designs inspirieren und schaffen Sie mit einem einzigen Tastendruck ein Meisterwerk. Geben Sie Ihren Arbeiten eine persönliche Note – mit Texten, Aufklebern, Rahmen und Looks.",
			"selectiveEditingText": "Selektive Bearbeitung",
			"smootheningText": "Haut glätten",
			"smileText": "Lächeln",
			"selectiveEditingAbout": "Bearbeiten Sie einen bestimmten Bildausschnitt. Die automatische Objektauswahl macht Änderungen sehr einfach und erleichtert das Erzeugen einzigartiger Effekte.",
			"smootheningAbout": "Authentische & natürliche Hautglättung",
			"smileAbout": "Haben Sie ein Lächeln auf einem Foto verpasst? Keine Sorge, fügen Sie es jetzt hinzu.",
			"advancedSpotHealingText": "Erweiterte Korrektur",
			"advancedSpotHealingAbout": "Teile eines Bildes lassen sich schnell entfernen oder klonen. Kleine Makel beseitigen Sie mithilfe der erweiterten Optionen.",
			"replaceEyeText": "Augen ersetzen",
			"replaceEyeAbout": "Hat da etwa jemand geblinzelt? Dann verwenden Sie diese Option, um sozusagen die geschlossenen Augen wieder zu öffnen und aus der Aufnahme doch noch den perfekten Schnappschuss zu machen.",
			"grabcutMasking": "Automatische Auswahl",
			"grabcutMaskingAbout": "Erstellen Sie automatische Ausschnitte und passen Sie diese nach Bedarf an.",
			"layersIncompositionText": "Ausschneiden, kombinieren, erstellen",
			"layersIncompositionAbout": "Erstellen Sie ein Meisterwerk mit Hilfe von Ebenenbearbeitungs- und Auswahlwerkzeugen.",
			"collageThemesText": "Collagendesigns",
			"collageThemesAbout": "Schalten Sie atemberaubende Collagen-Designs frei. Personalisieren Sie Ihre Collage - beispielsweise mit Aufklebern, Rahmen, Layouts, stilvollen Texten und einzigartigen Effekten!",
			"scrapBookCollageText": "Ausschnitt-Collage",
			"scrapBookCollageAbout": "Durch simples Tippen gelingen Ihnen eindrucksvolle Collagen. Stilisieren Sie mit Strichen, Text, Rahmen, Hintergründen und vielem mehr.",
			"creativeCameraEdits": "Kameraeffekte",
			"creativeCameraEditsAbout": "Nehmen Sie kreative Fotos mit Live-Filtern, realistischen Tätowierungen und künstlerischen Effekten auf.",
			"infinteContentText": "Schalten Sie alle Premium-Inhalte frei",
			"infinteContentAbout": "Werden Sie kreativ! Verschaffen Sie sich Zugang auf alle Kreativ-Inhalte: auf Misch-Looks, Hunderte von Layouts, lustige Sticker, Rahmen, Hintergründe, auf Texte und vieles mehr!",
			"manyMoreText": "... und viele weitere kreative Funktionen.",
			"buttonPrimary": "Weiter – $TRIAL_PERIOD$ kostenlos",
			"buttonPrimary2": "Zustimmen und abonnieren",
			"Continue": "Weiter",
			"RestorePurchases": "Käufe wiederherstellen",
			"GetTrialText": "$TRIAL_PERIOD$ KOSTENLOS NUTZEN, dann $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Die Zahlung wird dem iTunes-Konto bei der Kaufbestätigung belastet. Das Abonnement verlängert sich automatisch, es sei denn, es wird mindestens 24 Stunden vor dem Ende der aktuellen Periode automatisch verlängert. Die Verlängerung wird Ihrem Konto innerhalb von 24 Stunden vor Ende der laufenden Periode in Rechnung gestellt. Ihr Konto wird mit $PRICE$/$SUBSCRIPTION_PERIOD$ zur Verlängerung innerhalb von 24 Stunden vor Ende der aktuellen Periode belastet. Sie können die automatische Verlängerung in Ihren Apple ID Kontoeinstellungen jederzeit nach dem Kauf verwalten oder deaktivieren. ",
			"terms": "Nutzungsbedingungen",
			"policy": "Datenschutzrichtlinie",
			"yearlyPlan": "12 Monate: $DICOUNTEDPRICE$/Monat",
			"monthlyPlan": "1 Monat: $PRICE$/Monat",
			"discountPercentage": "Sparen Sie $DISCOUNT$% pro Jahr",
			"totalYearlyPrice": "Gesamt $PRICE$",
			"disclaimer": "Keine Verpflichtung. Stornierung jederzeit",
			"monthlyPlanBottomDisclaimer": "Keine Verpflichtung. Sie zahlen monatlich, bis Sie Ihr Abonnement kündigen. Sie können jederzeit in den Einstellungen Ihrer Apple ID kündigen",
			"yearlyPlanBottomDisclaimer": "Sie werden jährlich belastet, bis Sie Ihr Abonnement kündigen.  Sie können jederzeit in den Einstellungen Ihrer Apple ID kündigen",
			"unlockPremiumText": "Premium-Funktionen und Inhalte freischalten.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/Monat)",
			"UnlockPremium": "Premium freischalten",
			"heading1": "ANGEBOT ENDET 15. NOV",
			"discountFirstYear": "RABATT FÜR DAS 1. JAHR",
			"offerTerms": "Siehe Angebotsbedingungen",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ für 1 Jahr",
			"nextYearPriceString": "Dann $PRICE$ ab dem nächsten Jahr."
		};
	}
	else if(language_country == 'el_gr')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "ΑΠΟΚΤΗΣΤΕ ΤΟ PREMIUM ΔΩΡΕΑΝ ΓΙΑ ΤΗΝ ΠΡΩΤΗ ΠΕΡΙΟΔΟ ΧΡΗΣΗΣ $TRIAL_PERIOD$",
			"EDIT": "ΕΠΕΞΕΡΓΑΣΙΑ",
			"COMPOSE": "MIX",
			"FIX": "ΡΕΤΟΥΣ",
			"COLLAGE": "ΚΟΛΑΖ",
			"CAPTURE": "ΑΠΟΤΥΠΩΣΗ",
			"editorThemesText": "Θέματα προγράμματος επεξεργασίας",
			"editorThemesAbout": "Αντλήστε έμπνευση με εκπληκτικά θέματα και δημιουργήστε αριστουργήματα με ένα άγγιγμα. Εξατομικεύστε το έργο σας με κείμενα, αυτοκόλλητα, περιγράμματα και εμφάνιση.",
			"selectiveEditingText": "Επιλεκτική επεξεργασία",
			"smootheningText": "Απαλό δέρμα",
			"smileText": "Χαμόγελο",
			"selectiveEditingAbout": "Επεξεργαστείτε ένα συγκεκριμένο τμήμα μιας εικόνας. Η αυτόματη επιλογή αντικειμένων διευκολύνει την τροποποίηση και τη δημιουργία μοναδικών εφέ.",
			"smootheningAbout": "Αυθεντική και φυσική λείανση του δέρματος",
			"smileAbout": "Δεν χαμογελάσατε στην κάμερα; Μην ανησυχείτε, προσθέστε το τώρα.",
			"advancedSpotHealingText": "Προηγμένη διόρθωση",
			"advancedSpotHealingAbout": "Καταργήστε ή κλωνοποιήστε γρήγορα ένα μέρος μιας εικόνας. Διορθώστε τις ατέλειες με προηγμένες επιλογές.",
			"replaceEyeText": "Αντικατάσταση ματιών",
			"replaceEyeAbout": "Ανοιγόκλεισε κάποιος τα μάτια του στη φωτογραφία; Χρησιμοποιήστε αυτή τη λειτουργία για αυτόματο άνοιγμα κλειστών ματιών και δημιουργήστε την τέλεια εικόνα.",
			"grabcutMasking": "Αυτόματη επιλογή",
			"grabcutMaskingAbout": "Δημιουργήστε αυτόματες περικοπές και προσαρμόστε όπως χρειάζεστε.",
			"layersIncompositionText": "Κόψτε, Συνδυάστε, Δημιουργήστε",
			"layersIncompositionAbout": "Δημιουργήστε ένα αριστούργημα χρησιμοποιώντας εργαλεία επεξεργασίας και επιλογής επιπέδων.",
			"collageThemesText": "Θέματα κολάζ",
			"collageThemesAbout": "Ξεκλειδώστε τα εκπληκτικά θέματα κολάζ. Εξατομικεύστε το κολάζ σας με αυτοκόλλητα, περιγράμματα, σχέδια, κομψά κείμενα, μοναδικά εφέ και πολλά άλλα!",
			"scrapBookCollageText": "Κολάζ",
			"scrapBookCollageAbout": "Δημιουργήστε εντυπωσιακά κολάζ με ένα πάτημα. Δώστε στυλ με πινελιές, κείμενο, περιγράμματα, φόντο και πολλά άλλα.",
			"creativeCameraEdits": "Εφέ κάμερας",
			"creativeCameraEditsAbout": "Αποτυπώστε δημιουργικές φωτογραφίες με ζωντανά φίλτρα, ρεαλιστικά τατουάζ και καλλιτεχνικά εφέ.",
			"infinteContentText": "Ξεκλειδώστε όλο το Premium περιεχόμενο",
			"infinteContentAbout": "Γίνετε δημιουργικοί με πλήρη πρόσβαση σε δημιουργικά περιεχόμενα με εμφανίσεις ανάμιξης, εκατοντάδες σχέδια, διασκεδαστικά αυτοκόλλητα, περιγράμματα, φόντο, κείμενα και πολλά άλλα!",
			"manyMoreText": "...και πολλές ακόμη δημιουργικές δυνατότητες",
			"buttonPrimary": "Συνέχεια με δωρεάν δοκιμή $TRIAL_PERIOD$",
			"buttonPrimary2": "Συμφωνία και εγγραφή",
			"Continue": "Συνέχεια",
			"RestorePurchases": "Επαναφορά αγορών",
			"GetTrialText": "Αποκτήστε μια περίοδο χρήσης $TRIAL_PERIOD$ ΔΩΡΕΑΝ και στη συνέχεια η συνδρομή σας θα είναι $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Η πληρωμή χρεώνεται στον λογαριασμό σας στο iTunes, μετά την επιβεβαίωση της αγοράς σας. Η συνδρομή ανανεώνεται αυτόματα, εκτός εάν απενεργοποιηθεί η αυτόματη ανανέωση τουλάχιστον 24 ώρες πριν από τη λήξη της τρέχουσας περιόδου. Ο λογαριασμός σας θα χρεωθεί με το ποσό της ανανέωσης εντός 24 ωρών πριν από τη λήξη της τρέχουσας περιόδου. Ο λογαριασμός σας θα χρεωθεί με το ποσό των $PRICE$/$SUBSCRIPTION_PERIOD$ της ανανέωσης εντός 24 ωρών πριν από τη λήξη της τρέχουσας περιόδου. Μπορείτε να διαχειριστείτε ή να απενεργοποιήσετε την αυτόματη ανανέωση μέσω των ρυθμίσεων λογαριασμού Apple ID σας, οποιαδήποτε στιγμή μετά από την αγορά.",
			"terms": "Όροι χρήσης",
			"policy": "Πολιτική απορρήτου",
			"yearlyPlan": "12 μήνες: $DICOUNTEDPRICE$/μήνα",
			"monthlyPlan": "1 μήνας: $PRICE$/μήνα",
			"discountPercentage": "Εξοικονομήστε $DISCOUNT$% ανά έτος",
			"totalYearlyPrice": "Σύνολο $PRICE$",
			"disclaimer": "Χωρίς καμία δέσμευση. Ακύρωση οποιαδήποτε στιγμή",
			"monthlyPlanBottomDisclaimer": "Χωρίς δέσμευση. Θα χρεώνεστε σε μηνιαία βάση μέχρι να ακυρώσετε τη συνδρομή σας. Ακυρώστε οποιαδήποτε στιγμή από τις ρυθμίσεις Apple ID",
			"yearlyPlanBottomDisclaimer": "Θα χρεώνεστε σε ετήσια βάση μέχρι να ακυρώσετε τη συνδρομή σας. Ακυρώστε οποιαδήποτε στιγμή από τις ρυθμίσεις Apple ID",
			"unlockPremiumText": "Ξεκλειδώστε premium χαρακτηριστικά και περιεχόμενο.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/μήνα)",
			"UnlockPremium": "Ξεκλειδώστε το Premium",
			"heading1": "Η ΠΡΟΣΦΟΡΑ ΛΗΓΕΙ 15 ΝΟΕ",
			"discountFirstYear": "ΕΚΠΤΩΣΗ ΓΙΑ ΤΟ 1ο ΕΤΟΣ",
			"offerTerms": "Δείτε τους όρους της προσφοράς",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ για το 1ο έτος",
			"nextYearPriceString": "Στη συνέχεια, $PRICE$ από το επόμενο έτος και μετά."
		};
	}
	else if(language_country == 'es_es')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "OBTENGA PREMIUM GRATIS DURANTE LOS PRIMEROS $TRIAL_PERIOD$",
			"EDIT": "EDITAR",
			"COMPOSE": "MIX",
			"FIX": "RETOCAR",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Temas del Editor",
			"editorThemesAbout": "Inspírise con temas espectaculares que le permitirán crear una obra maestra con un solo toque. Personalice su trabajo con texto, pegatinas, bordes y looks.",
			"selectiveEditingText": "Edición selectiva",
			"smootheningText": "Suavizar piel",
			"smileText": "Sonrisa",
			"selectiveEditingAbout": "Edite una sección de una imagen. Gracias a la selección automática de objetos, resulta muy sencillo crear y modificar efectos exclusivos.",
			"smootheningAbout": "Suavizado de piel auténtico y natural",
			"smileAbout": "¿No ha captado una sonrisa en una foto? No se preocupe; añádala ahora.",
			"advancedSpotHealingText": "Corrección avanzada",
			"advancedSpotHealingAbout": "Elimine o clone con rapidez parte de una imagen. Retoque las imperfecciones con opciones avanzadas.",
			"replaceEyeText": "Sustituir ojos",
			"replaceEyeAbout": "¿Alguien ha pestañeado en una foto? Utilice esta opción para abrir ojos cerrados y crear la instantánea perfecta.",
			"grabcutMasking": "Selección automática",
			"grabcutMaskingAbout": "Cree recortes automáticos y adáptelos a sus necesidades.",
			"layersIncompositionText": "Corte, combine, cree",
			"layersIncompositionAbout": "Cree una obra maestra con herramientas de selección y edición de capas.",
			"collageThemesText": "Temas de collage",
			"collageThemesAbout": "Desbloquee impresionantes temas de collage. Personalice el collage con pegatinas, bordes, diseños, textos con estilo, efectos exclusivos y mucho más.",
			"scrapBookCollageText": "Collage cuarteado",
			"scrapBookCollageAbout": "Cree collages impactantes con un solo toque. Aplique estilos con trazos, texto, bordes, fondos y mucho más.",
			"creativeCameraEdits": "Efectos de cámara",
			"creativeCameraEditsAbout": "Capture fotos creativas con filtros automáticos, tatuajes realistas y efectos artísticos.",
			"infinteContentText": "Desbloquear todo el contenido Premium",
			"infinteContentAbout": "Desate su creatividad con el acceso sin restricciones a contenido creativo combinando looks, una gran cantidad de diseños, pegatinas divertidas, bordes, fondos, texto y muchísimo más.",
			"manyMoreText": "...y muchas más funciones creativas",
			"buttonPrimary": "Continuar con $TRIAL_PERIOD$ gratis",
			"buttonPrimary2": "Aceptar y suscribirse",
			"Continue": "Continuar",
			"RestorePurchases": "Restaurar compras",
			"GetTrialText": "Obtenga $TRIAL_PERIOD$ GRATIS y después por $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "El pago se cobrará en la cuenta de iTunes al confirmar la compra. La suscripción se renueva automáticamente a menos que se desactive la renovación automática con una antelación mínima de 24 horas antes del final del período actual. Se cobrará en su cuenta la renovación dentro de las 24 horas anteriores al final del período actual. Se cobrarán en su cuenta $PRICE$ / $SUBSCRIPTION_PERIOD$ en concepto renovación dentro de las 24 horas anteriores al final del período actual. Puede administrar o desactivar la renovación automática en la configuración de su cuenta de ID de Apple en cualquier momento después de la compra.",
			"terms": "Condiciones de uso",
			"policy": "Política de privacidad",
			"yearlyPlan": "12 meses: $DICOUNTEDPRICE$/mes",
			"monthlyPlan": "1 mes: $PRICE$/mes",
			"discountPercentage": "Ahorre $DISCOUNT$% al año",
			"totalYearlyPrice": "$PRICE$ total",
			"disclaimer": "Sin compromiso. Cancele en cualquier momento",
			"monthlyPlanBottomDisclaimer": "Sin compromiso. Se le cobrará mensualmente hasta que cancele la suscripción. Cancele cuando quiera en la configuración de su ID de Apple",
			"yearlyPlanBottomDisclaimer": "Se le cobrará anualmente hasta que cancele la suscripción. Cancele cuando quiera en la configuración de su ID de Apple",
			"unlockPremiumText": "Desbloquear contenido y funciones premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mes)",
			"UnlockPremium": "Desbloquear Premium",
			"heading1": "LA OFERTA FINALIZA EL 15 DE NOVIEMBRE",
			"discountFirstYear": "DESCUENTO EL PRIMER AÑO",
			"offerTerms": "Ver condiciones de la oferta",
			"bannerDiscountPercentage": "$DISCOUNT$ %",
			"discountedPriceString": "$DISCOUNTED_PRICE$ durante el primer año",
			"nextYearPriceString": "$PRICE$ a partir del año siguiente."
		};
	}
	else if(language_country == 'fi_fi')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "SAAT PREMIUMIN $TRIAL_PERIOD$ MAKSUTTA ",
			"EDIT": "MUOKKAA",
			"COMPOSE": "MIX",
			"FIX": "RETUSOINTI",
			"COLLAGE": "KOLLAASI",
			"CAPTURE": "TALTIOI",
			"editorThemesText": "Editoriteemat",
			"editorThemesAbout": "Inspiroidu upeista teemoista ja luo mestariteos yhdellä napautuksella. Mukauta töitä teksteillä, tarroilla, reunuksilla ja ilmeillä.",
			"selectiveEditingText": "Valikoiva muokkaaminen",
			"smootheningText": "Ihon silotus",
			"smileText": "Hymy",
			"selectiveEditingAbout": "Muokkaa tiettyä kuvan osaa. Automaattinen kohteen valinta helpottaa muokkaamista ja upeiden tehosteiden luomista.",
			"smootheningAbout": "Aito ja luonnollinen ihon silotus",
			"smileAbout": "Hymy unohtui kuvattaessa. Ei hätää – lisää se nyt.",
			"advancedSpotHealingText": "Korjauksen lisäasetukset",
			"advancedSpotHealingAbout": "Poista tai kloonaa nopeasti osa kuvasta. Korjaa virheitä lisäasetuksilla.",
			"replaceEyeText": "Korvaa silmät",
			"replaceEyeAbout": "Onko valokuvassa jollakulla silmät kiinni? Avaa suljetut silmät tällä ominaisuudella, ja kuvastasi tulee täydellinen.",
			"grabcutMasking": "Automaattivalinta",
			"grabcutMaskingAbout": "Luo automaattisia leikkauksia ja muokkaa niitä tarpeen mukaan.",
			"layersIncompositionText": "Leikkaa, yhdistele ja luo",
			"layersIncompositionAbout": "Luo mestariteos tasomuokkaus- ja valintatyökaluilla.",
			"collageThemesText": "Kollaasiteemat",
			"collageThemesAbout": "Avaa upeat kollaasiteemat. Mukauta kollaaseja esimerkiksi tarroilla, reunuksilla, asetteluilla, tyylikkäillä teksteillä ja ainutlaatuisilla tehosteilla.",
			"scrapBookCollageText": "Aukaisukollaasi",
			"scrapBookCollageAbout": "Luo silmiä hiveleviä kollaaseja yhdellä napautuksella. Tyylittele muiden muassa piirroilla, tekstillä, reunuksilla ja taustoilla.",
			"creativeCameraEdits": "Kameratehosteet",
			"creativeCameraEditsAbout": "Ikuista luovia valokuvia livesuodattimilla ja todentuntuisilla tatuointi- ja luovuustehosteilla.",
			"infinteContentText": "Avaa kaikki maksulliset sisällöt",
			"infinteContentAbout": "Jos sinulla on täysi käyttöoikeus luoviin sisältöihin, kuten ilmeiden sekoittamiseen, satoihin asetteluihin sekä hauskoihin tarroihin, reunuksiin, taustoihin ja teksteihin, voit antaa luovuuden kukoistaa.",
			"manyMoreText": "...ja monia muita luovia ominaisuuksia",
			"buttonPrimary": "Jatka maksutta $TRIAL_PERIOD$",
			"buttonPrimary2": "Hyväksy ja tilaa",
			"Continue": "Jatka",
			"RestorePurchases": "Palauta ostokset",
			"GetTrialText": "Saat maksutta $TRIAL_PERIOD$, jonka jälkeen hinta on $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Maksu peritään iTunes-tililtäsi ostoksen vahvistamisen yhteydessä. Tilaus uudistetaan automaattisesti, ellei automaattista uudistamista poisteta käytöstä viimeistään 24 tuntia ennen tilauskauden päättymistä. Tililtäsi veloitetaan uudistamisesta $PRICE$ / $SUBSCRIPTION_PERIOD$ 24 tuntia ennen tilauskauden päättymistä. Voit hallita automaattista uudistamista tai poistaa sen käytöstä Apple ID -tiliasetuksissasi milloin tahansa ostamisen jälkeen.",
			"terms": "Käyttöehdot",
			"policy": "Tietosuojakäytäntö",
			"yearlyPlan": "12 kuukautta: $DICOUNTEDPRICE$/kk",
			"monthlyPlan": "1 kuukausi: $PRICE$/kk",
			"discountPercentage": "Säästä $DISCOUNT$ % vuodessa",
			"totalYearlyPrice": "Hinta yht. $PRICE$",
			"disclaimer": "Ei sitoumuksia. Peruuta milloin tahansa.",
			"monthlyPlanBottomDisclaimer": "Ei sitoutumista. Sinua veloitetaan kuukausittain, kunnes peruutat tilauksesi. Peruuta milloin hyvänsä <br/>Apple ID -asetuksissa.",
			"yearlyPlanBottomDisclaimer": "Sinua veloitetaan vuosittain, kunnes peruutat tilauksesi. Peruuta milloin hyvänsä Apple ID -asetuksissa.",
			"unlockPremiumText": "Avaa maksulliset ominaisuudet ja sisältö.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/kk)",
			"UnlockPremium": "Avaa Premium",
			"heading1": "TARJOUS PÄÄTTYY 15.11.",
			"discountFirstYear": "ALENNUS 1. VUONNA",
			"offerTerms": "Katso tarjousehdot",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ 1. vuonna",
			"nextYearPriceString": "Sitten hintaan $PRICE$ seuraavasta vuodesta alkaen."
		};
	}
	else if(language_country == 'fr_fr')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "ACCÉDEZ À PREMIUM GRATUITEMENT POUR LA PREMIÈRE $TRIAL_PERIOD$",
			"EDIT": "MODIFIER",
			"COMPOSE": "MIX",
			"FIX": "RETOUCHER",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "CAPTURER",
			"editorThemesText": "Thèmes d’éditeur",
			"editorThemesAbout": "Laissez-vous inspirer par des thèmes époustouflants et créez un chef-d’œuvre d’un seul geste : personnalisez votre travail avec des textes, des autocollants, des bordures et des looks.",
			"selectiveEditingText": "Modification sélective",
			"smootheningText": "Peau douce",
			"smileText": "Sourire",
			"selectiveEditingAbout": "Modifiez un élément spécifique d’une image. La sélection automatique d’objets facilite la modification et la création d’effets uniques.",
			"smootheningAbout": "Lissez la peau de vos sujets de façon authentique et naturelle.",
			"smileAbout": "Vous avez oublié de sourire sur une photo ? Pas de problème, ajoutez-le maintenant.",
			"advancedSpotHealingText": "Correcteur avancé",
			"advancedSpotHealingAbout": "Supprimez ou clonez rapidement une partie d’une image. Améliorez les imperfections avec des options avancées.",
			"replaceEyeText": "Remplacer les yeux",
			"replaceEyeAbout": "Quelqu’un a cligné des yeux sur une photo ? Utilisez cet outil pour ouvrir les yeux fermés afin de créer la photo parfaite.",
			"grabcutMasking": "Sélection automatique",
			"grabcutMaskingAbout": "Créez des découpes automatiques et personnalisez-les selon vos besoins.",
			"layersIncompositionText": "Découpez, combinez, créez",
			"layersIncompositionAbout": "Créez un chef d’œuvre à l’aide des outils de sélection et d’édition de calques.",
			"collageThemesText": "Palettes de collages",
			"collageThemesAbout": "Déverrouillez des thèmes de collage époustouflants. Personnalisez votre collage avec des autocollants, des bordures, des mises en page, des textes élégants, des effets uniques, et plus encore !",
			"scrapBookCollageText": "Collage découpé",
			"scrapBookCollageAbout": "Créez des collages visuellement marquants d’un seul geste. Stylisez-les avec des traits, du texte, des bordures, des arrière-plans, et plus encore.",
			"creativeCameraEdits": "Effets d’appareil photo",
			"creativeCameraEditsAbout": "Prenez des photos créatives avec des filtres en direct, des tatouages réalistes et des effets artistiques.",
			"infinteContentText": "Déverrouiller tout le contenu Premium",
			"infinteContentAbout": "Laissez libre court à votre imagination en débloquant l'accès complet à du contenu créatif incluant des mélanges de look, de centaines de mises en page, d’autocollants amusants, de bordures, d’arrière-plans, de textes, et plus encore !",
			"manyMoreText": "... et bien d’autres fonctionnalités créatives",
			"buttonPrimary": "Continuez gratuitement pendant $TRIAL_PERIOD$",
			"buttonPrimary2": "Accepter et s’abonner",
			"Continue": "Continuer",
			"RestorePurchases": "Restaurer les achats",
			"GetTrialText": "Obtenez $TRIAL_PERIOD$ GRATUITS, $PRICE$/$SUBSCRIPTION_PERIOD$ par la suite",
			"footerText": "Le paiement sera facturé sur le compte iTunes lors de la confirmation de l’achat. L’abonnement est automatiquement renouvelé (sauf si le renouvellement automatique est désactivé) au moins 24 heures avant la fin de la période en cours. Votre compte sera facturé du renouvellement dans les 24 heures précédant la fin de la période en cours. Votre compte sera facturé de $PRICE$ / $SUBSCRIPTION_PERIOD$ pour le renouvellement dans les 24 heures précédant la fin de la période en cours. Vous pouvez gérer ou désactiver le renouvellement automatique dans les paramètres de votre compte Apple ID à tout moment après l’achat.",
			"terms": "Conditions d’utilisation",
			"policy": "Politique de confidentialité",
			"yearlyPlan": "12 mois : $DICOUNTEDPRICE$/mois",
			"monthlyPlan": "1 mois : $PRICE$/mois",
			"discountPercentage": "Économisez $DISCOUNT$ % par an",
			"totalYearlyPrice": "Total : $PRICE$",
			"disclaimer": "Aucun engagement. Annulez à tout moment",
			"monthlyPlanBottomDisclaimer": "Aucun engagement. Vous serez facturé chaque mois jusqu’à ce que vous résiliiez votre abonnement. Vous pouvez le résilier à tout moment dans les paramètres de votre Apple ID",
			"yearlyPlanBottomDisclaimer": "Vous serez facturé chaque année jusqu’à ce que vous résiliiez votre abonnement. Vous pouvez le résilier à tout moment dans les paramètres de votre Apple ID",
			"unlockPremiumText": "Déverrouillez les fonctionnalités et le contenu Premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mois)",
			"UnlockPremium": "Déverrouiller Premium",
			"heading1": "L’OFFRE PREND FIN LE 15 NOVEMBRE",
			"discountFirstYear": "DE REMISE POUR LA 1ÈRE ANNÉE",
			"offerTerms": "Voir les conditions de l’offre",
			"bannerDiscountPercentage": "$DISCOUNT$ %",
			"discountedPriceString": "$DISCOUNTED_PRICE$ pour la 1ère année",
			"nextYearPriceString": "Puis $PRICE$ à partir de l’année suivante."
		};
	}
	else if(language_country == 'id_id')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "DAPATKAN FITUR PREMIUM GRATIS SELAMA $TRIAL_PERIOD$ PERTAMA",
			"EDIT": "EDIT",
			"COMPOSE": "MIX",
			"FIX": "PERBAIKI",
			"COLLAGE": "KOLASE",
			"CAPTURE": "AMBIL",
			"editorThemesText": "Penyunting Tema",
			"editorThemesAbout": "Dapatkan inspirasi dengan tema yang menakjubkan, buat mahakarya dengan satu ketukan tunggal. Personalisasikan karya Anda dengan teks, stiker, batas & tampilan.",
			"selectiveEditingText": "Penyuntingan Selektif",
			"smootheningText": "Kulit Halus",
			"smileText": "Senyum",
			"selectiveEditingAbout": "Edit bagian tertentu dari suatu gambar. Pemilihan objek otomatis memudahkan Anda untuk memodifikasi dan membuat efek unik.",
			"smootheningAbout": "Penghalusan tekstur kulit secara autentik & alami",
			"smileAbout": "Lupa tersenyum saat difoto? Jangan khawatir, tambahkan saja sekarang.",
			"advancedSpotHealingText": "Penyembuhan Tingkat Lanjut",
			"advancedSpotHealingAbout": "Hapus atau salin bagian gambar dengan cepat. Sempurnakan bagian yang tidak sempurna dengan opsi lanjutan.",
			"replaceEyeText": "Ganti Mata",
			"replaceEyeAbout": "Ada yang berkedip di foto? Gunakan fitur ini untuk membuka mata yang tertutup demi mendapatkan hasil foto yang sempurna.",
			"grabcutMasking": "Pilihan Otomatis",
			"grabcutMaskingAbout": "Buat potongan otomatis dan sesuaikan dengan kebutuhan Anda.",
			"layersIncompositionText": "Potong, Gabungkan, Ciptakan Karya Seni",
			"layersIncompositionAbout": "Buat mahakarya menggunakan fitur pengeditan lapisan dan alat pilihan.",
			"collageThemesText": "Tema Kolase",
			"collageThemesAbout": "Buka kunci tema kolase yang menakjubkan. Personalisasi kolase Anda dengan stiker, batas, tata letak, teks modis, efek unik, dan masih banyak lagi!",
			"scrapBookCollageText": "Kolase dari Potongan Gambar",
			"scrapBookCollageAbout": "Buat kolase yang menarik secara visual dengan satu ketukan saja. Hias dengan sapuan, teks, batas, latar belakang, dan masih banyak lagi.",
			"creativeCameraEdits": "Efek Kamera",
			"creativeCameraEditsAbout": "Abadikan foto kreatif dengan filter langsung, tato yang realistis & efek artistik.",
			"infinteContentText": "Buka Kunci Semua Konten Premium",
			"infinteContentAbout": "Berkreasilah dengan akses lengkap ke konten kreatif dengan paduan tampilan, ratusan jenis tata letak, stiker yang lucu, batas, latar belakang, teks, dan lainnya!",
			"manyMoreText": "...dan masih banyak fitur kreatif lainnya",
			"buttonPrimary": "Lanjutkan dengan uji coba gratis selama $TRIAL_PERIOD$",
			"buttonPrimary2": "Setuju dan Berlangganan",
			"Continue": "Lanjutkan",
			"RestorePurchases": "Pulihkan Pembelian",
			"GetTrialText": "Dapatkan $TRIAL_PERIOD$ secara GRATIS, lalu bayar $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Pembayaran akan ditagihkan ke Akun iTunes pada saat konfirmasi pembelian. Paket langganan secara otomatis diperpanjang kecuali perpanjangan otomatis dinonaktifkan minimal 24 jam sebelum akhir periode berjalan. Akun Anda akan dikenakan biaya untuk perpanjangan dalam waktu 24 jam sebelum akhir periode berjalan. Akun Anda akan dikenakan $PRICE$ / $SUBSCRIPTION_PERIOD$ untuk perpanjangan dalam jangka waktu 24 jam sebelum akhir periode berjalan. Anda bisa mengatur atau menonaktifkan perpanjangan otomatis di Pengaturan Akun ID Apple Anda kapan saja setelah pembelian.",
			"terms": "Syarat penggunaan",
			"policy": "Kebijakan Privasi",
			"yearlyPlan": "12 Bulan: $DICOUNTEDPRICE$/bulan",
			"monthlyPlan": "1 Bulan: $PRICE$/bulan",
			"discountPercentage": "Hemat $DISCOUNT$% per tahun",
			"totalYearlyPrice": "Jumlah $PRICE$",
			"disclaimer": "Tanpa Komitmen. Batalkan Kapan Saja",
			"monthlyPlanBottomDisclaimer": "Tidak ada komitmen. Anda akan ditagihkan setiap bulan hingga langganan Anda dibatalkan. Batalkan kapan saja dari pengaturan ID Apple Anda.",
			"yearlyPlanBottomDisclaimer": "Anda akan ditagihkan setiap tahun hingga langganan Anda dibatalkan. Batalkan kapan saja dari pengaturan ID Apple Anda.",
			"unlockPremiumText": "Buka kunci fitur dan konten premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/bulan)",
			"UnlockPremium": "Buka Kunci Paket Premium",
			"heading1": "PENAWARAN BERAKHIR 15 NOVEMBER",
			"discountFirstYear": "DISKON UNTUK TAHUN KE-1",
			"offerTerms": "Lihat persyaratan penawaran",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ untuk tahun pertama",
			"nextYearPriceString": "Lalu $PRICE$ untuk tahun berikutnya."
		};
	}
	else if(language_country == 'it_it')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "OTTIENI PREMIUM GRATIS PER I PRIMI $TRIAL_PERIOD$",
			"EDIT": "MODIFICA",
			"COMPOSE": "MIX",
			"FIX": "RITOCCA",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "ACQUISISCI",
			"editorThemesText": "Temi dell'editor",
			"editorThemesAbout": "Lasciati ispirare da temi sorprendenti e crea un capolavoro con un solo tocco. Personalizza il tuo lavoro con testi, adesivi, bordi e look.",
			"selectiveEditingText": "Modifica selettiva",
			"smootheningText": "Pelle uniforme",
			"smileText": "Sorriso",
			"selectiveEditingAbout": "Modifica una sezione specifica di un'immagine. La selezione automatica degli oggetti facilita la modifica e la creazione di effetti unici.",
			"smootheningAbout": "Uniformità dell'incarnato autentica e naturale",
			"smileAbout": "Non sei riuscito a cogliere il sorriso in una foto? Nessun problema, aggiungilo ora.",
			"advancedSpotHealingText": "Correzione avanzata",
			"advancedSpotHealingAbout": "Rimuovi o clona rapidamente una parte di un’immagine. Elimina le imperfezioni con le opzioni avanzate.",
			"replaceEyeText": "Sostituisci occhi",
			"replaceEyeAbout": "Qualcuno ha chiuso gli occhi in una foto? Usa questa funzionalità per aprire automaticamente gli occhi chiusi e ottenere lo scatto perfetto.",
			"grabcutMasking": "Selezione automatica",
			"grabcutMaskingAbout": "Crea ritagli automaticamente e personalizzali come vuoi.",
			"layersIncompositionText": "Ritaglia, combina, crea",
			"layersIncompositionAbout": "Crea il tuo capolavoro utilizzando gli strumenti per la selezione e la modifica dei livelli.",
			"collageThemesText": "Temi collage",
			"collageThemesAbout": "Sblocca fantastici temi collage. Personalizza il tuo collage con adesivi, bordi, layout, testi eleganti, effetti unici e molto altro ancora.",
			"scrapBookCollageText": "Collage effetto ritaglio",
			"scrapBookCollageAbout": "Crea collage visivamente sorprendenti con un solo tocco. Modifica lo stile con tratti, testo, bordi, sfondi e altro.",
			"creativeCameraEdits": "Effetti fotocamera",
			"creativeCameraEditsAbout": "Scatta foto creative con filtri live, tatuaggi realistici ed effetti artistici.",
			"infinteContentText": "Sblocca tutto il contenuto premium",
			"infinteContentAbout": "Libera la fantasia con l’accesso completo a contenuti creativi che includono look di fusione, centinaia di layout, sticker divertenti, bordi, sfondi, testi e molto altro ancora.",
			"manyMoreText": "...e tante altre funzioni creative",
			"buttonPrimary": "Continua con $TRIAL_PERIOD$ gratis",
			"buttonPrimary2": "Accetta e iscriviti",
			"Continue": "Continua",
			"RestorePurchases": "Ripristina acquisti",
			"GetTrialText": "Ottieni $TRIAL_PERIOD$ GRATIS, poi paga solo $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Il pagamento sarà addebitato sull’account iTunes alla conferma dell’acquisto. L’abbonamento si rinnova automaticamente, a meno che il rinnovo automatico non venga disattivato almeno 24 ore prima della fine del periodo corrente. L’addebito del rinnovo sul tuo conto verrà effettuato nelle 24 ore precedenti la fine del periodo in corso. L’addebito di $PRICE$/ $SUBSCRIPTION_PERIOD$ sul tuo conto per il rinnovo verrà effettuato nelle 24 ore precedenti la fine del periodo corrente. Puoi gestire o disattivare il rinnovo automatico nelle impostazioni del tuo account Apple ID in qualsiasi momento successivamente all’acquisto.",
			"terms": "Termini di utilizzo",
			"policy": "Informativa sulla privacy",
			"yearlyPlan": "12 mesi: $DICOUNTEDPRICE$/mese",
			"monthlyPlan": "1 mese: $PRICE$/mese",
			"discountPercentage": "$DISCOUNT$% di sconto all’anno",
			"totalYearlyPrice": "Totale $PRICE$",
			"disclaimer": "Nessun impegno. Annulla in qualsiasi momento",
			"monthlyPlanBottomDisclaimer": "Nessun impegno. L’importo ti sarà addebitato ogni mese fino all’annullamento dell’abbonamento. Annulla quando vuoi nelle impostazioni del tuo ID Apple",
			"yearlyPlanBottomDisclaimer": "L’importo ti sarà addebitato con cadenza annuale fino all’annullamento dell’abbonamento. Annulla quando vuoi nelle impostazioni del tuo ID Apple",
			"unlockPremiumText": "Sblocca funzionalità e contenuti premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mese)",
			"UnlockPremium": "Sblocca Premium",
			"heading1": "L'OFFERTA SCADE IL 15 NOVEMBRE",
			"discountFirstYear": "DI SCONTO PER IL 1° ANNO",
			"offerTerms": "Vedere le condizioni per l'offerta",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ per il primo anno",
			"nextYearPriceString": "Poi $PRICE$ a partire dall'anno successivo."
		};
	}
	else if(language_country == 'ja_jp')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "最初の $TRIAL_PERIOD$ は Premium を無償でご利用いただけます",
			"EDIT": "編集",
			"COMPOSE": "MIX",
			"FIX": "レタッチ",
			"COLLAGE": "コラージュ",
			"CAPTURE": "撮影",
			"editorThemesText": "編集可能なテーマ",
			"editorThemesAbout": "美しいテーマを利用した傑作をシングルタップで作成できます。テキスト、ステッカー、枠線やフィルターを編集して、自分だけの作品に仕上げましょう。",
			"selectiveEditingText": "特定部分の編集",
			"smootheningText": "スムーズスキン",
			"smileText": "笑顔にする",
			"selectiveEditingAbout": "画像の特定の部分のみを編集できます。自動オブジェクト選択機能を活用して、独自のエフェクトを簡単に変更および作成できます。",
			"smootheningAbout": "まるで本物のように、肌を滑らかにできます",
			"smileAbout": "顔が無表情でも心配ありません。笑顔に変更しましょう。",
			"advancedSpotHealingText": "高度な修復機能",
			"advancedSpotHealingAbout": "画像の一部をすばやく削除または複製できます。高度な修復機能で不完全な部分を完璧に修正します。",
			"replaceEyeText": "閉じた目を開ける",
			"replaceEyeAbout": "誰かが目をつぶって写真に写っていても、この機能を使えば閉じた目を開けて、完璧なショットに仕上げられます。",
			"grabcutMasking": "選択範囲を自動で選択",
			"grabcutMaskingAbout": "自動で選択範囲を作成し、必要に応じてカスタマイズできます。",
			"layersIncompositionText": "切り抜いて、重ねて、創造する",
			"layersIncompositionAbout": "レイヤー編集や選択ツールを使用して、最高傑作を作り上げましょう。",
			"collageThemesText": "コラージュのテーマ",
			"collageThemesAbout": "見事なコラージュのテーマを利用して、ステッカー、枠線、レイアウト、スタイリッシュなテキスト、独自のエフェクトなどで編集し、自分好みのコラージュに仕上げましょう。",
			"scrapBookCollageText": "カットアウトコラージュ",
			"scrapBookCollageAbout": "シングルタップで見た目に魅力的なコラージュを作成。ストローク、テキスト、境界線、背景などでスタイリッシュに仕上げます。",
			"creativeCameraEdits": "カメラエフェクト",
			"creativeCameraEditsAbout": "ライブフィルター、リアルなタトゥー、芸術的なエフェクトを利用して、クリエイティブな写真を撮影しましょう。",
			"infinteContentText": "すべてのプレミアムコンテンツを手に入れましょう",
			"infinteContentAbout": "合成効果、何百ものレイアウト、愉快なステッカー、境界線、背景、テキストなどといった、全てのクリエイティブコンテンツを入手して、創造力を広げましょう。",
			"manyMoreText": "…その他にも、多くの機能が利用できます。",
			"buttonPrimary": "$TRIAL_PERIOD$の無料お試し",
			"buttonPrimary2": "同意して購入する",
			"Continue": "続行",
			"RestorePurchases": "購入し直す",
			"GetTrialText": "$TRIAL_PERIOD$は無料、その後は$PRICE$ / $SUBSCRIPTION_PERIOD$の料金",
			"footerText": "ご購入の確認後、料金は iTunes アカウントに請求されます。現在の契約期間終了時刻の 24 時間前までに自動更新をオフにしない場合、サブスクリプションは自動更新されます。更新した場合は、現在の契約期間終了時刻の 24 時間前に、お客様のアカウントに $PRICE$ / $SUBSCRIPTION_PERIOD$ が請求されます。ご購入後は、お客様の Apple ID のアカウント設定からいつでも自動更新の管理または無効化を行えます。",
			"terms": "利用規約",
			"policy": "プライバシーポリシー",
			"yearlyPlan": "12 ヶ月 : $DICOUNTEDPRICE$/月",
			"monthlyPlan": "1 ヶ月 : $PRICE$/月",
			"discountPercentage": "年間割引率 : $DISCOUNT$%",
			"totalYearlyPrice": "合計 : $PRICE$",
			"disclaimer": "不要になったら、いつでもキャンセルできます",
			"monthlyPlanBottomDisclaimer": "契約は不要です。サブスクリプションを解約するまで、毎月料金が請求されます。解約は Apple ID の設定でいつでも行うことができます",
			"yearlyPlanBottomDisclaimer": "サブスクリプションを解約するまで、毎年料金が請求されます。解約は Apple ID の設定でいつでも行うことができます",
			"unlockPremiumText": "プレミアム機能とプレミアムコンテンツを使用できます。",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/月)",
			"UnlockPremium": "Premium のロックを解除",
			"heading1": "オファーは 11 月 15 日に終了します",
			"discountFirstYear": "初年度割引",
			"offerTerms": "オファー条件を見る",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "1 年目は $DISCOUNTED_PRICE$。",
			"nextYearPriceString": "翌年以降は $PRICE$。"
		};
	}
	else if(language_country == 'ko_kr')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "처음 $TRIAL_PERIOD$ 동안 무료로 프리미엄 사용",
			"EDIT": "편집",
			"COMPOSE": "MIX",
			"FIX": "수정",
			"COLLAGE": "콜라주",
			"CAPTURE": "캡처",
			"editorThemesText": "편집기 테마",
			"editorThemesAbout": "멋진 테마로 영감을 얻고 탭 한 번으로 놀라운 작품을 제작할 수 있습니다. 텍스트, 스티커, 테두리, 룩을 활용하여 나만의 스타일을 표현해 보세요.",
			"selectiveEditingText": "선택적 편집",
			"smootheningText": "피부 매끄럽게 하기",
			"smileText": "스마일",
			"selectiveEditingAbout": "이미지의 특정 섹션을 편집합니다. 자동 개체 선택 기능을 사용하면 간편하게 수정하고 독특한 효과를 만들 수 있습니다.",
			"smootheningAbout": "생생하고 자연스러운 피부 매끄럽게 효과",
			"smileAbout": "사진에서 미소를 짓지 않으셨나요? 걱정하지 마십시오. 지금 추가할 수 있습니다.",
			"advancedSpotHealingText": "고급 복구",
			"advancedSpotHealingAbout": "이미지의 일부를 빠르게 제거하거나 복제할 수 있습니다. 고급 옵션으로 완벽하게 편집해 보세요.",
			"replaceEyeText": "눈 교체",
			"replaceEyeAbout": "사진에서 눈을 감은 사람이 있다면 감긴 눈을 뜨게 해서 완벽한 이미지를 연출해 보세요.",
			"grabcutMasking": "자동 선택",
			"grabcutMaskingAbout": "자동 잘라내기를 생성하고 필요에 따라 맞춤 설정할 수 있습니다.",
			"layersIncompositionText": "잘라내기, 결합, 만들기",
			"layersIncompositionAbout": "레이어 편집 및 선택 도구를 사용하여 작품을 만들어 보세요.",
			"collageThemesText": "콜라주 테마",
			"collageThemesAbout": "멋진 콜라주 테마의 잠금을 해제하여 스티커, 테두리, 레이아웃, 감각적인 텍스트, 독특한 효과 등으로 나만의 콜라주를 만들어 보세요.",
			"scrapBookCollageText": "오려내기 콜라주",
			"scrapBookCollageAbout": "탭 한 번으로 눈길을 사로잡는 콜라주를 만들 수 있습니다. 선, 텍스트, 테두리, 배경 등으로 멋지게 표현해 보세요.",
			"creativeCameraEdits": "카메라 효과",
			"creativeCameraEditsAbout": "라이브 필터, 실감 나는 문신, 예술적인 효과를 활용하여 사진을 창의적으로 표현해 보세요.",
			"infinteContentText": "모든 프리미엄 콘텐츠 잠금 해제",
			"infinteContentAbout": "블렌딩 룩, 다양한 레이아웃, 흥미로운 스티커, 테두리, 배경, 텍스트 등 독창적인 콘텐츠를 모두 활용하여 창의력을 발휘해 보세요.",
			"manyMoreText": "...그리고 매우 다양한 크리에이티브 기능",
			"buttonPrimary": "$TRIAL_PERIOD$ 무료 체험으로 시작",
			"buttonPrimary2": "동의 및 구독",
			"Continue": "계속",
			"RestorePurchases": "구매 복원",
			"GetTrialText": "$TRIAL_PERIOD$ 무료 사용 후 $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "구매가 확정되면 결제 금액이 iTunes 계정으로 청구됩니다. 현재 구독 기간이 종료되기 최소 24시간 전에 자동 갱신을 끄지 않으면 구독이 자동으로 갱신됩니다. 현재 구독 기간이 종료되기 전 24시간 이내에 사용자의 계정으로 갱신 요금이 청구됩니다. 현재 구독 기간이 종료되기 전 24시간 이내에 사용자의 계정으로 $PRICE$ / $SUBSCRIPTION_PERIOD$의 요금이 청구됩니다. 구매 후 Apple ID 계정 설정에서 언제든지 자동 갱신을 관리하거나 끌 수 있습니다.",
			"terms": "사용 약관",
			"policy": "개인정보 처리방침",
			"yearlyPlan": "12개월: $DICOUNTEDPRICE$/월",
			"monthlyPlan": "1개월: $PRICE$/월",
			"discountPercentage": "연간 $DISCOUNT$% 할인",
			"totalYearlyPrice": "총 $PRICE$",
			"disclaimer": "약정이 없으며 언제든지 취소할 수 있습니다",
			"monthlyPlanBottomDisclaimer": "약정이 없으며 구독을 취소할 때까지 매월 요금이 부과됩니다. Apple ID 설정에서 언제든지 취소할 수 있습니다.",
			"yearlyPlanBottomDisclaimer": "구독을 취소할 때까지 매년 요금이 부과됩니다. Apple ID 설정에서 언제든지 취소할 수 있습니다.",
			"unlockPremiumText": "프리미엄 기능 및 콘텐츠를 잠금 해제하세요.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/월)",
			"UnlockPremium": "프리미엄 잠금 해제",
			"heading1": "11월 15일에 혜택 종료",
			"discountFirstYear": "처음 1년 동안 할인",
			"offerTerms": "혜택 조건 보기",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "처음 1년간 $DISCOUNTED_PRICE$",
			"nextYearPriceString": "이후 가격은 $PRICE$입니다."
		};
	}
	else if(language_country == 'ms_my')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "DAPATKAN PREMIUM PERCUMA UNTUK $TRIAL_PERIOD$ PERTAMA",
			"EDIT": "EDIT",
			"COMPOSE": "MIX",
			"FIX": "PERHALUSI",
			"COLLAGE": "KOLAJ",
			"CAPTURE": "TANGKAP",
			"editorThemesText": "Tema Editor",
			"editorThemesAbout": "Dapatkan inspirasi dengan tema yang menakjubkan, membenarkan anda untuk mencipta karya agung dalam satu ketikan. Peribadikan kerja anda dengan teks, pelekat, sempadan & rupa.",
			"selectiveEditingText": "Edit Terpilih",
			"smootheningText": "Kulit Halus",
			"smileText": "Senyum",
			"selectiveEditingAbout": "Edit bahagian imej yang khusus. Pemilihan objek automatik menjadikannya mudah untuk mengubahsuai dan mencipta kesan unik.",
			"smootheningAbout": "Melicinkan kulit yang asli & semula jadi",
			"smileAbout": "Terlepas senyuman dalam foto. Jangan risau, tambahkan sekarang.",
			"advancedSpotHealingText": "Penyembuhan Lanjutan",
			"advancedSpotHealingAbout": "Buang atau klon bahagian imej dengan cepat. Sempurnakan ketaksempurnaan dengan opsyen lanjutan.",
			"replaceEyeText": "Gantikan Mata",
			"replaceEyeAbout": "Adakah seseorang mengelipkan mata dalam foto? Gunakan ini untuk membuka mata yang tertutup untuk mencipta tangkapan yang sempurna.",
			"grabcutMasking": "Pemilihan Auto",
			"grabcutMaskingAbout": "Cipta potongan automatik dan sesuaikan mengikut keperluan anda.",
			"layersIncompositionText": "Potong, Gabungkan, Cipta",
			"layersIncompositionAbout": "Cipta karya agung menggunakan lapisan pengeditan dan alat pemilihan.",
			"collageThemesText": "Tema Kolaj",
			"collageThemesAbout": "Buka kunci tema kolaj yang menakjubkan. Peribadikan kolaj anda dengan pelekat, sempadan, tata letak, teks bergaya, kesan unik dan banyak lagi!",
			"scrapBookCollageText": "Keratan Kolaj",
			"scrapBookCollageAbout": "Cipta kolaj berbelang secara visual dengan satu ketikan. Gayakan dengan strok, teks, sempadan, latar belakang dan banyak lagi.",
			"creativeCameraEdits": "Kesan Kamera",
			"creativeCameraEditsAbout": "Tangkap foto kreatif dengan penapis langsung, tatu realistik & kesan artistik.",
			"infinteContentText": "Buka kunci Semua Kandungan Premium",
			"infinteContentAbout": "Jadi kreatif dengan akses penuh ke kandungan kreatif dengan campuran rupa, ratusan tata letak, pelekat menyeronokkan, sempadan, latar belakang, teks dan banyak lagi!",
			"manyMoreText": "...dan banyak lagi ciri-ciri kreatif",
			"buttonPrimary": "Teruskan dengan $TRIAL_PERIOD$ percuma",
			"buttonPrimary2": "Setuju dan Langgan",
			"Continue": "Teruskan",
			"RestorePurchases": "Pulihkan Pembelian",
			"GetTrialText": "Dapatkan $TRIAL_PERIOD$ PERCUMA, kemudian $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Pembelian dicaj ke Akaun iTunes anda pada masa pengesahan pembelian. Langganan akan diperbaharui secara automatik melainkan pembaharuan auto dimatikan sekurang-kurangnya 24 jam sebelum penghujung tempoh semasa. Akaun anda akan dicaj untuk pembaharuan dalam masa 24 jam sebelum penghujung tempoh langganan. Akaun anda akan dicaj $PRICE$ / $SUBSCRIPTION_PERIOD$ untuk pembaharuan dalam masa 24 jam sebelum penghujung tempoh semasa. Anda boleh menguruskan atau mematikan pembaharuan automatik dalam Tetapan Akaun ID Apple anda pada bila-bila masa selepas pembelian.",
			"terms": "Terma penggunaan",
			"policy": "Dasar Privasi",
			"yearlyPlan": "12 Bulan: $DICOUNTEDPRICE$/bln",
			"monthlyPlan": "1 Bulan: $PRICE$/bln",
			"discountPercentage": "Jimat $DISCOUNT$% setahun",
			"totalYearlyPrice": "Jumlah $PRICE$",
			"disclaimer": "Tiada Komitmen. Batalkan Pada Bila-Bila Masa",
			"monthlyPlanBottomDisclaimer": "Tanpa komitmen. Anda akan dikenakan bayaran setiap bulan sehingga langganan dibatalkan. Batalkan langganan bila-bila masa dalam tetapan Apple ID anda",
			"yearlyPlanBottomDisclaimer": "Anda akan dikenakan bayaran setiap tahun sehingga langganan dibatalkan. Batalkan langganan bila-bila masa dalam tetapan Apple ID anda",
			"unlockPremiumText": "Buka kunci ciri dan kandungan premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/bln)",
			"UnlockPremium": "Buka kunci Premium",
			"heading1": "TAWARAN BERAKHIR 15 NOV",
			"discountFirstYear": "DISKAUN UNTUK<br/>TAHUN PERTAMA",
			"offerTerms": "Lihat syarat tawaran",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ untuk tahun pertama",
			"nextYearPriceString": "Kemudian $PRICE$ untuk tahun seterusnya."
		};
	}
	else if(language_country == 'nb_no')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "FÅ PREMIUM KOSTNADSFRITT DE FØRSTE $TRIAL_PERIOD$",
			"EDIT": "REDIGER",
			"COMPOSE": "MIX",
			"FIX": "RETUSJER",
			"COLLAGE": "MONTASJE",
			"CAPTURE": "TA OPP",
			"editorThemesText": "Redigeringstemaer",
			"editorThemesAbout": "Bli inspirert av fantastiske temaer, slik at du kan lage et mesterverk med ett trykk. Tilpass arbeidet ditt med tekster, klistremerker, kantlinjer og utseender.",
			"selectiveEditingText": "Selektiv redigering",
			"smootheningText": "Glatt hud",
			"smileText": "Smil",
			"selectiveEditingAbout": "Rediger en bestemt del av et bilde. Med Automatisk objektvalg kan du enkelt endre og opprette unike effekter.",
			"smootheningAbout": "Autentisk og naturlig hudutjevning",
			"smileAbout": "Glemte du å smile på et bilde? Ikke noe problem. Legg det til nå.",
			"advancedSpotHealingText": "Avansert reparasjon",
			"advancedSpotHealingAbout": "Du kan raskt fjerne eller klone en del av et bilde. Korriger skjønnhetsfeil med avanserte alternativer.",
			"replaceEyeText": "Erstatt øyne",
			"replaceEyeAbout": "Blunker noen på bildet? Bruk dette til å åpne lukkede øyne for å skape det perfekte bildet.",
			"grabcutMasking": "Automatisk valg",
			"grabcutMaskingAbout": "Lag automatiske utklipp og tilpass etter behov.",
			"layersIncompositionText": "Klipp ut, kombiner, lag",
			"layersIncompositionAbout": "Skap et mesterverk ved bruk av lagredigering og valgverktøy.",
			"collageThemesText": "Montasjetemaer",
			"collageThemesAbout": "Lås opp fantastiske montasjetemaer. Egendefiner montasjen med klistremerker, kantlinjer, layouter, stilige tekster, unike effekter og mer!",
			"scrapBookCollageText": "Utskjæringsmontasje",
			"scrapBookCollageAbout": "Lag visuelt slående montasjer med et enkelt trykk. Stiliser med strøk, tekst, kantlinjer, bakgrunner og mer.",
			"creativeCameraEdits": "Kameraeffekter",
			"creativeCameraEditsAbout": "Ta kreative bilder med levende filtre, realistiske tatoveringer og kunstneriske effekter.",
			"infinteContentText": "Få tilgang til alt Premium-innhold",
			"infinteContentAbout": "Bli kreativ med full tilgang til kreativt innhold med fantastiske utseender, hundrevis av layouter, morsomme klistremerker, kantlinjer, bakgrunner, tekster og mer!",
			"manyMoreText": "… og mange flere kreative funksjoner",
			"buttonPrimary": "Fortsett med $TRIAL_PERIOD$ kostnadsfritt",
			"buttonPrimary2": "Godta og abonner",
			"Continue": "Fortsett",
			"RestorePurchases": "Gjenopprett kjøp",
			"GetTrialText": "Få $TRIAL_PERIOD$ KOSTNADSFRITT, deretter $PRICE$ per $SUBSCRIPTION_PERIOD$",
			"footerText": "Betalingen belastes iTunes-kontoen ved kjøpsbekreftelse. Abonnementet fornyes automatisk med mindre du slår av automatisk fornyelse minst 24 timer før slutten av gjeldende periode. Kontoen din belastes for fornyelsen innen 24 timer før slutten av den gjeldende perioden. Kontoen din belastes $PRICE$ / $SUBSCRIPTION_PERIOD$ for fornyelsen innen 24 timer før slutten av den gjeldende perioden. Du kan behandle eller deaktivere automatisk fornyelse i innstillingene til Apple ID-kontoen når som helst etter kjøpet.",
			"terms": "Bruksvilkår",
			"policy": "Personvernerklæring",
			"yearlyPlan": "12 måneder: $DICOUNTEDPRICE$ per måned",
			"monthlyPlan": "1 måned: $PRICE$ per måned",
			"discountPercentage": "Spar $DISCOUNT$ % per år",
			"totalYearlyPrice": "Totalt $PRICE$",
			"disclaimer": "Ingen forpliktelser. Avslutt når som helst",
			"monthlyPlanBottomDisclaimer": "Ingen binding. Du belastes månedlig til du avslutter abonnementet. Avslutt når som helst i Apple ID-innstillingene",
			"yearlyPlanBottomDisclaimer": "Du belastes årlig til du avslutter abonnementet. Avslutt når som helst i Apple ID-innstillingene",
			"unlockPremiumText": "Få tilgang til premiumfunksjoner og -innhold",
			"yearlySingleProduct": "$PRICE$ per $SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$ per måned)",
			"UnlockPremium": "Lås opp Premium",
			"heading1": "TILBUDET UTLØPER 15. NOV",
			"discountFirstYear": "RABATT FOR DET FØRSTE ÅRET",
			"offerTerms": "Se tilbudsvilkår",
			"bannerDiscountPercentage": "$DISCOUNT$ %",
			"discountedPriceString": "$DISCOUNTED_PRICE$ for det første året",
			"nextYearPriceString": "Deretter $PRICE$ fra og med påfølgende år."
		};
	}
	else if(language_country == 'nl_nl')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "KRIJG GRATIS PREMIUM VOOR DE EERSTE $TRIAL_PERIOD$",
			"EDIT": "BEWERKEN",
			"COMPOSE": "MIX",
			"FIX": "RETOUCHEREN",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "VASTLEGGEN",
			"editorThemesText": "Thema's voor Editor",
			"editorThemesAbout": "Laat u inspireren door verbluffende thema's waarmee u met één tik een meesterwerk maakt. Personaliseer uw creaties met tekst, stickers, randen en looks.",
			"selectiveEditingText": "Selectief bewerken",
			"smootheningText": "Gladde huid",
			"smileText": "Glimlach",
			"selectiveEditingAbout": "Bewerk een specifiek deel van een afbeelding. Met automatische selectie van objecten kunt u gemakkelijk unieke effecten aanpassen en maken.",
			"smootheningAbout": "Authentieke en natuurlijke huidegalisering",
			"smileAbout": "De lach gemist in een foto? Geen punt, voeg deze nu toe.",
			"advancedSpotHealingText": "Geavanceerd retoucheren",
			"advancedSpotHealingAbout": "Verwijder of kloon snel een deel van een afbeelding. Haal oneffenheden weg met geavanceerde opties.",
			"replaceEyeText": "Ogen vervangen",
			"replaceEyeAbout": "Knippert iemand op een foto? Gebruik deze functie om gesloten ogen te openen voor de perfecte foto.",
			"grabcutMasking": "Automatische selectie",
			"grabcutMaskingAbout": "Maak automatische knipsels en pas ze aan naar wens.",
			"layersIncompositionText": "Knippen, combineren, creëren",
			"layersIncompositionAbout": "Maak een meesterwerk met behulp van bewerkings- en selectietools voor lagen.",
			"collageThemesText": "Collagethema's",
			"collageThemesAbout": "Ontgrendel prachtige collagethema's en personaliseer uw collages met stickers, randen, lay-outs, stijlvolle teksten, unieke effecten en meer!",
			"scrapBookCollageText": "Collage van knipsels",
			"scrapBookCollageAbout": "Maak visueel opvallende collages met één tik. Stileer uw creaties met lijnen, tekst, randen, achtergronden en meer.",
			"creativeCameraEdits": "Camera-effecten",
			"creativeCameraEditsAbout": "Maak creatieve foto's met live filters, realistische tatoeages en artistieke effecten.",
			"infinteContentText": "Ontgrendel alle Premium-inhoud",
			"infinteContentAbout": "Wees creatief met volledige toegang tot creatieve inhoud met menglooks, honderden lay-outs, leuke stickers, randen, achtergronden, tekst en meer!",
			"manyMoreText": "...en nog veel meer creatieve functies",
			"buttonPrimary": "Doorgaan met $TRIAL_PERIOD$ gratis",
			"buttonPrimary2": "Akkoord en abonneren",
			"Continue": "Doorgaan",
			"RestorePurchases": "Aankopen herstellen",
			"GetTrialText": "Krijg $TRIAL_PERIOD$ GRATIS, daarna $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Betaling wordt verrekend via uw iTunes-account bij bevestiging van aanschaf. Uw abonnement wordt automatisch verlengd, tenzij automatische verlenging ten minste 24 uur vóór het einde van de huidige periode wordt uitgeschakeld. De verlengingskosten worden 24 uur vóór het einde van de huidige periode in rekening gebracht. Er wordt $PRICE$/$SUBSCRIPTION_PERIOD$ voor verlenging in rekening gebracht binnen 24 uur vóór het einde van de huidige periode. U kunt op elk moment na aanschaf automatische verlenging beheren of uitschakelen in de accountinstellingen van uw Apple ID.",
			"terms": "Gebruiksvoorwaarden",
			"policy": "Privacybeleid",
			"yearlyPlan": "12 maanden: $DICOUNTEDPRICE$/mnd",
			"monthlyPlan": "1 maand: $PRICE$/mnd",
			"discountPercentage": "Bespaar $DISCOUNT$% per jaar",
			"totalYearlyPrice": "Totale $PRICE$",
			"disclaimer": "Geen verbintenissen. U kunt altijd annuleren",
			"monthlyPlanBottomDisclaimer": "Geen verplichting. De kosten worden maandelijks in rekening gebracht, totdat u uw abonnement annuleert. U kunt op elk moment annuleren in uw Apple ID-instelling.",
			"yearlyPlanBottomDisclaimer": "De kosten worden jaarlijks in rekening gebracht, totdat u uw abonnement annuleert. U kunt op elk moment annuleren in uw Apple ID-instelling.",
			"unlockPremiumText": "Ontgrendel premiumfuncties en inhoud.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mnd)",
			"UnlockPremium": "Ontgrendel Premium",
			"heading1": "AANBIEDING EINDIGT OP 15 NOV",
			"discountFirstYear": "KORTING VOOR HET 1E JAAR",
			"offerTerms": "Zie aanbiedingsvoorwaarden",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ voor het eerste jaar",
			"nextYearPriceString": "Daarna $PRICE$."
		};
	}
	else if(language_country == 'ph_ph')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "KUNIN NANG LIBRE ANG PREMIUM PARA SA UNANG $TRIAL_PERIOD$",
			"EDIT": "I-EDIT",
			"COMPOSE": "MIX",
			"FIX": "I-RETOUCH",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "KUMUHA",
			"editorThemesText": "Mga Tema ng Editor",
			"editorThemesAbout": "Mabuhayan ng loob gamit ang mga nakamamanghang tema, na magpapahintulot sa iyong gumawa ng obra-maestra sa iisang pag-tap lang. Gawing personal ang gawa mo gamit ang mga teksto, sticker, border at hitsura.",
			"selectiveEditingText": "Pag-e-edit ng Napili",
			"smootheningText": "Makinis na Balat",
			"smileText": "Ngiti",
			"selectiveEditingAbout": "I-edit ang isang partikular na seksyon ng isang larawan. Pinadadali ng auto object selection na baguhin at lumikha ng mga kakaibang effect.",
			"smootheningAbout": "Tunay at natural na pagkikinis ng balat",
			"smileAbout": "Na-miss ang ngiti sa litrato. Huwag mag-alala, idagdag ito ngayon.",
			"advancedSpotHealingText": "Advance na Paggagamot",
			"advancedSpotHealingAbout": "Mabilis na alisin o doblehin ang isang bahagi ng imahe. Perpektuhin ang mga depekto gamit ang mga makabagong opsyon.",
			"replaceEyeText": "Palitan ang mga Mata",
			"replaceEyeAbout": "May kumurap ba sa litraro? Gamitin ito para buksan ang nakapikit na mga mata, para malikha ang perpektong kuha.",
			"grabcutMasking": "Awtomatikong Pagpili",
			"grabcutMaskingAbout": "Lumikha ng mga awtomatikong cut-out at i-customize kung kinakailangan.",
			"layersIncompositionText": "Gupitin, Pagsamahin, Lumikha",
			"layersIncompositionAbout": "Lumikha ng obra-maestra gamit ang pang-edit ng layer at mga tool sa pagpili.",
			"collageThemesText": "Mga Temang Collage",
			"collageThemesAbout": "I-unlock ang mga kamangha-manghang tema ng collage. Gawing personal ang iyong collage gamit ang mga sticker, border, layout, makabagong teksto, kakaibang epekto, at marami pang iba!",
			"scrapBookCollageText": "Collage ng Cutout",
			"scrapBookCollageAbout": "Lumikha ng mga biswal na nakamamanghang collage sa iisang pag-tap lang. Lagyan ng istilo gamit ang mga stroke, teksto, border, background, at marami pang iba.",
			"creativeCameraEdits": "Mga Effect ng Camera",
			"creativeCameraEditsAbout": "Kumuha ng mga malikhaing larawan gamit ang mga live na filter, makatotohanang tattoo at mga malikhaing effect.",
			"infinteContentText": "I-unlock ang Lahat ng Premium Content",
			"infinteContentAbout": "Maging malikhain gamit ang buong access sa mga malikhaing content na may magkakatugmang hitsura, daan-daang layout, nakakatuwang sticker, border, background, teksto at marami pang iba!",
			"manyMoreText": "…at napakarami pang malikhaing tampok",
			"buttonPrimary": "Magpatuloy sa $TRIAL_PERIOD$ nang libre",
			"buttonPrimary2": "Sumang-ayon at Mag-subscribe",
			"Continue": "Magpatuloy",
			"RestorePurchases": "Ibalik ang mga Binili",
			"GetTrialText": "Kunin ang $TRIAL_PERIOD$ nang LIBRE, tapos $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Sisingilin ang bayad sa iTunes Account kapag kinumpirma ang pagbili. Awtomatikong nagre-renew ang subscription maliban kung naka-off ang auto-renew nang hindi bababa sa 24 na oras bago magtapos ang kasalukuyang panahon. Sisingilin ang iyong account para sa pagre-renew nang 24 na oras bago ang pagtatapos ng kasalukuyang panahon. Sisingilin ang iyong account ng $PRICE$ / $SUBSCRIPTION_PERIOD$ para sa pagre-renew sa loob ng 24 na oras bago ang pagtatapos ng kasalukuyang panahon. Maaari mong pamahalaan o i-off ang auto renew sa Mga Setting ng iyong Apple ID Account anumang oras matapos bumili.",
			"terms": "Mga tuntunin ng paggamit",
			"policy": "Patakaran sa Pagkapribado",
			"yearlyPlan": "12 Buwan: $DICOUNTEDPRICE$/buwan",
			"monthlyPlan": "1 Buwan: $PRICE$/buwan",
			"discountPercentage": "Makatipid ng $DISCOUNT$% kada taon",
			"totalYearlyPrice": "Kabuuang $PRICE$",
			"disclaimer": "Walang pangako. Kanselahin anumang oras",
			"monthlyPlanBottomDisclaimer": "Walang pangako. Buwanan kang sisingilin hanggang kanselahin mo ang subscription mo. Kanselahin anumang oras sa Apple ID setting mo",
			"yearlyPlanBottomDisclaimer": "Taunan kang sisingilin hanggang kanselahin mo ang subscription mo. Kanselahin anumang oras sa Apple ID setting mo",
			"unlockPremiumText": "Mag-unlock ng mga premium na feature at content.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/buwan)",
			"UnlockPremium": "I-unlock ang Premium",
			"heading1": "MATATAPOS ANG ALOK SA NOB 15",
			"discountFirstYear": "DISKUWENTO PARA SA UNANG TAON",
			"offerTerms": "Tingnan ang mga Tuntunin ng Alok",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ para sa ika-1 taon",
			"nextYearPriceString": "Tapos $PRICE$ para sa susunod na mga taon."
		};
	}
	else if(language_country == 'pl_pl')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "UŻYWAJ WERSJI PREMIUM BEZPŁATNIE PRZEZ PIERWSZE $TRIAL_PERIOD$",
			"EDIT": "EDYTUJ",
			"COMPOSE": "MIX",
			"FIX": "RETUSZUJ",
			"COLLAGE": "KOLAŻ",
			"CAPTURE": "PRZECHWYTYWANIE",
			"editorThemesText": "Motywy edytora",
			"editorThemesAbout": "Znajdź inspirację w oszałamiających motywach pozwalających stworzyć arcydzieło jednym dotknięciem. Spersonalizuj swój projekt za pomocą tekstu, naklejek, obramowań i karnacji.",
			"selectiveEditingText": "Selektywna edycja",
			"smootheningText": "Gładka skóra",
			"smileText": "Uśmiech",
			"selectiveEditingAbout": "Edytuj wybraną sekcję zdjęcia. Automatyczny wybór obiektów ułatwia modyfikację i tworzenie unikalnych efektów.",
			"smootheningAbout": "Autentyczne i naturalne wygładzanie skóry",
			"smileAbout": "Poważna twarz na zdjęciu? Nie ma sprawy, dodaj uśmiech teraz.",
			"advancedSpotHealingText": "Zaawansowana korekta",
			"advancedSpotHealingAbout": "Szybko usuń lub sklonuj część obrazu. Udoskonal niedoskonałości za pomocą opcji zaawansowanych.",
			"replaceEyeText": "Otwórz zamknięte oczy",
			"replaceEyeAbout": "Ktoś mrugnął na zdjęciu? Użyj tego, aby otworzyć zamknięte oczy i uzyskać idealne ujęcie.",
			"grabcutMasking": "Automatyczne zaznaczenie",
			"grabcutMaskingAbout": "Twórz automatyczne wycięcia i dostosuj wedle potrzeby.",
			"layersIncompositionText": "Wytnij, połącz, twórz",
			"layersIncompositionAbout": "Utwórz arcydzieło za pomocą narzędzi do edycji i selekcji warstw.",
			"collageThemesText": "Motywy kolażu",
			"collageThemesAbout": "Odblokuj oszałamiające motywy kolaży. Dostosuj swój kolaż za pomocą naklejek, obramowań, układów, stylowych tekstów, unikalnych efektów i nie tylko!",
			"scrapBookCollageText": "Kolaż z wycinanek",
			"scrapBookCollageAbout": "Twórz powalające kolaże jednym dotknięciem. Dodaj im stylu pociągnięciami, tekstem, obramowaniami, tłami i nie tylko.",
			"creativeCameraEdits": "Efekty aparatu",
			"creativeCameraEditsAbout": "Twórz kreatywne zdjęcia za pomocą filtrów na żywo, realistycznych tatuaży i efektów artystycznych.",
			"infinteContentText": "Odblokuj całą zawartość Premium",
			"infinteContentAbout": "Daj upust kreatywności dzięki pełnemu dostępowi do kreatywnej zawartości, w tym mieszaniu karnacji, setkom układów, zabawnym naklejkom, obramowaniom, tłom, tekstowi i nie tylko!",
			"manyMoreText": "...i wiele innych kreatywnych funkcji",
			"buttonPrimary": "Kontynuuj przez $TRIAL_PERIOD$ bezpłatnie",
			"buttonPrimary2": "Wyraź zgodę i subskrybuj",
			"Continue": "Kontynuuj",
			"RestorePurchases": "Przywróć zakupy",
			"GetTrialText": "Otrzymaj $TRIAL_PERIOD$ BEZPŁATNIE, a potem za $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Płatność zostanie naliczona na konto iTunes po potwierdzeniu zakupu. Subskrypcja odnawia się automatycznie, chyba że automatyczne odnawianie wyłączono przynajmniej 24 godziny przed końcem bieżącego okresu. Konto zostanie obciążone kosztem odnowienia w okresie 24 godzin przed końcem obecnego okresu. Konto zostanie obciążone kwotą $PRICE$ / $SUBSCRIPTION_PERIOD$ za odnowienie w okresie 24 godzin przed końcem obecnego okresu. Możesz zarządzać automatycznym odnawianiem lub wyłączyć je w ustawieniach konta Apple ID w dowolnym momencie po dokonaniu zakupu.",
			"terms": "Warunki użytkowania",
			"policy": "Zasady ochrony prywatności",
			"yearlyPlan": "12 miesięcy: $DICOUNTEDPRICE$/mies",
			"monthlyPlan": "1 miesiąc: $PRICE$/mies",
			"discountPercentage": "Oszczędź $DISCOUNT$% rocznie",
			"totalYearlyPrice": "Łącznie $PRICE$",
			"disclaimer": "Bez zobowiązań. Można anulować w każdej chwili",
			"monthlyPlanBottomDisclaimer": "Bez zobowiązań. Opłaty będą naliczane co miesiąc, aż do momentu anulowania subskrypcji. Anuluj w dowolnym momencie w ustawieniach konta Apple ID.",
			"yearlyPlanBottomDisclaimer": "Opłaty będą naliczane co rok, aż do momentu anulowania subskrypcji. Anuluj w dowolnym momencie w ustawieniach konta Apple ID.",
			"unlockPremiumText": "Odblokuj funkcje i zawartość premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mies)",
			"UnlockPremium": "Odblokuj wersję Premium",
			"heading1": "OFERTA KOŃCZY SIĘ 15 LIS",
			"discountFirstYear": "ZNIŻKA ZA PIERWSZY ROK",
			"offerTerms": "Zobacz warunki oferty",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ za pierwszy rok",
			"nextYearPriceString": "Od przyszłego roku w cenie $PRICE$."
		};
	}
	else if(language_country == 'pt_br')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "CONSIGA O PREMIUM GRÁTIS DURANTE OS PRIMEIROS $TRIAL_PERIOD$",
			"EDIT": "EDITAR",
			"COMPOSE": "MIX",
			"FIX": "RETOCAR",
			"COLLAGE": "COLAGEM",
			"CAPTURE": "CAPTURAR",
			"editorThemesText": "Temas do editor",
			"editorThemesAbout": "Inspire-se com temas extraordinários e crie uma obra-prima com um único toque. Personalize seu trabalho com textos, adesivos, bordas e visuais.",
			"selectiveEditingText": "Edição seletiva",
			"smootheningText": "Pele suave",
			"smileText": "Sorriso",
			"selectiveEditingAbout": "Edite uma seção específica da imagem. A seleção automática de objetos facilita a modificação e a criação de efeitos exclusivos.",
			"smootheningAbout": "Suavização de pele autêntica e natural",
			"smileAbout": "Faltou o sorriso em uma foto. Não se preocupe, adicione-o agora.",
			"advancedSpotHealingText": "Recuperação avançada",
			"advancedSpotHealingAbout": "Remova ou clone rapidamente parte de uma imagem. Melhore as imperfeições com as opções avançadas.",
			"replaceEyeText": "Substituir olhos",
			"replaceEyeAbout": "Alguém piscou na hora da foto? Use isso para abrir os olhos fechados e criar a foto perfeita.",
			"grabcutMasking": "Seleção automática",
			"grabcutMaskingAbout": "Crie recortes automáticos e personalize de acordo com suas necessidades.",
			"layersIncompositionText": "Recorte, combine, crie",
			"layersIncompositionAbout": "Crie obras-primas usando ferramentas de edição e seleção de camadas.",
			"collageThemesText": "Temas de colagens",
			"collageThemesAbout": "Desbloqueie temas de colagem impressionantes. Personalize sua colagem com adesivos, bordas, layouts, textos elegantes, efeitos exclusivos e muito mais!",
			"scrapBookCollageText": "Colagem com recorte de arestas",
			"scrapBookCollageAbout": "Crie colagens visualmente impressionantes com um único toque. Estilize com traçados, texto, bordas, planos de fundo e muito mais.",
			"creativeCameraEdits": "Efeitos da câmera",
			"creativeCameraEditsAbout": "Capture fotos criativas com filtros ao vivo, tatuagens realistas e efeitos artísticos.",
			"infinteContentText": "Desbloquear todo o conteúdo Premium",
			"infinteContentAbout": "Seja criativo com acesso total a conteúdos criativos com visuais combinados, centenas de layouts, adesivos divertidos, bordas, planos de fundo, textos e muito mais!",
			"manyMoreText": "...e muitos outros recursos criativos",
			"buttonPrimary": "Continuar com $TRIAL_PERIOD$ grátis",
			"buttonPrimary2": "Aceitar e assinar",
			"Continue": "Continuar",
			"RestorePurchases": "Restaurar compras",
			"GetTrialText": "Consiga $TRIAL_PERIOD$ grátis e, depois, $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "O pagamento será cobrado na conta do iTunes na confirmação da compra. A assinatura será renova automaticamente, a menos que seja renovada automaticamente pelo menos 24 horas antes do final do período atual. A renovação será cobrada na sua conta 24 horas antes do final do período atual. Será cobrado na sua conta o valor de $PRICE$/$SUBSCRIPTION_PERIOD$ pela renovação no prazo de até 24 horas antes do término do período atual. Você pode gerenciar ou desativar a renovação automática nas configurações da sua conta da Apple ID a qualquer momento após a compra.",
			"terms": "Termos de uso",
			"policy": "Política de Privacidade",
			"yearlyPlan": "12 meses: $DICOUNTEDPRICE$/mês",
			"monthlyPlan": "1 mês: $PRICE$/mês",
			"discountPercentage": "Economize $DISCOUNT$% por ano",
			"totalYearlyPrice": "$PRICE$ no total",
			"disclaimer": "Sem compromisso. Cancelar a qualquer momento",
			"monthlyPlanBottomDisclaimer": "Sem compromisso. A cobrança será efetuada mensalmente até a assinatura ser cancelada. Cancele a qualquer momento na configuração da sua Apple ID",
			"yearlyPlanBottomDisclaimer": "A cobrança será efetuada anualmente até a assinatura ser cancelada. Cancele a qualquer momento na configuração da sua Apple ID",
			"unlockPremiumText": "Desbloqueie conteúdo e recursos premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mês)",
			"UnlockPremium": "Desbloquear Premium",
			"heading1": "OFERTA TERMINA EM 15 DE NOV",
			"discountFirstYear": "DESCONTO PELO PRIMEIRO ANO",
			"offerTerms": "Consulte os termos da oferta",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ para o primeiro ano",
			"nextYearPriceString": "Depois $PRICE$ a partir do próximo ano."
		};
	}
	else if(language_country == 'ro_ro')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "OBȚINEȚI PREMIUM GRATUIT PENTRU PRIMELE $TRIAL_PERIOD$",
			"EDIT": "EDITARE",
			"COMPOSE": "MIX",
			"FIX": "RETUŞARE",
			"COLLAGE": "COLAJ",
			"CAPTURE": "CAPTURARE",
			"editorThemesText": "Teme de editor",
			"editorThemesAbout": "Lăsați-vă inspirat cu teme uimitoare, care vă permit să creați capodopere cu o singură atingere. Personalizați-vă munca cu texte, autocolante, margini și aspecte.",
			"selectiveEditingText": "Editare selectivă",
			"smootheningText": "Netezire față",
			"smileText": "Zâmbet",
			"selectiveEditingAbout": "Editați doar o secțiune specifică. Selecția automată a obiectelor ușurează modificarea și crearea efectelor unice.",
			"smootheningAbout": "Netezire autentică și naturală a pielii",
			"smileAbout": "Ați ratat un zâmbet într-o fotografie. Nicio grijă, se poate adăuga acum",
			"advancedSpotHealingText": "Editare avansată",
			"advancedSpotHealingAbout": "Îndepărtați sau clonați rapid o parte dintr-o imagine. Perfecționați imperfecțiunile cu opțiuni avansate.",
			"replaceEyeText": "Înlocuire ochi",
			"replaceEyeAbout": "Cineva clipește într-o fotografie? Utilizați această funcție pentru a deschide ochii închiși și a crea o fotografie perfectă.",
			"grabcutMasking": "Selectare automată",
			"grabcutMaskingAbout": "Creați decupaje automate, pe care le personalizați după nevoie.",
			"layersIncompositionText": "Decupați, combinați și creați",
			"layersIncompositionAbout": "Creați o operă de artă utilizând instrumentele de editare și selecție a straturilor.",
			"collageThemesText": "Teme de colaj",
			"collageThemesAbout": "Deblocați teme de colaj uimitoare. Personalizați-vă colajele cu autocolante, margini, aspecte, texte elegante, efecte unice și multe altele!",
			"scrapBookCollageText": "Colarea decupajelor",
			"scrapBookCollageAbout": "Creați colaje speciale cu o singură atingere. Stilizați cu vopsele speciale, text, margini, fundaluri și multe altele.",
			"creativeCameraEdits": "Efecte foto",
			"creativeCameraEditsAbout": "Captați fotografii creative cu filtre live, tatuaje realiste și efecte artistice.",
			"infinteContentText": "Deblocați tot conținutul Premium",
			"infinteContentAbout": "Lăsați-vă inspirați cu acces complet la elemente creative ca aspecte de blend, sute de modele, autocolante amuzante, margini, fundaluri, texte și multe altele!",
			"manyMoreText": "...și multe alte caracteristici creative",
			"buttonPrimary": "Continuați cu $TRIAL_PERIOD$ gratuit",
			"buttonPrimary2": "Aprobați și abonați-vă",
			"Continue": "Continuare",
			"RestorePurchases": "Restabilire achiziții",
			"GetTrialText": "Primiți $TRIAL_PERIOD$ GRATUIT, apoi cu $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Plata se va percepe din contul iTunes la confirmarea achiziției. Abonamentul se reînnoiește automat, cu excepția cazului în care se reînnoiește automat cu cel puțin 24 de ore înainte de sfârșitul perioadei curente. Prețul de reînnoire se va percepe din contul dvs. în termen de 24 de ore înainte de sfârșitul perioadei curente. Din contul dvs. se va percepe suma de $PRICE$ / $SUBSCRIPTION_PERIOD$ pentru reînnoire, cu 24 de ore înainte de sfârșitul perioadei curente. Puteți gestiona sau dezactiva reînnoirea automată în setările contului dvs. Apple ID, oricând după cumpărare.",
			"terms": "Condițiile de utilizare",
			"policy": "Politica de confidențialitate",
			"yearlyPlan": "12 luni: $DICOUNTEDPRICE$/lună",
			"monthlyPlan": "1 lună: $PRICE$/lună",
			"discountPercentage": "Economisiți $DISCOUNT$% pe an",
			"totalYearlyPrice": "Total $PRICE$",
			"disclaimer": "Fără obligații. Anulați oricând",
			"monthlyPlanBottomDisclaimer": "Nici un angajament. Veți fi taxat lunar până când vă anulați abonamentul. Anulați oricând în setările Apple ID",
			"yearlyPlanBottomDisclaimer": "Veți fi taxat anual până când vă anulați abonamentul. Anulați oricând în setările Apple ID",
			"unlockPremiumText": "Deblocați caracteristici și conținut premium.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/lună)",
			"UnlockPremium": "Deblocați Premium",
			"heading1": "OFERTA SE ÎNCHEIE PE 15 NOIEMBRIE",
			"discountFirstYear": "REDUCERE PENTRU PRIMUL AN",
			"offerTerms": "Vedeți condițiile ofertei",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ pentru primul an",
			"nextYearPriceString": "Apoi $PRICE$ pentru următorii ani."
		};
	}
	else if(language_country == 'ru_ru')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "ПОЛУЧИТЕ ДОСТУП К PREMIUM БЕСПЛАТНО В ТЕЧЕНИЕ ПЕРВЫХ $TRIAL_PERIOD$",
			"EDIT": "РЕДАКТИРОВАТЬ",
			"COMPOSE": "MIX",
			"FIX": "РЕТУШЬ",
			"COLLAGE": "КОЛЛАЖ",
			"CAPTURE": "ЗАХВАТ",
			"editorThemesText": "Темы редактора",
			"editorThemesAbout": "Найдите вдохновение в невероятных темах и создайте шедевр одним касанием. Внесите индивидуальность в работу и добавьте различные стикеры, рамки, фильтры и текст.",
			"selectiveEditingText": "Выборочное редактирование",
			"smootheningText": "Гладкая кожа",
			"smileText": "Улыбка",
			"selectiveEditingAbout": "Редактируйте определенную область изображения. Автоматический выбор объекта позволяет легко изменять и создавать уникальные эффекты.",
			"smootheningAbout": "Естественное сглаживание кожи",
			"smileAbout": "Забыли улыбнуться во время съемки? Добавьте улыбку сейчас!",
			"advancedSpotHealingText": "Улучшенное восстановление",
			"advancedSpotHealingAbout": "Быстро удалите или скопируйте часть изображения. Исправьте недостатки, используя расширенные возможности.",
			"replaceEyeText": "Замена глаз",
			"replaceEyeAbout": "На фотографии кто-то моргнул? Используйте этот инструмент для автоматического открытия глаз, чтобы создать идеальное изображение.",
			"grabcutMasking": "Автовыделение",
			"grabcutMaskingAbout": "Создавайте автоматические аппликации и изменяйте их по мере необходимости.",
			"layersIncompositionText": "Вырезать, Объединить, Создать",
			"layersIncompositionAbout": "Создайте графические шедевры, используя инструменты редактирования и выбора слоев.",
			"collageThemesText": "Темы коллажей",
			"collageThemesAbout": "Откройте для себя потрясающие темы коллажей. Внесите индивидуальность в коллаж с помощью стикеров, рамок, макетов, стильных текстов, уникальных эффектов и многого другого!",
			"scrapBookCollageText": "Коллаж",
			"scrapBookCollageAbout": "Создавайте яркие коллажи одним нажатием. Добавьте стиль с помощью штрихов, текста, рамок, фона и многого другого.",
			"creativeCameraEdits": "Эффекты камеры",
			"creativeCameraEditsAbout": "Создавайте креативные фотографии, добавляя фильтры, реалистичные татуировки и художественные эффекты.",
			"infinteContentText": "Разблокировать все содержимое версии Premium",
			"infinteContentAbout": "Проявите творческий подход, используя целый ряд креативных инструментов: фильтры, сотни макетов, забавные наклейки, рамки, фоны, тексты и многое другое!",
			"manyMoreText": "...и много других функций для творчества",
			"buttonPrimary": "Продолжить с бесплатной пробной версией в течение $TRIAL_PERIOD$",
			"buttonPrimary2": "Принять и оформить подписку",
			"Continue": "Продолжить",
			"RestorePurchases": "Восстановить покупки",
			"GetTrialText": "Пользуйтесь БЕСПЛАТНО в течение $TRIAL_PERIOD$, затем оплата составит $PRICE$ в $SUBSCRIPTION_PERIOD$",
			"footerText": "Оплата будет снята с учетной записи iTunes при подтверждении покупки. Подписка автоматически продлевается, если автоматическое продление не отключено по крайней мере за 24 часа до окончания текущего периода. С вашего счета будет снята плата за продление в течение 24 часов до окончания текущего периода. С вашего счета будет взиматься оплата за продление в размере $PRICE$ в $SUBSCRIPTION_PERIOD$ в течение 24 часов до окончания текущего периода. Вы можете управлять автоматическим продлением или отключить его в настройках учетной записи Apple ID в любое время после покупки.",
			"terms": "Условия использования",
			"policy": "Политика конфиденциальности",
			"yearlyPlan": "12 месяцев: $DICOUNTEDPRICE$ в месяц",
			"monthlyPlan": "1 месяц: $PRICE$ в месяц",
			"discountPercentage": "Экономия $DISCOUNT$% в год",
			"totalYearlyPrice": "Всего $PRICE$",
			"disclaimer": "Никаких обязательств. Возможность отмены в любое время.",
			"monthlyPlanBottomDisclaimer": "Никаких обязательств. Плата будет списываться каждый месяц, пока вы не отмените подписку. Отмена возможна в любой момент в настройках Apple ID",
			"yearlyPlanBottomDisclaimer": "Плата будет списываться каждый год, пока вы не отмените подписку. Отмена возможна в любой момент в настройках Apple ID",
			"unlockPremiumText": "Разблокируйте премиум-функции и содержимое.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$ в месяц)",
			"UnlockPremium": "Разблокировать Premium",
			"heading1": "ПРЕДЛОЖЕНИЕ ДЕЙСТВУЕТ ДО 15 НОЯБРЯ",
			"discountFirstYear": "СКИДКА ЗА ПЕРВЫЙ ГОД",
			"offerTerms": "См. условия предложения",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ за первый год",
			"nextYearPriceString": "Затем $PRICE$ со следующего года."
		};
	}
	else if(language_country == 'sv_se')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "FÅ PREMIUM KOSTNADSFRITT DE FÖRSTA $TRIAL_PERIOD$",
			"EDIT": "REDIGERA",
			"COMPOSE": "MIX",
			"FIX": "RETUSCHERA",
			"COLLAGE": "KOLLAGE",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Temaredigeraren",
			"editorThemesAbout": "Bli inspirerad av fantastiska teman som låter dig skapa ett mästerverk med ett enda knapptryck. Anpassa arbetet med texter, klistermärken, kanter och looks.",
			"selectiveEditingText": "Selektiv redigering",
			"smootheningText": "Utjämna hud",
			"smileText": "Leende",
			"selectiveEditingAbout": "Redigera en viss del av en bild. Automatiskt objektval gör det enkelt att ändra och skapa unika effekter.",
			"smootheningAbout": "Autentisk och naturlig hudutjämning",
			"smileAbout": "Missade du ett leende i ett foto? Inga bekymmer, lägg till det nu.",
			"advancedSpotHealingText": "Avancerat helande",
			"advancedSpotHealingAbout": "Ta bort eller klona en del av en bild snabbt. Gör smådefekterna perfekta med avancerade alternativ.",
			"replaceEyeText": "Byt ögon",
			"replaceEyeAbout": "Blinkar någon på ett foto? Använd detta för att öppna stängda ögon och skapa den perfekta bilden.",
			"grabcutMasking": "Automatiskt val",
			"grabcutMaskingAbout": "Skapa automatiska utskärningar och anpassa efter behov.",
			"layersIncompositionText": "Klipp ut, kombinera, skapa",
			"layersIncompositionAbout": "Skapa ett mästerverk med verktyg för lagerredigering och urval.",
			"collageThemesText": "Kollageteman",
			"collageThemesAbout": "Lås upp fantastiska kollageteman. Anpassa kollagen med klistermärken, kanter, layouter, snygga texter, unika effekter och mycket mer!",
			"scrapBookCollageText": "Utstansa Kollage",
			"scrapBookCollageAbout": "Skapa visuellt slående kollage med ett enda tryck. Stilisera med linjer, text, kanter, bakgrunder med mera.",
			"creativeCameraEdits": "Kameraeffekter",
			"creativeCameraEditsAbout": "Få kreativa foton med realtidsfilter, realistiska tatueringar och konstnärliga effekter.",
			"infinteContentText": "Lås upp allt Premium-innehåll",
			"infinteContentAbout": "Bli kreativ med fullständig tillgång till kreativt innehåll med blandade looks, hundratals layouter, roliga klistermärken, kanter, bakgrunder, texter med mera!",
			"manyMoreText": "...och många fler kreativa funktioner",
			"buttonPrimary": "Fortsätt med $TRIAL_PERIOD$ utan kostnad",
			"buttonPrimary2": "Godkänn och prenumerera",
			"Continue": "Fortsätt",
			"RestorePurchases": "Återställ köp",
			"GetTrialText": "Få $TRIAL_PERIOD$ KOSTNADSFRITT, sedan $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Betalningen debiteras på iTunes-kontot vid inköpsbekräftelsen. Prenumerationen förnyas automatiskt om inte automatisk förnyelse inaktiveras minst 24 timmar innan den aktuella perioden upphör. Kontot debiteras för förnyelse inom 24 timmar innan den aktuella perioden upphör. Ditt konto debiteras $PRICE$ / $SUBSCRIPTION_PERIOD$ för förnyelse inom 24 timmar innan den aktuella perioden upphör. Du kan hantera eller inaktivera automatisk förnyelse i Apple ID-kontoinställningarna när som helst efter köpet.",
			"terms": "Användarvillkor",
			"policy": "Sekretesspolicy",
			"yearlyPlan": "12 månader: $DICOUNTEDPRICE$/mån",
			"monthlyPlan": "1 månad: $PRICE$/mån",
			"discountPercentage": "Spara $DISCOUNT$ % per år",
			"totalYearlyPrice": "Totalt $PRICE$",
			"disclaimer": "Ingen förpliktelse. Ingen bindningstid.",
			"monthlyPlanBottomDisclaimer": "Inga förpliktelser. Du debiteras varje månad tills du säger upp prenumerationen. Avsluta när som helst i Apple ID-inställningarna.",
			"yearlyPlanBottomDisclaimer": "Du debiteras varje år tills du säger upp prenumerationen. Avsluta när som helst i Apple ID-inställningarna.",
			"unlockPremiumText": "Lås upp premiumfunktioner och innehåll.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mån)",
			"UnlockPremium": "Lås upp Premium",
			"heading1": "ERBJUDANDET GÄLLER TILL 15 NOV",
			"discountFirstYear": "RABATT FÖR DET FÖRSTA ÅRET",
			"offerTerms": "Se villkor för erbjudandet",
			"bannerDiscountPercentage": "$DISCOUNT$ %",
			"discountedPriceString": "$DISCOUNTED_PRICE$ för det första året",
			"nextYearPriceString": "Därefter $PRICE$ från och med nästa år."
		};
	}
	else if(language_country == 'th_th')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "รับสิทธิ์ใช้งานแบบพรีเมียมฟรีใน $TRIAL_PERIOD$แรก",
			"EDIT": "แก้ไข",
			"COMPOSE": "MIX",
			"FIX": "รีทัช",
			"COLLAGE": "ภาพตัดปะ",
			"CAPTURE": "จับภาพ",
			"editorThemesText": "ธีมเครื่องมือแก้ไขภาพ",
			"editorThemesAbout": "รับแรงบันดาลใจจากธีมที่น่าตื่นตาที่ทำให้คุณสร้างสรรค์ผลงานชิ้นโบว์แดงได้โดยการแตะเพียงครั้งเดียว ปรับแต่งงานให้เป็นตัวคุณมากขึ้นโดยใช้ข้อความ สติกเกอร์ ขอบภาพ และลุคต่างๆ",
			"selectiveEditingText": "แก้ไขเฉพาะส่วน",
			"smootheningText": "ผิวเรียบเนียน",
			"smileText": "ยิ้ม",
			"selectiveEditingAbout": "แก้ไขส่วนใดส่วนหนึ่งของรูปภาพ คุณสมบัติการเลือกวัตถุอัตโนมัติทำให้คุณสามารถแก้ไขและใส่เอฟเฟกต์ที่ไม่เหมือนใครได้อย่างง่ายดาย",
			"smootheningAbout": "ปรับผิวเรียบเนียนดูสมจริงและเป็นธรรมชาติ",
			"smileAbout": "ลืมยิ้มตอนถ่ายรูป ก็ไม่เป็นไร เพิ่มได้เลย",
			"advancedSpotHealingText": "การแก้ไขตำหนิขั้นสูง",
			"advancedSpotHealingAbout": "ลบหรือลอกแบบส่วนใดส่วนหนึ่งของภาพ ใช้ตัวเลือกขั้นสูงเพื่อปรับแต่งจุดที่ไม่สมบูรณ์แบบให้สมบูรณ์แบบ",
			"replaceEyeText": "เปลี่ยนดวงตา",
			"replaceEyeAbout": "มีคนในรูปกะพริบตาใช่ไหม ใช้ฟังก์ชันนี้เพื่อทำให้คนในรูปลืมตา และทำให้ได้รูปภาพที่สมบูรณ์แบบ",
			"grabcutMasking": "เลือกโดยอัตโนมัติ",
			"grabcutMaskingAbout": "สร้างการตัดออกโดยอัตโนมัติและปรับแต่งตามใจชอบ",
			"layersIncompositionText": "ตัดออก, ผสาน, สร้าง",
			"layersIncompositionAbout": "สร้างผลงานชิ้นเอกโดยใช้การแก้ไขเลเยอร์และเครื่องมือการเลือก",
			"collageThemesText": "ธีมภาพตัดแปะ",
			"collageThemesAbout": "ปลดล็อกธีมภาพตัดปะอันน่าทึ่ง ปรับแต่งภาพตัดปะของคุณเป็นแบบเฉพาะตัวโดยใช้สติกเกอร์ ขอบภาพ การจัดวาง ข้อความเก๋ๆ เอฟเฟกต์ที่ไม่เหมือนใครและอื่นๆ อีกมากมาย!",
			"scrapBookCollageText": "ภาพตัดปะแบบตัดออก",
			"scrapBookCollageAbout": "สร้างภาพตัดปะที่สวยงามสะกดสายตาได้เพียงแตะครั้งเดียว สร้างสไตล์ต่างๆ โดยใช้การลากเส้น ข้อความ ขอบภาพ พื้นหลังและอื่นๆ อีกมากมาย",
			"creativeCameraEdits": "เอฟเฟ็กต์กล้อง",
			"creativeCameraEditsAbout": "ถ่ายรูปอย่างสร้างสรรค์โดยใช้ไลฟ์ฟิลเตอร์ รอยสักที่สมจริงและเอฟเฟกต์ภาพศิลป์อื่นๆ",
			"infinteContentText": "ปลดล็อกเนื้อหาพรีเมียมทั้งหมด",
			"infinteContentAbout": "ปลดปล่อยความคิดสร้างสรรค์ด้วยการเข้าถึงเนื้อหาที่สร้างสรรค์ได้อย่างเต็มที่ ไม่ว่าจะเป็นลุคที่ผสมผสานกัน เลย์เอาท์นับร้อยแบบ สติกเกอร์สนุกๆ ขอบภาพ พื้นหลัง ข้อความและอื่นๆ อีกมากมาย!",
			"manyMoreText": "...และคุณสมบัติสร้างสรรค์อื่น ๆ อีกมากมาย",
			"buttonPrimary": "ดำเนินการต่อด้วยช่วงทดลองใช้ฟรี $TRIAL_PERIOD$",
			"buttonPrimary2": "ยอมรับและสมัครใช้บริการ",
			"Continue": "ดำเนินการต่อ",
			"RestorePurchases": "คืนค่าการซื้อ",
			"GetTrialText": "รับ $TRIAL_PERIOD$ จากนั้นใช้งานต่อในราคา $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "จะมีการเรียกเก็บค่าบริการจากบัญชี ITunes เมื่อยืนยันการซื้อ จะมีการต่ออายุการบอกรับเป็นสมาชิกโดยอัตโนมัติ เว้นเสียแต่ว่ามีการปิดตัวเลือกการต่ออายุการบอกรับเป็นสมาชิกอัตโนมัติล่วงหน้าอย่างน้อย 24 ชั่วโมงก่อนสิ้นสุดรอบระยะเวลาปัจจุบัน จะมีการเรียบเก็บค่าต่ออายุการบอกรับเป็นสมาชิกจากบัญชีของคุณภายในระยะเวลา 24 ชั่วโมงก่อนสิ้นสุดรอบระยะเวลาปัจจุบัน บัญชีของคุณจะถูกเรียกเก็บเงิน $PRICE$ / $SUBSCRIPTION_PERIOD$ เพื่อเป็นค่าต่ออายุการบอกรับเป็นสมาชิกภายในระยะเวลา 24 ชั่วโมงก่อนสิ้นสุดรอบระยะเวลาปัจจุบัน คุณสามารถจัดการหรือปิดตัวเลือกการต่ออายุการบอกรับเป็นสมาชิกโดยอัตโนมัติในการตั้งค่าบัญชี Apple ID เมื่อใดก็ได้หลังจากที่ดำเนินการซื้อเรียบร้อยแล้ว",
			"terms": "ข้อกำหนดในการใช้งาน",
			"policy": "นโยบายความเป็นส่วนตัว",
			"yearlyPlan": "12 เดือน: $DICOUNTEDPRICE$/เดือน",
			"monthlyPlan": "1 เดือน: $PRICE$/เดือน",
			"discountPercentage": "ประหยัด $DISCOUNT$% ต่อปี",
			"totalYearlyPrice": "ทั้งหมด $PRICE$",
			"disclaimer": "ไม่มีข้อผูกมัด ยกเลิกได้ทุกเมื่อ",
			"monthlyPlanBottomDisclaimer": "ไม่มีข้อผูกพัน ระบบจะเรียกเก็บเงินคุณทุกเดือนจนกว่าจะยกเลิกการสมัครใช้บริการ โดยยกเลิกได้ทุกเมื่อในการตั้งค่า Apple ID ของคุณ",
			"yearlyPlanBottomDisclaimer": "ระบบจะเรียกเก็บเงินคุณทุกปีจนกว่าจะยกเลิกการสมัครใช้บริการ โดยยกเลิกได้ทุกเมื่อในการตั้งค่า Apple ID ของคุณ",
			"unlockPremiumText": "ปลดล็อกคุณสมบัติและเนื้อหาพรีเมียม",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/เดือน)",
			"UnlockPremium": "ปลดล็อกการใช้งานแบบพรีเมียม",
			"heading1": "ข้อเสนอสิ้นสุดวันที่ 15 พฤศจิกายน",
			"discountFirstYear": "ส่วนลดสำหรับปีแรก",
			"offerTerms": "ดูเงื่อนไขข้อเสนอ",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ สำหรับปีแรก",
			"nextYearPriceString": "จากนั้นจ่าย $PRICE$ ตั้งแต่ปีถัดไป"
		};
	}
	else if(language_country == 'tr_tr')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "İLK $TRIAL_PERIOD$ için ÜCRETSİZ PREMIUM EDİNİN",
			"EDIT": "DÜZENLE",
			"COMPOSE": "MIX",
			"FIX": "RÖTUŞ",
			"COLLAGE": "KOLAJ",
			"CAPTURE": "YAKALAYIN",
			"editorThemesText": "Editör Temaları",
			"editorThemesAbout": "Tek bir dokunuşla başyapıtlar oluşturmanıza olanak sağlayan çarpıcı temalardan ilham alın. Çalışmanızı metinler, çıkartmalar, kenarlıklar ve görünümlerle kişiselleştirin. ",
			"selectiveEditingText": "Seçmeli Düzenleme",
			"smootheningText": "Pürüzsüz Cilt",
			"smileText": "Gülümseme",
			"selectiveEditingAbout": "Görüntünün belirli bir bölümünü düzenleyin. Otomatik nesne seçimi, benzersiz efektleri değiştirmeyi ve oluşturmayı kolaylaştırır.",
			"smootheningAbout": "Otantik ve doğal cilt pürüzsüzleştirme",
			"smileAbout": "Fotoğrafta gülümsemeyi mi unuttunuz? Endişelenmeyin, şimdi ekleyebilirsiniz.",
			"advancedSpotHealingText": "Gelişmiş İyileştirme",
			"advancedSpotHealingAbout": "Görüntünün bir bölümünü hızlıca kaldırın veya klonlayın. Gelişmiş seçenekler ile kusurları düzeltin.",
			"replaceEyeText": "Gözleri Değiştir",
			"replaceEyeAbout": "Biri fotoğrafta göz mü kırptı? Kusursuz bir fotoğraf için kapalı gözleri bu özelliği kullanarak açın.",
			"grabcutMasking": "Otomatik Seçim",
			"grabcutMaskingAbout": "Otomatik kesimler oluşturun ve istediğiniz şekilde özelleştirin.",
			"layersIncompositionText": "Kes, Birleştir, Oluştur",
			"layersIncompositionAbout": "Katman düzenleme ve seçme araçları ile bir şaheser oluşturun.",
			"collageThemesText": "Kolaj Temaları",
			"collageThemesAbout": "Çarpıcı kolaj temalarını açın. Kolajınızı çıkartma, kenarlık, düzenler, şık metinler, benzersiz efektler ve daha fazlasıyla kişiselleştirin!",
			"scrapBookCollageText": "Kolaj Oluşturma",
			"scrapBookCollageAbout": "Tek bir dokunuşla görsel olarak çarpıcı kolajlar oluşturun. Konturlar, metinler, kenarlıklar, arka planlar ve daha fazlasıyla stilize edin.",
			"creativeCameraEdits": "Kamera Efektleri",
			"creativeCameraEditsAbout": "Canlı filtreler, gerçekçi dövmeler ve sanatsal efektlerle yaratıcı fotoğraflar çekin.",
			"infinteContentText": "Tüm Premium İçeriğe Erişin",
			"infinteContentAbout": "Görünümleri harmanlama özellikleri, yüzlerce düzen, eğlenceli çıkartmalar, kenarlıklar, arka planlar, metinler ve daha fazlasına tam erişimle yaratıcılığınızı gösterin!",
			"manyMoreText": "... ve daha birçok yaratıcı özellik",
			"buttonPrimary": "$TRIAL_PERIOD$ ücretsiz kullanın",
			"buttonPrimary2": "Kabul et ve Abone ol",
			"Continue": "Devam",
			"RestorePurchases": "Satın Almaları Geri Yükle",
			"GetTrialText": "$TRIAL_PERIOD$ ÜCRETSİZ, ardından $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Satın alma onayından sonra ödeme iTunes Hesabı'ndan tahsil edilecektir. Geçerli dönem bitiminden en az 24 saat öncesinde otomatik yenileme kapatılmadığı sürece abonelik otomatik olarak yenilenir. Geçerli dönemin bitiminden 24 saat önce hesabınızdan yenileme ücreti alınacaktır. Geçerli dönem sona ermeden önceki son 24 saat içinde yenileme için hesabınızdan $PRICE$ / $SUBSCRIPTION_PERIOD$ tahsil edilecektir. Satın alma işleminden sonra Apple ID Hesap Ayarlarınızdaki otomatik yenilemeyi yönetebilir veya kapatabilirsiniz.",
			"terms": "Kullanım koşulları",
			"policy": "Gizlilik Politikası",
			"yearlyPlan": "12 Ay: $DICOUNTEDPRICE$ / ay",
			"monthlyPlan": "1 Ay: $PRICE$ / ay",
			"discountPercentage": "Yıllık %$DISCOUNT$ tasarruf edin",
			"totalYearlyPrice": "Toplam $PRICE$",
			"disclaimer": "Taahhüt Yok. İstediğiniz Zaman İptal Edin",
			"monthlyPlanBottomDisclaimer": "Taahhüt yok. Aboneliğinizi iptal edene kadar aylık olarak ücretlendirilirsiniz. Apple Kimliği ayarınızda istediğiniz zaman iptal edin",
			"yearlyPlanBottomDisclaimer": "Aboneliğinizi iptal edene kadar yıllık olarak ücretlendirilirsiniz. Apple Kimliği ayarınızda istediğiniz zaman iptal edin",
			"unlockPremiumText": "Premium özelliklere ve içeriklere erişin.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$ / ay)",
			"UnlockPremium": "Premium'un Kilidini Açın",
			"heading1": "TEKLİF 15 KASIM'DA SONA ERİYOR",
			"discountFirstYear": "1. YIL İNDİRİMİ",
			"offerTerms": "Teklif şartlarını görün",
			"bannerDiscountPercentage": "%$DISCOUNT$",
			"discountedPriceString": "İlk yıl için $DISCOUNTED_PRICE$",
			"nextYearPriceString": "Ardından, gelecek yıldan itibaren $PRICE$."
		};
	}
	else if(language_country == 'uk_ua')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "ОТРИМАТИ ПРЕМІУМ-ВЕРСІЮ БЕЗКОШТОВНО НА ПЕРШІ $TRIAL_PERIOD$",
			"EDIT": "РЕДАГУВАТИ",
			"COMPOSE": "MIX",
			"FIX": "РЕТУШ",
			"COLLAGE": "КОЛАЖ",
			"CAPTURE": "ФОТОГРАФІЯ",
			"editorThemesText": "Теми редактора",
			"editorThemesAbout": "Надихайтеся приголомшливими темами, що дозволяють вам створити шедевр одним дотиком. Персоналізуйте свою роботу, використовуючи тексти, стікери, рамки та зміни зовнішнього вигляду.",
			"selectiveEditingText": "Вибіркове редагування",
			"smootheningText": "Гладка шкіра",
			"smileText": "Посмішка",
			"selectiveEditingAbout": "Редагуйте певну частину зображення. Автоматичний вибір об’єктів дозволяє легко змінювати та створювати унікальні ефекти.",
			"smootheningAbout": "Справжнє і природне розгладження шкіри",
			"smileAbout": "Якщо ви забули посміхнутися під час фотографування, додайте посмішку зараз.",
			"advancedSpotHealingText": "Розширена функція відновлення",
			"advancedSpotHealingAbout": "Швидко видаляйте або копіюйте частину зображення. Удосконалюйте недоліки за допомогою додаткових опцій.",
			"replaceEyeText": "Замінити очі",
			"replaceEyeAbout": "Хтось моргнув на фото? Використовуйте цю опцію, щоб відкрити закриті очі та створити ідеальний кадр.",
			"grabcutMasking": "Автоматичний вибір",
			"grabcutMaskingAbout": "Створюйте автоматичні моделі та налаштовуйте їх за бажанням.",
			"layersIncompositionText": "Вирізайте, поєднуйте та створюйте",
			"layersIncompositionAbout": "Створюйте шедеври за допомогою інструментів редагування та вибору шарів.",
			"collageThemesText": "Теми колажів",
			"collageThemesAbout": "Розблокуйте приголомшливі теми колажів. Персоналізуйте свій колаж за допомогою стікерів, рамок, макетів, стильних текстів, унікальних ефектів тощо!",
			"scrapBookCollageText": "Виріз колажу",
			"scrapBookCollageAbout": "Створюйте візуально вражаючі колажі одним дотиком. Стилізуйте їх за допомогою рис, тексту, рамок, фонів та багато іншого.",
			"creativeCameraEdits": "Ефекти камери",
			"creativeCameraEditsAbout": "Створюйте креативні фото за допомогою динамічних фільтрів, реалістичних татуювань та художніх ефектів.",
			"infinteContentText": "Розблокувати увесь преміум-контент",
			"infinteContentAbout": "Виявіть свій творчий потенціал, маючи повний доступ до креативного контенту, змішуючи вигляди, сотні макетів, цікаві стікери, рамки, фони, тексти та багато іншого!",
			"manyMoreText": "... і багато інших креативних функцій.",
			"buttonPrimary": "Продовжуйте $TRIAL_PERIOD$ безкоштовно",
			"buttonPrimary2": "Погодитися і підписатися",
			"Continue": "Продовжити",
			"RestorePurchases": "Відновити покупки",
			"GetTrialText": "Отримати $TRIAL_PERIOD$ БЕЗКОШТОВНО, потім $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Плату буде стягнуто з облікового запису iTunes під час підтвердження покупки. Підписку автоматично відновлюється, якщо автоматичне поновлення не відбувається принаймні за 24 години до закінчення поточного періоду. Плату за поновлення буде стягнуто з Вашого облікового запису за 24 години до закінчення поточного періоду. З Вашого облікового запису буде стягнено $PRICE$ / $SUBSCRIPTION_PERIOD$ за поновлення за 24 годин до закінчення поточного періоду. Ви можете керувати автоматичним оновленням або вимкнути його в налаштуваннях облікового запису Apple ID у будь-який час після покупки.",
			"terms": "Умови використання",
			"policy": "Політика конфіденційності",
			"yearlyPlan": "12 місяців: $DICOUNTEDPRICE$/місяць",
			"monthlyPlan": "1 місяць: $PRICE$/місяць",
			"discountPercentage": "Збережіть $DISCOUNT$% щорічно",
			"totalYearlyPrice": "Загальна сума $PRICE$",
			"disclaimer": "Жодних зобов'язань. Скасувати в будь-який час",
			"monthlyPlanBottomDisclaimer": "Жодних зобов'язань. Плата стягуватиметься щомісяця до тих пір, поки ви не скасуєте підписку. Скасувати підписку можна в будь-який час в налаштуваннях Apple ID",
			"yearlyPlanBottomDisclaimer": "Плата стягуватиметься щорічно до тих пір, поки ви не скасуєте підписку. Скасувати підписку можна в будь-який час в налаштуваннях Apple ID",
			"unlockPremiumText": "Розблокуйте преміум-зміст та контент. ",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/місяць)",
			"UnlockPremium": "Розблокувати версію Premium",
			"heading1": "ПРОПОЗИЦІЯ ДІЄ ДО 15 ЛИСТОПАДА",
			"discountFirstYear": "ЗНИЖКА НА 1-Й РІК",
			"offerTerms": "Дивіться умови пропозиції",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ на 1-й рік",
			"nextYearPriceString": "Потім $PRICE$ з наступного року."
		};
	}
	else if(language_country == 'vi_vn')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "NHẬN PREMIUM MIỄN PHÍ CHO $TRIAL_PERIOD$ ĐẦU TIÊN",
			"EDIT": "CHỈNH SỬA",
			"COMPOSE": "MIX",
			"FIX": "SỬA ẢNH",
			"COLLAGE": "GHÉP ẢNH",
			"CAPTURE": "CHỤP",
			"editorThemesText": "Chủ đề Biên tập",
			"editorThemesAbout": "Tìm cảm hứng với những chủ đề tuyệt đẹp, cho phép bạn tạo nên một kiệt tác chỉ bằng một lần nhấn. Cá nhân hóa hình ảnh của bạn bằng văn bản, hình dán, đường viền và giao diện.",
			"selectiveEditingText": "Chỉnh sửa có chọn lọc",
			"smootheningText": "Làm mịn da",
			"smileText": "Nụ cười",
			"selectiveEditingAbout": "Chỉnh sửa một phần cụ thể của hình ảnh. Lựa chọn đối tượng tự động giúp bạn dễ dàng chỉnh sửa và tạo hiệu ứng độc đáo.",
			"smootheningAbout": "Làm mịn da chân thực và tự nhiên",
			"smileAbout": "Bỏ lỡ khoảnh khắc nụ cười trong một bức ảnh. Không sao cả, hãy thêm nụ cười ngay bây giờ.",
			"advancedSpotHealingText": "Khắc phục nâng cao",
			"advancedSpotHealingAbout": "Nhanh chóng xóa hoặc sao chép một phần của hình ảnh. Sửa chữa các khiếm khuyết bằng các tùy chọn nâng cao.",
			"replaceEyeText": "Thay thế Mắt",
			"replaceEyeAbout": "Có ai đó bị nháy mắt trong bức ảnh? Hãy sử dụng công cụ này để mở mắt nhắm để tạo hình ảnh hoàn hảo.",
			"grabcutMasking": "Tự động Lựa chọn",
			"grabcutMaskingAbout": "Tạo hình cắt tự động và tùy chỉnh nếu cần.",
			"layersIncompositionText": "Cắt, Kết hợp, Tạo",
			"layersIncompositionAbout": "Tạo một tác phẩm sử dụng các công cụ lựa chọn và chỉnh sửa lớp.",
			"collageThemesText": "Chủ đề ảnh ghép",
			"collageThemesAbout": "Mở khóa các chủ đề ảnh ghép tuyệt đẹp. Cá nhân hóa ảnh ghép của bạn bằng hình dán, đường viền, bố cục, văn bản phong cách, hiệu ứng độc đáo và nhiều hơn thế!",
			"scrapBookCollageText": "Ghép hình cắt",
			"scrapBookCollageAbout": "Tạo hình ghép ấn tượng chỉ với một lần nhấn. Tạo phong cách với những đường thẳng, văn bản, đường viền, hình nền và nhiều hơn thế.",
			"creativeCameraEdits": "Hiệu ứng camera",
			"creativeCameraEditsAbout": "Chụp những bức ảnh sáng tạo với bộ lọc trực tiếp, hình xăm thực sự và hiệu ứng nghệ thuật.",
			"infinteContentText": "Mở khóa Tất cả Nội dung Premium",
			"infinteContentAbout": "Sáng tạo với toàn quyền truy cập nội dung sáng tạo, bao gồm các giao diện pha trộn, hàng trăm bố cục, hình dán thú vị, đường viền, ảnh nền, văn bản và nhiều hơn thế!",
			"manyMoreText": "...và nhiều tính năng sáng tạo khác",
			"buttonPrimary": "Tiếp tục với $TRIAL_PERIOD$ miễn phí",
			"buttonPrimary2": "Đồng ý và đăng ký",
			"Continue": "Tiếp tục",
			"RestorePurchases": "Khôi phục giao dịch mua",
			"GetTrialText": "Nhận $TRIAL_PERIOD$ MIỄN PHÍ, sau đó đăng ký với mức phí $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "Thanh toán sẽ được tính vào Tài khoản iTunes khi xác nhận mua. Đăng ký tự động gia hạn trừ khi tự động gia hạn bị tắt ít nhất 24 giờ trước khi kết thúc giai đoạn hiện tại. Tài khoản của bạn sẽ được tính phí gia hạn trong vòng 24 giờ trước khi kết thúc giai đoạn hiện tại. Tài khoản của bạn sẽ bị tính phí $PRICE$ / $SUBSCRIPTION_PERIOD$ để gia hạn trong vòng 24 giờ trước khi kết thúc giai đoạn hiện tại. Bạn có thể quản lý hoặc tắt tự động gia hạn trong Cài đặt Tài khoản Apple ID của mình bất cứ lúc nào sau khi mua.",
			"terms": "Điều khoản sử dụng",
			"policy": "Chính sách quyền riêng tư",
			"yearlyPlan": "12 Tháng: $DICOUNTEDPRICE$/tháng",
			"monthlyPlan": "1 Tháng: $PRICE$/tháng",
			"discountPercentage": "Tiết kiệm $DISCOUNT$% mỗi năm",
			"totalYearlyPrice": "Tổng $PRICE$",
			"disclaimer": "Không cần cam kết. Hủy bất kỳ lúc nào",
			"monthlyPlanBottomDisclaimer": "Không cần cam kết. Bạn sẽ được tính phí hàng tháng cho đến khi bạn hủy đăng ký của mình. Hủy bất kỳ lúc nào trong cài đặt Apple ID của bạn",
			"yearlyPlanBottomDisclaimer": "Bạn sẽ được tính phí hàng năm cho đến khi bạn hủy đăng ký của mình. Hủy bất kỳ lúc nào trong cài đặt Apple ID của bạn",
			"unlockPremiumText": "Mở khóa tính năng và nội dung cao cấp.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/tháng)",
			"UnlockPremium": "Mở khóa Premium",
			"heading1": "ƯU ĐÃI KẾT THÚC NGÀY 15 THÁNG 11",
			"discountFirstYear": "KHUYẾN MÃI CHO NĂM ĐẦU TIÊN",
			"offerTerms": "Xem điều khoản của ưu đãi",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ cho năm đầu tiên",
			"nextYearPriceString": "Sau đó $PRICE$ từ năm tiếp theo trở đi."
		};
	}
	else if(language_country == 'zh_cn')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "获取 Premium，前 $TRIAL_PERIOD$免费试用",
			"EDIT": "编辑",
			"COMPOSE": "MIX",
			"FIX": "美颜",
			"COLLAGE": "拼贴画",
			"CAPTURE": "拍摄",
			"editorThemesText": "编辑器主题",
			"editorThemesAbout": "多款酷炫主题，激发创作灵感，佳作一键完成。借助文本、贴纸、边框和外观，打造个性化风格。",
			"selectiveEditingText": "选择性编辑",
			"smootheningText": "光滑美肌",
			"smileText": "微笑",
			"selectiveEditingAbout": "编辑图像的特定部分。利用自动对象选择可轻松修改和创建独特的图像效果。",
			"smootheningAbout": "真实自然的光滑美肌",
			"smileAbout": "拍照时错过了微笑的瞬间？不用担心，立即添加。",
			"advancedSpotHealingText": "高级修复",
			"advancedSpotHealingAbout": "快速删除或克隆部分图像。使用高级选项进一步优化图像。",
			"replaceEyeText": "替换眼睛",
			"replaceEyeAbout": "照片中的人物眨眼怎么办？使用此工具开闭眼，创造完美的拍摄效果。",
			"grabcutMasking": "自动选区",
			"grabcutMaskingAbout": "创建自动剪裁并根据需要进行自定义。",
			"layersIncompositionText": "抠图、合并、创建",
			"layersIncompositionAbout": "使用图层编辑和选区工具创建大师级作品。",
			"collageThemesText": "拼贴画主题",
			"collageThemesAbout": "解锁令人惊叹的拼贴画主题。利用贴纸、边框、布局、时尚文本、独特效果等更多功能创造个性化拼贴画！",
			"scrapBookCollageText": "创建拼贴画",
			"scrapBookCollageAbout": "一键创建惊艳的拼贴画。使用描边、文本、边框、背景等更多工具打造个性化风格。",
			"creativeCameraEdits": "相机效果",
			"creativeCameraEditsAbout": "使用实时滤镜、逼真的纹身和惊艳的艺术效果捕捉创意照片。",
			"infinteContentText": "解锁所有高级内容",
			"infinteContentAbout": "无限制访问混合外观、数百种布局、趣味贴纸、边框、背景、文本等各种创意内容，获取创意灵感！",
			"manyMoreText": "...以及更多创意功能",
			"buttonPrimary": "免费试用 $TRIAL_PERIOD$",
			"buttonPrimary2": "同意并订阅",
			"Continue": "继续",
			"RestorePurchases": "恢复购买",
			"GetTrialText": "前 $TRIAL_PERIOD$免费试用，到期后收取 $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "付款金额将在确认购买时从 iTunes 帐户扣除。订阅会自动续订，除非在当前有效期结束前至少 24 小时关闭自动续订。续订费用将在当前有效期结束前的 24 小时内从您的帐户扣除。在您当前有效期结束前的 24 小时内，会从您的帐户扣除 $PRICE$ / $SUBSCRIPTION_PERIOD$。您可在购买后随时前往“Apple ID 帐户设置”管理或关闭自动续订。",
			"terms": "使用条款",
			"policy": "隐私策略",
			"yearlyPlan": "12 个月：$DICOUNTEDPRICE$/月",
			"monthlyPlan": "1 个月：$PRICE$/月",
			"discountPercentage": "每年节省 $DISCOUNT$%",
			"totalYearlyPrice": "总计 $PRICE$",
			"disclaimer": "无承诺。随时取消",
			"monthlyPlanBottomDisclaimer": "无承诺期限。费用按月收取，直到您取消订阅。可随时在 Apple ID 设置中取消",
			"yearlyPlanBottomDisclaimer": "费用按年收取，直到您取消订阅。可随时在 Apple ID 设置中取消",
			"unlockPremiumText": "解锁高级功能和内容。",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "（$DICOUNTEDPRICE$/月）",
			"UnlockPremium": "解锁 Premium",
			"heading1": "优惠截止日期 11 月 15 日",
			"discountFirstYear": "首年享受折扣优惠",
			"offerTerms": "查看优惠条款",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "首年享受优惠价 $DISCOUNTED_PRICE$",
			"nextYearPriceString": "次年起的价格为 $PRICE$。"
		};
	}
	else if(language_country == 'zh_tw')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "在前 $TRIAL_PERIOD$ 免費使用 PREMIUM",
			"EDIT": "編輯",
			"COMPOSE": "MIX",
			"FIX": "潤飾",
			"COLLAGE": "拼貼",
			"CAPTURE": "擷取",
			"editorThemesText": "編輯者主題",
			"editorThemesAbout": "透過令人驚歎的主題獲得靈感，讓您輕鬆一按即可建立傑作。使用文字、貼紙、邊框和外觀個性化您的作品。",
			"selectiveEditingText": "選擇性編輯",
			"smootheningText": "柔膚",
			"smileText": "微笑",
			"selectiveEditingAbout": "編輯圖像的特定部分。自動物件選擇功能可以輕鬆修改和建立獨特的效果。",
			"smootheningAbout": "真實自然的光滑皮膚",
			"smileAbout": "照片未捕捉到您的笑容也沒關係，現在加上去吧。",
			"advancedSpotHealingText": "進階修復",
			"advancedSpotHealingAbout": "快速刪除或複製部分圖像。透過進階選項修復瑕疵。",
			"replaceEyeText": "替換眼睛",
			"replaceEyeAbout": "有人在照片中眨眼嗎？用這個打開閉上的眼睛，創造完美相片。",
			"grabcutMasking": "自動選擇",
			"grabcutMaskingAbout": "建立自動挖剪，按照需要自定義。",
			"layersIncompositionText": "挖剪，合併，建立",
			"layersIncompositionAbout": "使用圖層編輯和選擇工具建立傑作。",
			"collageThemesText": "拼貼主題",
			"collageThemesAbout": "訪問令人驚嘆的拼貼主題。透過貼紙、邊框、版面、時尚文字、獨特效果等個性化您的拼貼畫！",
			"scrapBookCollageText": "挖剪圖案拼貼",
			"scrapBookCollageAbout": "只需輕輕一按即可建立醒目的拼貼。使用筆觸、文本、邊框、背景等進行風格化。",
			"creativeCameraEdits": "相機效果",
			"creativeCameraEditsAbout": "以實時濾鏡、寫實的刺青和藝術特效擷取創意十足的照片。",
			"infinteContentText": "解鎖全部進階內容",
			"infinteContentAbout": "隨意使用全部的混合外觀、數百種版面、有趣的貼紙、邊框、背景、文字等創意內容，建立創意傑作！",
			"manyMoreText": "...還有更多創意功能",
			"buttonPrimary": "繼續免費使用 $TRIAL_PERIOD$",
			"buttonPrimary2": "同意並訂閱",
			"Continue": "繼續",
			"RestorePurchases": "還原購買",
			"GetTrialText": "免費使用 $TRIAL_PERIOD$，然後 $PRICE$ / $SUBSCRIPTION_PERIOD$",
			"footerText": "付款將在確認購買時從 iTunes 帳戶中扣除。訂閱會自動續約，除非您在當前訂閱期結束前至少 24 小時關閉了自動續約。我們將在當前訂閱期結束前 24 小時內向您的帳戶收取續約費用。我們將在當前訂閱期結束前 24 小時內按照 $PRICE$ / $SUBSCRIPTION_PERIOD$ 向您的帳戶收取續約費用。購買後，您可以隨時在您的 Apple ID 帳戶設定中管理或關閉自動續約。",
			"terms": "使用條款",
			"policy": "隱私權政策",
			"yearlyPlan": "12 個月：$DICOUNTEDPRICE$/月",
			"monthlyPlan": "1 個月：$PRICE$/月",
			"discountPercentage": "每年節省 $DISCOUNT$%",
			"totalYearlyPrice": "總計 $PRICE$",
			"disclaimer": "不做承諾。隨時取消",
			"monthlyPlanBottomDisclaimer": "無需做長期承諾。我們會按月向您收費，直到您取消訂閱為止。您可以隨時到您的 Apple ID 設定取消",
			"yearlyPlanBottomDisclaimer": "我們會每年向您收費，直到您取消訂閱為止<br/>您可以隨時到您的 Apple ID 設定取消",
			"unlockPremiumText": "解鎖高級功能和內容。",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "（$DICOUNTEDPRICE$/月）",
			"UnlockPremium": "解鎖 Premium",
			"heading1": "優惠將於 11 月 15 日結束",
			"discountFirstYear": "首年價格折扣",
			"offerTerms": "查看優惠方案條款",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "第 1 年 $DISCOUNTED_PRICE$",
			"nextYearPriceString": "然後從第二年起 $PRICE$。"
		};
	}
	else if(language_country == 'zz_zz')
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "GET PREMIUM FREE FOR THE FIRST $TRIAL_PERIOD$",
			"EDIT": "EDIT",
			"COMPOSE": "MIX",
			"FIX": "RETOUCH",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Editor Themes",
			"editorThemesAbout": "Get inspired with stunning themes, letting you create a masterpiece in a single tap. Personalize your work with texts, stickers, borders & looks.",
			"selectiveEditingText": "Selective Editing",
			"smootheningText": "Smooth Skin",
			"smileText": "Smile",
			"selectiveEditingAbout": "Edit a specific section of an image. Auto object selection makes it easy to modify and create unique effects.",
			"smootheningAbout": "Authentic & natural skin smoothing",
			"smileAbout": "Missed a smile in a photo. No worries, add it now.",
			"advancedSpotHealingText": "Advanced Healing",
			"advancedSpotHealingAbout": "Quickly remove or clone part of an image. Perfect the imperfections with advanced options.",
			"replaceEyeText": "Replace Eyes",
			"replaceEyeAbout": "Have someone blink in a photo? Use this to open closed eyes to create the perfect shot.",
			"grabcutMasking": "Auto Selection",
			"grabcutMaskingAbout": "Create automatic cut-outs and customize as you need.",
			"layersIncompositionText": "Cut out, Combine, Create",
			"layersIncompositionAbout": "Create a masterpiece using layer editing and selection tools.",
			"collageThemesText": "Collage Themes",
			"collageThemesAbout": "Unlock stunning collage themes. Personalize your collage with stickers, borders, layouts, stylish texts, unique effects, and more!",
			"scrapBookCollageText": "Cutout Collage",
			"scrapBookCollageAbout": "Create visually striking collages with a single tap. Stylize with strokes, text, borders, backgrounds, and more.",
			"creativeCameraEdits": "Camera Effects",
			"creativeCameraEditsAbout": "Capture creative photos with live filters, realistic tattoos & artistic effects.",
			"infinteContentText": "Unlock All Premium Content",
			"infinteContentAbout": "Get creative with full access to creative contents with blending looks, hundreds of layouts, fun stickers, borders, backgrounds, texts and more!",
			"manyMoreText": "...and many more creative features",
			"buttonPrimary": "Continue with $TRIAL_PERIOD$ free",
			"buttonPrimary2": "Agree and Subscribe",
			"Continue": "Continue",
			"RestorePurchases": "Restore Purchases",
			"GetTrialText": "Get $TRIAL_PERIOD$ FREE, then $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Payment will be charged to iTunes Account at confirmation of purchase. Subscription automatically renews unless auto-renew off at least 24-hours before the end of the current period. Your account will be charged for renewal within 24-hours prior to the end of the current period. Your account will be charged $PRICE$ / $SUBSCRIPTION_PERIOD$ for renewal within 24 hours prior to the end of the current period. You can manage or turn off auto renew in your Apple ID Account Settings any time after purchase.",
			"terms": "Terms of use",
			"policy": "Privacy Policy",
			"yearlyPlan": "12 Months: $DICOUNTEDPRICE$/mo",
			"monthlyPlan": "1 Month: $PRICE$/mo",
			"discountPercentage": "Save $DISCOUNT$% per year",
			"totalYearlyPrice": "Total $PRICE$",
			"disclaimer": "No Commitment. Cancel Anytime",
			"monthlyPlanBottomDisclaimer": "No commitment. You’ll be charged monthly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"yearlyPlanBottomDisclaimer": "You’ll be charged yearly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"unlockPremiumText": "Unlock Premium features and content.",
			"yearlySingleProduct": "$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice": "($DICOUNTEDPRICE$/mo)",
			"UnlockPremium": "Unlock Premium",
			"heading1": "OFFER ENDS 15TH NOV",
			"discountFirstYear": "DISCOUNT FOR 1ST YEAR",
			"offerTerms": "See offer terms",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString": "$DISCOUNTED_PRICE$ for 1st year",
			"nextYearPriceString": "Then $PRICE$ from next year onwards."
		};
	}
	else
	{
		kkishitaxoxo ={
			"premiumText": "PS Express Premium",
			"firstthreedays": "GET PREMIUM FREE FOR THE FIRST $TRIAL_PERIOD$",
			"EDIT": "EDIT",
			"COMPOSE": "MIX",
			"FIX": "RETOUCH",
			"COLLAGE": "COLLAGE",
			"CAPTURE": "CAPTURE",
			"editorThemesText": "Editor Themes",
			"editorThemesAbout": "Get inspired with stunning themes, letting you create a masterpiece in a single tap. Personalize your work with texts, stickers, borders & looks.",
			"selectiveEditingText": "Selective Editing",
			"smootheningText": "Smooth Skin",
			"smileText": "Smile",
			"selectiveEditingAbout": "Edit a specific section of an image. Auto object selection makes it easy to modify and create unique effects.",
			"smootheningAbout": "Authentic & natural skin smoothing",
			"smileAbout": "Missed a smile in a photo. No worries, add it now.",
			"advancedSpotHealingText": "Advanced Healing",
			"advancedSpotHealingAbout": "Quickly remove or clone part of an image. Perfect the imperfections with advanced options.",
			"replaceEyeText": "Replace Eyes",
			"replaceEyeAbout": "Have someone blink in a photo? Use this to open closed eyes to create the perfect shot.",
			"grabcutMasking": "Auto Selection",
			"grabcutMaskingAbout": "Create automatic cut-outs and customize as you need.",
			"layersIncompositionText": "Cut out, Combine, Create",
			"layersIncompositionAbout": "Create a masterpiece using layer editing and selection tools.",
			"collageThemesText": "Collage Themes",
			"collageThemesAbout": "Unlock stunning collage themes. Personalize your collage with stickers, borders, layouts, stylish texts, unique effects, and more!",
			"scrapBookCollageText": "Cutout Collage",
			"scrapBookCollageAbout": "Create visually striking collages with a single tap. Stylize with strokes, text, borders, backgrounds, and more.",
			"creativeCameraEdits": "Camera Effects",
			"creativeCameraEditsAbout": "Capture creative photos with live filters, realistic tattoos & artistic effects.",
			"infinteContentText": "Unlock All Premium Content",
			"infinteContentAbout": "Get creative with full access to creative contents with blending looks, hundreds of layouts, fun stickers, borders, backgrounds, texts and more!",
			"manyMoreText": "...and many more creative features",
			"buttonPrimary": "Continue with $TRIAL_PERIOD$ free",
			"buttonPrimary2": "Agree and Subscribe",
			"Continue":"Continue",
			"RestorePurchases": "Restore Purchases",
			"GetTrialText": "Get $TRIAL_PERIOD$ FREE, then $PRICE$/$SUBSCRIPTION_PERIOD$",
			"footerText": "Payment will be charged to iTunes Account at confirmation of purchase. Subscription automatically renews unless auto-renew off at least 24-hours before the end of the current period. Your account will be charged for renewal within 24-hours prior to the end of the current period. Your account will be charged $PRICE$ / $SUBSCRIPTION_PERIOD$ for renewal within 24 hours prior to the end of the current period. You can manage or turn off auto renew in your Apple ID Account Settings any time after purchase.",
			"terms": "Terms of use",
			"policy": "Privacy Policy",
			"yearlyPlan":"12 Months: $DICOUNTEDPRICE$/mo",
			"monthlyPlan":"1 Month: $PRICE$/mo",
			"discountPercentage":"Save $DISCOUNT$% per year",
			"totalYearlyPrice":"Total $PRICE$",
			"disclaimer":"No Commitment. Cancel Anytime",
			"monthlyPlanBottomDisclaimer":"No commitment. You’ll be charged monthly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"yearlyPlanBottomDisclaimer": "You’ll be charged yearly until you cancel your subscription. Cancel anytime in your Apple ID setting",
			"unlockPremiumText":"Unlock Premium features and content.",
			"yearlySingleProduct":"$PRICE$/$SUBSCRIPTION_PERIOD$ ",
			"yearlySingleProductMonthlyPrice":"($DICOUNTEDPRICE$/mo)",
			"UnlockPremium": "Unlock Premium",
			"heading1" : "OFFER ENDS 15TH NOV",
			"discountFirstYear" : "DISCOUNT FOR 1ST YEAR",
			"offerTerms" : "See offer terms",
			"bannerDiscountPercentage": "$DISCOUNT$%",
			"discountedPriceString":"$DISCOUNTED_PRICE$ for 1st year",
			"nextYearPriceString":"Then $PRICE$ from next year onwards."
		};
	}

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
	
	document.getElementById('premiumText').innerHTML = kkishitaxoxo.premiumText;
	document.getElementById('editorThemesAbout').innerHTML = kkishitaxoxo.editorThemesAbout;
	document.getElementById('selectiveEditingAbout').innerHTML = kkishitaxoxo.selectiveEditingAbout;
	document.getElementById('smootheningAbout').innerHTML = kkishitaxoxo.smootheningAbout;
	document.getElementById('advancedSpotHealingAbout').innerHTML = kkishitaxoxo.advancedSpotHealingAbout;
	document.getElementById('replaceEyeAbout').innerHTML = kkishitaxoxo.replaceEyeAbout;
	document.getElementById('grabcutMaskingAbout').innerHTML = kkishitaxoxo.grabcutMaskingAbout;
	document.getElementById('layersIncompositionAbout').innerHTML = kkishitaxoxo.layersIncompositionAbout;
	document.getElementById('collageThemesAbout').innerHTML = kkishitaxoxo.collageThemesAbout;
	document.getElementById('creativeCameraEditsAbout').innerHTML = kkishitaxoxo.creativeCameraEditsAbout;
	document.getElementById('infinteContentAbout').innerHTML = kkishitaxoxo.infinteContentAbout;
	document.getElementById('editorThemesText').innerHTML = kkishitaxoxo.editorThemesText;
	document.getElementById('selectiveEditingText').innerHTML = kkishitaxoxo.selectiveEditingText;
	document.getElementById('smootheningText').innerHTML = kkishitaxoxo.smootheningText;
	document.getElementById('smileText').innerHTML = kkishitaxoxo.smileText;
	document.getElementById('advancedSpotHealingText').innerHTML = kkishitaxoxo.advancedSpotHealingText;
	document.getElementById('replaceEyeText').innerHTML = kkishitaxoxo.replaceEyeText;
	document.getElementById('grabcutMasking').innerHTML = kkishitaxoxo.grabcutMasking;
	document.getElementById('layersIncompositionText').innerHTML = kkishitaxoxo.layersIncompositionText;
	document.getElementById('collageThemesText').innerHTML = kkishitaxoxo.collageThemesText;
	document.getElementById('manyMoreText').innerHTML = kkishitaxoxo.manyMoreText;
	document.getElementById('terms').innerHTML = kkishitaxoxo.terms;
	document.getElementById('policy').innerHTML = kkishitaxoxo.policy;
	document.getElementById('disclaimer').innerHTML = kkishitaxoxo.disclaimer;
	document.getElementById('creativeCameraEdits').innerHTML = kkishitaxoxo.creativeCameraEdits;
	document.getElementById('infinteContentText').innerHTML = kkishitaxoxo.infinteContentText;
	document.getElementById('smileAbout').innerHTML = kkishitaxoxo.smileAbout;
	
	document.getElementById('editorText1').innerHTML = kkishitaxoxo.EDIT;
	document.getElementById('editorText2').innerHTML = kkishitaxoxo.EDIT;
	document.getElementById('editorText3').innerHTML = kkishitaxoxo.EDIT;
	document.getElementById('editorText4').innerHTML = kkishitaxoxo.EDIT;
	document.getElementById('collageText1').innerHTML = kkishitaxoxo.COLLAGE;
	document.getElementById('composeText1').innerHTML = kkishitaxoxo.COMPOSE;
	document.getElementById('composeText2').innerHTML = kkishitaxoxo.COMPOSE;
	document.getElementById('captureText').innerHTML = kkishitaxoxo.CAPTURE;
	document.getElementById('smootheningText2').innerHTML = kkishitaxoxo.FIX;
	document.getElementById('smileText2').innerHTML = kkishitaxoxo.FIX;
	document.getElementById('restore').innerHTML = kkishitaxoxo.RestorePurchases;
	document.getElementById('discountBannerCopyTopLabel').innerHTML = kkishitaxoxo.heading1;
	document.getElementById('discountBannerCopyBottomLabel').innerHTML = kkishitaxoxo.discountFirstYear;
	document.getElementById('offerTerms').innerHTML = kkishitaxoxo.offerTerms;
	
	const observer = lozad();
	observer.observe();

	const pictureObserver = lozad('.lozad-picture', {
		threshold: 0.1
	})

	pictureObserver.observe();
	if(isWidthOverflow("layersIncompositionTextDiv")){
		handleWidthOverflow("composeText2");
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

// function processTranslations(_translations) {
// 	translations = _translations;
// 	function localizeLabel(labelId) {
// 		document.getElementById(labelId).innerHTML = translations[labelId];
//     }
// 	var paywall_strings = ['premiumText', 'editorThemesAbout', 'selectiveEditingAbout', 'smootheningAbout', 'smileAbout', 'advancedSpotHealingAbout', 'replaceEyeAbout','grabcutMaskingAbout','layersIncompositionAbout',
//  						'collageThemesAbout', 'creativeCameraEditsAbout', 'infinteContentAbout', 'editorThemesText',
// 						'selectiveEditingText', 'smootheningText', 'smileText', 'advancedSpotHealingText', 'replaceEyeText','grabcutMasking','layersIncompositionText', 'collageThemesText', 'creativeCameraEdits',
// 						'infinteContentText', 'manyMoreText', 'terms', 'policy' ,'disclaimer'];							
// 	for (var i = 0; i < paywall_strings.length; i++) {
// 		localizeLabel(paywall_strings[i]);
// 	}
	
// 	document.getElementById('editorText1').innerHTML = translations['EDIT'];
// 	document.getElementById('editorText2').innerHTML = translations['EDIT'];
// 	document.getElementById('editorText3').innerHTML = translations['EDIT'];
// 	document.getElementById('editorText4').innerHTML = translations['EDIT'];
// 	document.getElementById('collageText1').innerHTML = translations['COLLAGE'];
// 	document.getElementById('composeText1').innerHTML = translations['COMPOSE'];
// 	document.getElementById('composeText2').innerHTML = translations['COMPOSE'];
// 	document.getElementById('captureText').innerHTML = translations['CAPTURE'];
// 	document.getElementById('smootheningText2').innerHTML = translations['FIX'];
// 	document.getElementById('smileText2').innerHTML = translations['FIX'];
// 	document.getElementById('restore').innerHTML = translations['Restore Purchases'];
// 	document.getElementById('discountBannerCopyTopLabel').innerHTML = translations['heading1'];
// 	document.getElementById('discountBannerCopyBottomLabel').innerHTML = translations['discountFirstYear'];
// 	document.getElementById('offerTerms').innerHTML = translations['offerTerms'];
	
// 	const observer = lozad();
// 	observer.observe();

// 	const pictureObserver = lozad('.lozad-picture', {
//     	threshold: 0.1
//     })

//     pictureObserver.observe();
// 	promiseTranslationResolve();
// 	if(isWidthOverflow("layersIncompositionTextDiv")){
// 		handleWidthOverflow("composeText2");
// 	}
// }

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
				document.getElementById("button-primary").innerHTML = kkishitaxoxo.buttonPrimary2.bold();
				document.getElementById("disclaimer").innerHTML = kkishitaxoxo.yearlyPlanBottomDisclaimer;
			}
			
		}
		else if (productInfo === 'monthly'){
			document.getElementById("monthlySection").src = "resources/Radio_blue.png";
			document.getElementById("yearlySection").src = "resources/Radio_black.png";
			document.getElementById('monthlyBorder').style.borderStyle = "solid";
			document.getElementById('monthlyBorder').style.backgroundColor = "#1A1A1A";
			document.getElementById('yearlyBorder').style.borderStyle = "none";
			document.getElementById('yearlyBorder').style.backgroundColor = "#1E1E1E";
			var updateButtonText = kkishitaxoxo.Continue;
			document.getElementById("button-primary").innerHTML = updateButtonText.bold();
			productflag = 'product_monthly';

			if (masterProductInfoList[0].spikeProduct === 1) {
				document.getElementById("button-primary").innerHTML = kkishitaxoxo.buttonPrimary2.bold();
				document.getElementById("disclaimer").innerHTML = kkishitaxoxo.monthlyPlanBottomDisclaimer;
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
		document.getElementById("discountPercentageLabel").innerHTML = kkishitaxoxo.bannerDiscountPercentage.replace("$DISCOUNT$", discountYearlyPercentage);

		var formattedYearlyPrice = formatPriceUsingCurrencyCode(product.price, product.currencyCode);
		var nextYearPriceString = kkishitaxoxo.nextYearPriceString.replace("$PRICE$", formattedYearlyPrice);
		nextYearPriceString = nextYearPriceString + "&lrm;"
		document.getElementById("discountedPercentage").innerHTML = nextYearPriceString;

		var formattedDiscountedPrice = formatPriceUsingCurrencyCode(parseFloat(product.discountPrice), product.currencyCode);
		var discountedPriceString = kkishitaxoxo.discountedPriceString.replace("$DISCOUNTED_PRICE$", formattedDiscountedPrice).bold();
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

			buttonText = kkishitaxoxo.Continue;
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
				buttonText = kkishitaxoxo.UnlockPremium;
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
							buttonText = kkishitaxoxo.Continue;
						}
						else if (productInfoList[i].hasOwnProperty("discountPrice")) {
							buttonText = kkishitaxoxo.Continue;
						}
						else {
							buttonText = translations['buttonPrimary'].replace("$TRIAL_PERIOD$", productInfoList[i].freeTrial);
						}

						document.getElementById("button-primary").innerHTML = buttonText.bold();
						monthlydiscountedPrice = (parseFloat(productInfoList[i].price) / 12).toFixed(2);
						var formattedMonthlydiscountedPrice = formatPriceUsingCurrencyCode(monthlydiscountedPrice, productInfoList[i].currencyCode);

						document.getElementById("yearlyMonthlyPrice").innerHTML = kkishitaxoxo.yearlyPlan.replace("$DICOUNTEDPRICE$", formattedMonthlydiscountedPrice).bold();

						var formattedYearlyPrice = formatPriceUsingCurrencyCode(productInfoList[i].price, productInfoList[i].currencyCode);
						var yearlyAmount = kkishitaxoxo.totalYearlyPrice.replace("$PRICE$", formattedYearlyPrice);
						yearlyAmount = yearlyAmount + "&lrm;";
						document.getElementById("product_yearly").innerHTML = yearlyAmount.bold();

					}
				}

				if (productInfoList[i].spikeProduct === 1) {
					document.getElementById("totalAmount").style.display = "none";
					document.getElementById("discountBanner").style.display = "block";
					document.getElementById("button-primary").innerHTML = kkishitaxoxo.buttonPrimary2.bold();
					document.getElementById("disclaimer").style.color = "#C8C8C8";
					document.getElementById("disclaimer").style.paddingLeft = "30px";
					document.getElementById("disclaimer").style.paddingRight = "30px";
					document.getElementById('disclaimer').innerHTML = kkishitaxoxo.yearlyPlanBottomDisclaimer;
				}
				else {
					discountPercentage = Math.floor(((((parseFloat(monthlyPrice) - parseFloat(monthlydiscountedPrice)) / parseFloat(monthlyPrice)).toFixed(2)) * 100));
					document.getElementById("discountedPercentage").innerHTML = kkishitaxoxo.discountPercentage.replace("$DISCOUNT$", discountPercentage);
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


