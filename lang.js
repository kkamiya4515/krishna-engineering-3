// =====================================================
// KRISHNA ENGINEERING - HINDI / ENGLISH TOGGLE
// Translates the whole page by matching text, so the
// HTML does not need any extra attributes.
// =====================================================

(function () {

    const STORE_KEY = "krishnaEngineeringLang";

    // Change "en" to "hi" to make Hindi the default language
    const DEFAULT_LANG = "en";

    let lang = DEFAULT_LANG;

    const originals = new WeakMap();
    const attrOriginals = new WeakMap();


    // ---------------------------------------------------
    // English -> Hindi (whole site)
    // ---------------------------------------------------

    const COMMON = {

        // Navbar / footer
        "Home": "होम",
        "Services": "सेवाएँ",
        "Our Work": "हमारा काम",
        "About": "हमारे बारे में",
        "Contact": "संपर्क",

        // Hero
        "CCTV SECURITY SOLUTIONS": "CCTV सुरक्षा समाधान",
        "Your Property.": "आपकी प्रॉपर्टी।",
        "Always Protected.": "हमेशा सुरक्षित।",
        "Professional CCTV installation, maintenance and security solutions for homes, shops and businesses.":
            "घरों, दुकानों और व्यवसायों के लिए पेशेवर CCTV इंस्टॉलेशन, मेंटेनेंस और सुरक्षा समाधान।",
        "Get Free Quote": "फ़्री कोट पाएँ",
        "📞 Call Now": "📞 अभी कॉल करें",
        "Security": "सुरक्षा",
        "Local": "लोकल",
        "Support": "सहायता",
        "LIVE MONITORING": "लाइव मॉनिटरिंग",
        "SECURE": "सुरक्षित",
        "● ONLINE": "● ऑनलाइन",

        // Quick actions
        "Call Us": "हमें कॉल करें",
        "Quick Enquiry": "जल्दी पूछताछ",

        // Services
        "WHAT WE DO": "हम क्या करते हैं",
        "Complete CCTV": "संपूर्ण CCTV",
        "Security Solutions.": "सुरक्षा समाधान।",
        "Everything you need to keep your property safe and monitored.":
            "आपकी प्रॉपर्टी को सुरक्षित और निगरानी में रखने के लिए जो कुछ भी चाहिए।",
        "CCTV Installation": "CCTV इंस्टॉलेशन",
        "Professional camera installation with proper positioning and setup.":
            "सही जगह और सही सेटअप के साथ पेशेवर कैमरा इंस्टॉलेशन।",
        "Get Installation →": "इंस्टॉलेशन करवाएँ →",
        "Camera Maintenance": "कैमरा मेंटेनेंस",
        "Reliable maintenance and troubleshooting for your CCTV system.":
            "आपके CCTV सिस्टम के लिए भरोसेमंद मेंटेनेंस और खराबी ठीक करना।",
        "Request Service →": "सर्विस बुक करें →",
        "Remote Monitoring": "रिमोट मॉनिटरिंग",
        "Keep an eye on your property remotely using connected CCTV systems.":
            "कनेक्टेड CCTV सिस्टम से अपनी प्रॉपर्टी पर दूर से नज़र रखें।",
        "Know More →": "और जानें →",
        "Commercial Security": "कमर्शियल सुरक्षा",
        "CCTV solutions designed for shops, offices and commercial spaces.":
            "दुकानों, ऑफिसों और कमर्शियल जगहों के लिए बनाए गए CCTV समाधान।",
        "Secure Your Business →": "अपना व्यवसाय सुरक्षित करें →",

        // Why us
        "SYSTEM SECURE": "सिस्टम सुरक्षित",
        "WHY KRISHNA ENGINEERING": "कृष्णा इंजीनियरिंग क्यों",
        "Security that": "ऐसी सुरक्षा",
        "you can trust.": "जिस पर भरोसा कर सकें।",
        "We focus on practical CCTV solutions that are properly installed, easy to use and designed around your property.":
            "हम ऐसे व्यावहारिक CCTV समाधान देते हैं जो सही तरीके से लगे हों, इस्तेमाल में आसान हों और आपकी प्रॉपर्टी के हिसाब से बने हों।",
        "Professional Installation": "पेशेवर इंस्टॉलेशन",
        "Proper camera placement and setup.": "कैमरों की सही जगह और सेटअप।",
        "Complete CCTV Solutions": "संपूर्ण CCTV समाधान",
        "From installation to maintenance.": "इंस्टॉलेशन से लेकर मेंटेनेंस तक।",
        "Local Support": "लोकल सहायता",
        "Easy communication and assistance.": "आसान बातचीत और मदद।",

        // Process
        "HOW IT WORKS": "यह कैसे काम करता है",
        "Simple. Clear.": "आसान। साफ़।",
        "Secure.": "सुरक्षित।",
        "Tell Us": "हमें बताएँ",
        "Share your CCTV requirement with us.": "अपनी CCTV ज़रूरत हमें बताइए।",
        "Site Assessment": "साइट का निरीक्षण",
        "Understand your property and requirements.": "आपकी प्रॉपर्टी और ज़रूरतों को समझना।",
        "Installation": "इंस्टॉलेशन",
        "Set up your CCTV system professionally.": "आपका CCTV सिस्टम पेशेवर तरीके से लगाना।",
        "Stay Protected": "सुरक्षित रहें",
        "Enjoy reliable security and monitoring.": "भरोसेमंद सुरक्षा और निगरानी का आराम लें।",

        // Our work
        "OUR WORK": "हमारा काम",
        "Security for": "हर जगह की",
        "Every Space.": "सुरक्षा।",
        "Residential CCTV": "घरों के लिए CCTV",
        "Smart security for your home.": "आपके घर के लिए स्मार्ट सुरक्षा।",
        "Commercial CCTV": "कमर्शियल CCTV",
        "Security for your business.": "आपके व्यवसाय के लिए सुरक्षा।",
        "Business Security": "बिज़नेस सुरक्षा",
        "Monitor what matters.": "जो ज़रूरी है उस पर नज़र रखें।",

        // About
        "Keeping Bharatpur": "भरतपुर को",
        "more secure.": "और सुरक्षित बना रहे हैं।",
        "Krishna Engineering provides CCTV security solutions for homes, shops, offices and businesses in Bharatpur, Rajasthan.":
            "कृष्णा इंजीनियरिंग भरतपुर, राजस्थान में घरों, दुकानों, ऑफिसों और व्यवसायों के लिए CCTV सुरक्षा समाधान देती है।",
        "📍 Near Pancham Hotel, Bharatpur, Rajasthan": "📍 पंचम होटल के पास, भरतपुर, राजस्थान",
        "OWNER": "मालिक",
        "Rakesh Kumar": "राकेश कुमार",

        // Contact
        "GET IN TOUCH": "संपर्क करें",
        "Let's secure": "आइए सुरक्षित करें",
        "your property.": "आपकी प्रॉपर्टी।",
        "Tell us what you need and we'll get back to you.":
            "बताइए आपको क्या चाहिए, हम आपसे संपर्क करेंगे।",
        "CALL": "कॉल",
        "ALTERNATE": "दूसरा नंबर",
        "LOCATION": "पता",
        "Bharatpur, Rajasthan": "भरतपुर, राजस्थान",
        "FREE QUOTE": "फ़्री कोट",
        "We'll contact you soon": "हम जल्द ही आपसे संपर्क करेंगे",
        "Your Name": "आपका नाम",
        "Phone Number": "फ़ोन नंबर",
        "Service": "सेवा",
        "Your Requirement": "आपकी ज़रूरत",
        "Enter your name": "अपना नाम लिखें",
        "Enter your number": "अपना नंबर लिखें",
        "Tell us about your requirement": "अपनी ज़रूरत के बारे में बताइए",
        "Select a service": "सेवा चुनें",
        "Other CCTV Requirement": "अन्य CCTV ज़रूरत",
        "Send Enquiry": "पूछताछ भेजें",

        // Map
        "FIND US": "हमें खोजें",
        "Visit us in": "आइए मिलें",
        "Bharatpur.": "भरतपुर में।",
        "Near Pancham Hotel, Bharatpur, Rajasthan": "पंचम होटल के पास, भरतपुर, राजस्थान",
        "Get Directions →": "रास्ता देखें →",

        // Mobile bar / footer
        "Call": "कॉल",
        "Get Quote": "कोट पाएँ",
        "Professional CCTV security solutions in Bharatpur, Rajasthan.":
            "भरतपुर, राजस्थान में पेशेवर CCTV सुरक्षा समाधान।",
        "© 2026 Krishna Engineering. All rights reserved.":
            "© 2026 कृष्णा इंजीनियरिंग। सर्वाधिकार सुरक्षित।",

        // Page title
        "Krishna Engineering | CCTV Security Solutions":
            "कृष्णा इंजीनियरिंग | CCTV सुरक्षा समाधान",

        // Advisor: texts generated by script.js
        "Main entrance & key areas": "मुख्य प्रवेश और ज़रूरी जगहें",
        "Your Property": "आपकी प्रॉपर्टी",
        "Standard monitoring": "सामान्य मॉनिटरिंग",
        "Night monitoring recommended": "रात की मॉनिटरिंग सुझाई जाती है",
        "Local monitoring": "लोकल मॉनिटरिंग",
        "Mobile monitoring recommended": "मोबाइल मॉनिटरिंग सुझाई जाती है",
        "Based on your property and selected areas, a customised CCTV setup may provide suitable coverage.":
            "आपकी प्रॉपर्टी और चुने हुए हिस्सों के हिसाब से एक कस्टमाइज़्ड CCTV सेटअप अच्छा कवरेज दे सकता है।",
        "For your home, a properly positioned multi-camera setup can help cover important entry and activity areas.":
            "आपके घर के लिए सही जगह लगाए गए कई कैमरे मुख्य प्रवेश और ज़रूरी जगहों को कवर करने में मदद कर सकते हैं।",
        "For your shop, coverage around entrances, customer areas and important points can help improve security.":
            "आपकी दुकान के लिए प्रवेश द्वार, ग्राहकों वाली जगह और ज़रूरी पॉइंट्स पर कवरेज सुरक्षा बेहतर कर सकता है।",
        "For your office, cameras can be planned around entrances, working areas and other important zones.":
            "आपके ऑफिस में प्रवेश द्वार, काम करने की जगहों और दूसरे ज़रूरी हिस्सों के हिसाब से कैमरे लगाए जा सकते हैं।",
        "For a larger property, camera placement should focus on entrances, movement areas and important zones.":
            "बड़ी प्रॉपर्टी में कैमरे प्रवेश द्वार, आवाजाही वाली जगहों और ज़रूरी हिस्सों पर केंद्रित होने चाहिए।"
    };


    // Coverage names (checkbox values and results)
    const COVERAGE_HI = {
        "Main Entrance": "मुख्य प्रवेश",
        "Back Entrance": "पीछे का प्रवेश",
        "Parking": "पार्किंग",
        "Main Hall / Showroom": "मुख्य हॉल / शोरूम",
        "Main Hall": "मुख्य हॉल",
        "Cash Counter": "कैश काउंटर",
        "Staircase / Corridor": "सीढ़ियाँ / गलियारा",
        "Staircase": "सीढ़ियाँ",
        "Boundary / Outside": "बाउंड्री / बाहर",
        "Boundary": "बाउंड्री",
        "Storage / Godown": "स्टोरेज / गोदाम",
        "Storage Area": "स्टोरेज"
    };


    // ---------------------------------------------------
    // Advisor section: [English, Hindi]
    // The HTML text there is Hinglish, so English is
    // defined here too.
    // ---------------------------------------------------

    const ADVISOR = {

        "CCTV ADVISOR": ["CCTV ADVISOR", "CCTV सलाहकार"],
        "Kitne cameras": ["How many cameras", "कितने कैमरे"],
        "aapko chahiye?": ["do you need?", "आपको चाहिए?"],

        "5 quick sawaal, aur aapko milega ek idea ki aapki property ke liye kitne cameras theek rahenge. Free hai, 1 minute lagta hai.": [
            "Answer 5 quick questions and get an idea of how many cameras suit your property. It's free and takes about a minute.",
            "5 आसान सवालों के जवाब दीजिए और जानिए आपकी प्रॉपर्टी के लिए कितने कैमरे सही रहेंगे। यह मुफ़्त है और बस 1 मिनट लगता है।"
        ],

        "Start": ["Start", "शुरू करें"],
        "Next": ["Next", "आगे"],
        "← Back": ["← Back", "← वापस"],

        "Question 1 of 5": ["Question 1 of 5", "सवाल 1 / 5"],
        "Question 2 of 5": ["Question 2 of 5", "सवाल 2 / 5"],
        "Question 3 of 5": ["Question 3 of 5", "सवाल 3 / 5"],
        "Question 4 of 5": ["Question 4 of 5", "सवाल 4 / 5"],
        "Question 5 of 5": ["Question 5 of 5", "सवाल 5 / 5"],

        "Kis property ke liye CCTV chahiye?": ["What do you need CCTV for?", "CCTV किसके लिए चाहिए?"],
        "Home": ["Home", "घर"],
        "Shop": ["Shop", "दुकान"],
        "Office": ["Office", "ऑफिस"],
        "Factory / Warehouse": ["Factory / Warehouse", "फैक्ट्री / गोदाम"],
        "Factory/Warehouse": ["Factory/Warehouse", "फैक्ट्री / गोदाम"],

        "Property kitni manzil (floors) ki hai?": ["How many floors does the property have?", "प्रॉपर्टी कितनी मंज़िल की है?"],
        "1 Floor": ["1 Floor", "1 मंज़िल"],
        "2 Floors": ["2 Floors", "2 मंज़िल"],
        "3 Floors": ["3 Floors", "3 मंज़िल"],
        "4+ Floors": ["4+ Floors", "4+ मंज़िल"],

        "Kaun se areas cover karne hain?": ["Which areas do you want covered?", "कौन-से हिस्से कवर करने हैं?"],
        "Jitne chahiye utne select karo.": ["Select as many as you need.", "जितने चाहिए उतने चुनिए।"],

        "Raat mein bhi clear recording chahiye?": ["Do you need clear recording at night too?", "क्या रात में भी साफ़ रिकॉर्डिंग चाहिए?"],
        "Haan, raat ko bhi": ["Yes, at night too", "हाँ, रात में भी"],
        "Sirf din mein": ["Daytime only", "सिर्फ़ दिन में"],

        "Kya mobile se live dekhna hai?": ["Do you want to watch live on your mobile?", "क्या मोबाइल से लाइव देखना है?"],
        "Haan, mobile pe": ["Yes, on mobile", "हाँ, मोबाइल पर"],
        "Zaroorat nahi": ["Not needed", "ज़रूरत नहीं"],

        "Aapki recommendation": ["Your recommendation", "आपकी सिफ़ारिश"],
        "Property": ["Property", "प्रॉपर्टी"],
        "Coverage": ["Coverage", "कवरेज"],
        "Night": ["Night", "रात"],
        "Monitoring": ["Monitoring", "मॉनिटरिंग"],

        "Ye ek andaza hai. Final number site dekhne ke baad tay hota hai.": [
            "This is an estimate. The final number is decided after a site visit.",
            "यह एक अनुमान है। अंतिम संख्या साइट देखने के बाद तय होती है।"
        ],

        "Free Quote Lo": ["Get Free Quote", "फ़्री कोट पाएँ"],
        "💬 WhatsApp pe bhejo": ["💬 Send on WhatsApp", "💬 WhatsApp पर भेजें"],
        "↺ Dobara karo": ["↺ Start over", "↺ दोबारा करें"]
    };


    // ---------------------------------------------------
    // Helpers
    // ---------------------------------------------------

    function normalise(text) {
        return text.replace(/\s+/g, " ").trim();
    }


    function translateCoverage(text) {

        let out = text;
        let hit = false;

        Object.keys(COVERAGE_HI)
            .sort(function (a, b) { return b.length - a.length; })
            .forEach(function (key) {
                if (out.indexOf(key) !== -1) {
                    out = out.split(key).join(COVERAGE_HI[key]);
                    hit = true;
                }
            });

        if (!hit) return null;

        return out
            .replace(/ & /g, " और ")
            .replace(/ \+ more$/, " + और");

    }


    function lookup(key, inAdvisor, isCoverage) {

        if (inAdvisor && ADVISOR[key]) {
            return lang === "hi" ? ADVISOR[key][1] : ADVISOR[key][0];
        }

        if (lang !== "hi") return null;

        if (COMMON[key]) return COMMON[key];

        const cameras = key.match(/^(\d+)–(\d+) cameras$/);

        if (cameras) {
            return cameras[1] + "–" + cameras[2] + " कैमरे";
        }

        if (COVERAGE_HI[key]) return COVERAGE_HI[key];

        if (isCoverage) return translateCoverage(key);

        return null;

    }


    function translateTextNode(node) {

        const parent = node.parentElement;

        if (!parent) return;

        const tag = parent.tagName;

        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;

        const source = originals.has(node) ? originals.get(node) : node.nodeValue;
        const key = normalise(source);

        if (!key) return;

        const inAdvisor = !!parent.closest("#advisor");
        const isCoverage = parent.id === "resultCoverage";

        const result = lookup(key, inAdvisor, isCoverage);

        if (result) {

            if (!originals.has(node)) originals.set(node, node.nodeValue);

            const lead = source.match(/^\s*/)[0];
            const trail = source.match(/\s*$/)[0];

            node.nodeValue = lead + result + trail;

        }

        else if (originals.has(node)) {

            node.nodeValue = originals.get(node);

        }

    }


    function translateTree(root) {

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null
        );

        const nodes = [];

        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(translateTextNode);

    }


    function translatePlaceholders() {

        document.querySelectorAll("[placeholder]").forEach(function (el) {

            if (!attrOriginals.has(el)) {
                attrOriginals.set(el, el.getAttribute("placeholder"));
            }

            const original = attrOriginals.get(el);
            const result = lookup(normalise(original), false, false);

            el.setAttribute("placeholder", result || original);

        });

    }


    function translateTitle() {

        if (!document.documentElement.dataset.titleEn) {
            document.documentElement.dataset.titleEn = document.title;
        }

        const original = document.documentElement.dataset.titleEn;

        document.title = lookup(normalise(original), false, false) || original;

    }


    // ---------------------------------------------------
    // Apply language
    // ---------------------------------------------------

    function applyLanguage() {

        document.documentElement.lang = lang === "hi" ? "hi" : "en";
        document.body.classList.toggle("lang-hi", lang === "hi");

        translateTree(document.body);
        translatePlaceholders();
        translateTitle();

        const btn = document.getElementById("langBtn");

        if (btn) {
            btn.textContent = lang === "hi" ? "EN" : "हिं";
            btn.setAttribute(
                "aria-label",
                lang === "hi" ? "Switch to English" : "हिंदी में बदलें"
            );
        }

    }


    window.toggleLanguage = function () {

        lang = lang === "en" ? "hi" : "en";

        try {
            localStorage.setItem(STORE_KEY, lang);
        } catch (e) {}

        applyLanguage();

    };


    // Translate text that script.js adds later (advisor result)
    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            mutation.addedNodes.forEach(function (node) {

                if (node.nodeType === Node.TEXT_NODE) {
                    translateTextNode(node);
                }

                else if (node.nodeType === Node.ELEMENT_NODE) {
                    translateTree(node);
                }

            });

        });

    });


    // ---------------------------------------------------
    // Start
    // ---------------------------------------------------

    try {

        const saved = localStorage.getItem(STORE_KEY);

        if (saved === "hi" || saved === "en") lang = saved;

    } catch (e) {}

    applyLanguage();

    observer.observe(document.body, { childList: true, subtree: true });

})();