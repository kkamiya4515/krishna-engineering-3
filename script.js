// =====================================================
// KRISHNA ENGINEERING - MAIN JAVASCRIPT
// =====================================================


// =====================================================
// MOBILE MENU
// =====================================================

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks) return;
    navLinks.classList.toggle("active");
}


function closeMenu() {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks) return;
    navLinks.classList.remove("active");
}


// Close menu when clicking outside
document.addEventListener("click", function (event) {

    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.getElementById("menuToggle");

    if (!navLinks || !menuToggle) return;

    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove("active");
    }

});


// =====================================================
// THEME
// =====================================================

function updateThemeButton() {

    const themeBtn = document.getElementById("themeBtn");

    if (!themeBtn) return;

    if (document.body.classList.contains("light-theme")) {
        themeBtn.textContent = "🌙";
    } else {
        themeBtn.textContent = "☀️";
    }

}


function toggleTheme() {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    localStorage.setItem(
        "krishnaEngineeringTheme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("krishnaEngineeringTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    updateThemeButton();

}


// =====================================================
// AI CCTV ADVISOR
// =====================================================

// Store customer's answers
const advisorData = {
    property: "",
    floors: "",
    coverage: [],
    night: "",
    remote: ""
};


// Start advisor
function startAdvisor() {

    advisorData.property = "";
    advisorData.floors = "";
    advisorData.coverage = [];
    advisorData.night = "";
    advisorData.remote = "";

    showAdvisorScreen("advisorQuestion1");

}


// Show one advisor screen
function showAdvisorScreen(screenId) {

    const screens =
        document.querySelectorAll(".advisor-screen");

    screens.forEach(function (screen) {
        screen.style.display = "none";
    });

    const target =
        document.getElementById(screenId);

    if (!target) return;

    target.style.display = "block";

    // Smooth scroll to advisor
    const advisor =
        document.getElementById("advisor");

    if (advisor) {

        setTimeout(function () {

            advisor.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 80);

    }

}


// Select normal advisor option
function selectAdvisorOption(type, value, button) {

    advisorData[type] = value;

    // Remove previous selection
    const parent =
        button.closest(".advisor-options") ||
        button.closest(".advisor-big-options");

    if (parent) {

        const buttons =
            parent.querySelectorAll("button");

        buttons.forEach(function (btn) {
            btn.classList.remove("selected");
        });

    }

    button.classList.add("selected");

    // Automatically move to next question
    setTimeout(function () {

        if (type === "property") {
            showAdvisorScreen("advisorQuestion2");
        }

        else if (type === "floors") {
            showAdvisorScreen("advisorQuestion3");
        }

        else if (type === "night") {
            showAdvisorScreen("advisorQuestion5");
        }

    }, 300);

}


// =====================================================
// COVERAGE SELECTION
// =====================================================

function nextAdvisorQuestion(nextQuestion) {

    const checked =
        document.querySelectorAll(
            'input[name="coverage"]:checked'
        );

    advisorData.coverage = [];

    checked.forEach(function (checkbox) {
        advisorData.coverage.push(checkbox.value);
    });

    // If customer selects nothing,
    // give them a general recommendation.
    if (advisorData.coverage.length === 0) {

        advisorData.coverage = [
            "Main Entrance",
            "Main Area"
        ];

    }

    if (nextQuestion === 4) {
        showAdvisorScreen("advisorQuestion4");
    }

}


// =====================================================
// FINISH ADVISOR
// =====================================================

function finishAdvisor(remoteAnswer) {

    advisorData.remote = remoteAnswer;

    generateCCTVRecommendation();

}


// =====================================================
// CCTV RECOMMENDATION ENGINE
// =====================================================

function generateCCTVRecommendation() {

    let cameras = 2;

    // ---------- PROPERTY BASE ----------

    switch (advisorData.property) {

        case "Home":
            cameras = 2;
            break;

        case "Shop":
            cameras = 3;
            break;

        case "Office":
            cameras = 4;
            break;

        case "Factory/Warehouse":
            cameras = 6;
            break;

        default:
            cameras = 3;

    }

    // ---------- FLOOR ADJUSTMENT ----------

    switch (advisorData.floors) {

        case "1 Floor":
            cameras += 0;
            break;

        case "2 Floors":
            cameras += 1;
            break;

        case "3 Floors":
            cameras += 2;
            break;

        case "4+ Floors":
            cameras += 3;
            break;

    }

    // ---------- COVERAGE ADJUSTMENT ----------

    const coverageCount =
        advisorData.coverage.length;

    if (coverageCount >= 2) cameras += 1;
    if (coverageCount >= 4) cameras += 1;
    if (coverageCount >= 6) cameras += 2;

    // ---------- NIGHT MONITORING ----------

    if (advisorData.night === "Yes") {
        cameras += 0;
    }

    // ---------- LIMIT ----------

    if (cameras < 2) cameras = 2;
    if (cameras > 12) cameras = 12;

    // ---------- CAMERA RANGE ----------

    const minimum =
        Math.max(2, cameras - 1);

    const maximum =
        Math.min(12, cameras + 1);

    const cameraText =
        minimum + "–" + maximum + " cameras";

    // ---------- COVERAGE TEXT ----------

    let coverageText = "";

    if (advisorData.coverage.length === 0) {

        coverageText =
            "Main entrance & key areas";

    }

    else if (advisorData.coverage.length <= 2) {

        coverageText =
            advisorData.coverage.join(" & ");

    }

    else {

        coverageText =
            advisorData.coverage
                .slice(0, 3)
                .join(", ");

        if (advisorData.coverage.length > 3) {
            coverageText += " + more";
        }

    }

    // ---------- RECOMMENDATION MESSAGE ----------

    let recommendation =
        "Based on your property and selected areas, " +
        "a customised CCTV setup may provide suitable coverage.";

    if (advisorData.property === "Home") {

        recommendation =
            "For your home, a properly positioned multi-camera " +
            "setup can help cover important entry and activity areas.";

    }

    if (advisorData.property === "Shop") {

        recommendation =
            "For your shop, coverage around entrances, " +
            "customer areas and important points can help improve security.";

    }

    if (advisorData.property === "Office") {

        recommendation =
            "For your office, cameras can be planned around " +
            "entrances, working areas and other important zones.";

    }

    if (advisorData.property === "Factory/Warehouse") {

        recommendation =
            "For a larger property, camera placement should focus " +
            "on entrances, movement areas and important zones.";

    }

    // ---------- NIGHT RESULT ----------

    let nightText = "Standard monitoring";

    if (advisorData.night === "Yes") {
        nightText = "Night monitoring recommended";
    }

    // ---------- REMOTE RESULT ----------

    let remoteText = "Local monitoring";

    if (advisorData.remote === "Yes") {
        remoteText = "Mobile monitoring recommended";
    }

    // ---------- UPDATE RESULT SCREEN ----------

    const cameraElement =
        document.getElementById("recommendedCameras");

    const recommendationElement =
        document.getElementById("recommendationText");

    const propertyElement =
        document.getElementById("resultProperty");

    const coverageElement =
        document.getElementById("resultCoverage");

    const nightElement =
        document.getElementById("resultNight");

    const remoteElement =
        document.getElementById("resultRemote");

    if (cameraElement) {
        cameraElement.textContent = cameraText;
    }

    if (recommendationElement) {
        recommendationElement.textContent = recommendation;
    }

    if (propertyElement) {
        propertyElement.textContent =
            advisorData.property || "Your Property";
    }

    if (coverageElement) {
        coverageElement.textContent = coverageText;
    }

    if (nightElement) {
        nightElement.textContent = nightText;
    }

    if (remoteElement) {
        remoteElement.textContent = remoteText;
    }

    // ---------- SHOW RESULT ----------

    showAdvisorScreen("advisorResult");

    // ---------- SAVE ADVISOR DATA TEMPORARILY ----------

    sessionStorage.setItem(
        "cctvAdvisorData",
        JSON.stringify(advisorData)
    );

    sessionStorage.setItem(
        "cctvAdvisorRecommendation",
        cameraText
    );

}


// =====================================================
// RESTART ADVISOR
// =====================================================

function restartAdvisor() {

    advisorData.property = "";
    advisorData.floors = "";
    advisorData.coverage = [];
    advisorData.night = "";
    advisorData.remote = "";

    // Uncheck coverage
    const checkboxes =
        document.querySelectorAll(
            'input[name="coverage"]'
        );

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Remove selected buttons
    const selectedButtons =
        document.querySelectorAll(
            ".advisor-options button.selected, " +
            ".advisor-big-options button.selected"
        );

    selectedButtons.forEach(function (button) {
        button.classList.remove("selected");
    });

    showAdvisorScreen("advisorIntro");

}


// =====================================================
// ADVISOR RESULT ACTIONS
// =====================================================

function getAdvisorSummaryText() {

    const cameras =
        sessionStorage.getItem("cctvAdvisorRecommendation") || "";

    const coverage =
        advisorData.coverage.length
            ? advisorData.coverage.join(", ")
            : "Main entrance & key areas";

    return (
        "CCTV Advisor result:\n" +
        "Property: " + advisorData.property + "\n" +
        "Floors: " + advisorData.floors + "\n" +
        "Areas: " + coverage + "\n" +
        "Night recording: " + advisorData.night + "\n" +
        "Mobile viewing: " + advisorData.remote + "\n" +
        "Suggested: " + cameras
    );

}


// "Free Quote Lo" button: fills the quote form and scrolls to it
function advisorGetQuote() {

    const service = document.getElementById("service");
    const message = document.getElementById("message");

    if (service) {

        if (advisorData.remote === "Yes") {
            service.value = "Remote Monitoring";
        }
        else if (advisorData.property === "Home") {
            service.value = "CCTV Installation";
        }
        else {
            service.value = "Commercial Security";
        }

    }

    if (message) {
        message.value = getAdvisorSummaryText();
    }

    const contact = document.getElementById("contact");

    if (contact) {
        contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }

}


// "WhatsApp pe bhejo" button: opens WhatsApp with the result
function advisorWhatsApp() {

    const text =
        "Hello Krishna Engineering, I used the CCTV Advisor on your website.\n\n" +
        getAdvisorSummaryText();

    window.open(
        "https://wa.me/919509108419?text=" + encodeURIComponent(text),
        "_blank"
    );

}


// =====================================================
// CONTACT FORM
// =====================================================

const quoteForm =
    document.getElementById("quoteForm");


if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const service =
                document.getElementById("service").value;

            const message =
                document.getElementById("message").value.trim();

            // Basic validation
            if (!name || !phone || !service) {

                alert(
                    "Please fill in your name, phone number and service."
                );

                return;

            }

            // Indian phone validation
            const phoneRegex = /^[6-9]\d{9}$/;

            if (!phoneRegex.test(phone)) {

                alert(
                    "Please enter a valid 10-digit Indian mobile number."
                );

                return;

            }

            const submitButton =
                quoteForm.querySelector(".submit-btn");

            const originalText =
                submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = "Sending...";

            try {

                const response =
                    await fetch(
                        "/api/enquiries",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                name: name,
                                phone: phone,
                                service: service,
                                message: message
                            })
                        }
                    );

                const data = await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Something went wrong."
                    );

                }

                alert(
                    "Thank you! Your enquiry has been submitted successfully."
                );

                quoteForm.reset();

            }

            catch (error) {

                console.error("Enquiry error:", error);

                alert(
                    "Unable to submit your enquiry right now. Please call us directly."
                );

            }

            finally {

                submitButton.disabled = false;
                submitButton.innerHTML = originalText;

            }

        }
    );

}


// =====================================================
// WINDOW RESIZE
// =====================================================

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    }
);


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();

    }
);
// =====================================================
// PRODUCTS SECTION (products.js)
// Add or edit products in the PRODUCTS list below.
// No prices are shown on purpose: customers call/WhatsApp.
// =====================================================

(function () {

    const WHATSAPP = "919509108419";
    const PHONE = "7014217544";

    // cat: cameras | recorders | accessories
    const PRODUCTS = [
        // ---------- CAMERAS ----------
        { cat: "cameras", icon: "📷",
          en: ["Dome Camera", "Compact indoor camera for homes, shops and offices."],
          hi: ["डोम कैमरा", "घर, दुकान और ऑफिस के अंदर लगाने के लिए छोटा कैमरा।"] },
        { cat: "cameras", icon: "🎥",
          en: ["Bullet Camera", "Weather-ready camera for gates, boundaries and outdoor areas."],
          hi: ["बुलेट कैमरा", "गेट, बाउंड्री और बाहर की जगह के लिए मौसम-रोधी कैमरा।"] },
        { cat: "cameras", icon: "🔭",
          en: ["PTZ Camera", "Pan, tilt and zoom to watch large areas from one point."],
          hi: ["PTZ कैमरा", "घूमने और ज़ूम होने वाला कैमरा, बड़ी जगह पर नज़र रखने के लिए।"] },
        { cat: "cameras", icon: "📶",
          en: ["Wi-Fi Camera", "Wireless camera with mobile viewing. Easy to set up at home."],
          hi: ["वाई-फाई कैमरा", "मोबाइल पर देखने वाला वायरलेस कैमरा, घर के लिए आसान।"] },
        { cat: "cameras", icon: "🌙",
          en: ["Night Vision / Colour Camera", "Clear footage at night, with colour recording options."],
          hi: ["नाइट विज़न / कलर कैमरा", "रात में भी साफ़ रिकॉर्डिंग, कलर रिकॉर्डिंग के विकल्प के साथ।"] },

        // ---------- RECORDERS ----------
        { cat: "recorders", icon: "🗄️",
          en: ["DVR", "Digital video recorder for analog and HD camera systems."],
          hi: ["DVR", "एनालॉग और HD कैमरा सिस्टम के लिए डिजिटल वीडियो रिकॉर्डर।"] },
        { cat: "recorders", icon: "🖥️",
          en: ["NVR", "Network video recorder for IP camera systems."],
          hi: ["NVR", "IP कैमरा सिस्टम के लिए नेटवर्क वीडियो रिकॉर्डर।"] },
        { cat: "recorders", icon: "💾",
          en: ["Surveillance Hard Disk", "Hard disks built for 24/7 recording, in different capacities."],
          hi: ["सर्विलांस हार्ड डिस्क", "24 घंटे रिकॉर्डिंग के लिए बनी हार्ड डिस्क, अलग-अलग साइज़ में।"] },

        // ---------- ACCESSORIES ----------
        { cat: "accessories", icon: "🔌",
          en: ["SMPS / Power Supply", "Stable power supply for single or multiple cameras."],
          hi: ["SMPS / पावर सप्लाई", "एक या कई कैमरों के लिए स्थिर पावर सप्लाई।"] },
        { cat: "accessories", icon: "🔗",
          en: ["Cables & Connectors", "CCTV cable, Cat6, BNC and DC connectors for clean wiring."],
          hi: ["केबल और कनेक्टर", "सही वायरिंग के लिए CCTV केबल, Cat6, BNC और DC कनेक्टर।"] },
        { cat: "accessories", icon: "🔀",
          en: ["PoE Switch", "Power and data to IP cameras through one network cable."],
          hi: ["PoE स्विच", "एक ही नेटवर्क केबल से IP कैमरों को पावर और डेटा।"] },
        { cat: "accessories", icon: "📺",
          en: ["Monitor / LED Display", "Screens for live viewing at your counter or office."],
          hi: ["मॉनिटर / LED डिस्प्ले", "काउंटर या ऑफिस में लाइव देखने के लिए स्क्रीन।"] },
        { cat: "accessories", icon: "🔩",
          en: ["Mounts & Junction Boxes", "Brackets and boxes for neat, secure camera fitting."],
          hi: ["माउंट और जंक्शन बॉक्स", "कैमरा सही और मज़बूती से लगाने के लिए ब्रैकेट और बॉक्स।"] },
        { cat: "accessories", icon: "🔋",
          en: ["UPS / Backup Power", "Keep cameras recording during power cuts."],
          hi: ["UPS / बैकअप पावर", "बिजली जाने पर भी कैमरे चालू रखने के लिए।"] }
    ];

    const UI = {
        en: {
            tag: "OUR PRODUCTS",
            title: "Everything for your<br><span>CCTV setup.</span>",
            intro: "Cameras, recorders and every accessory in one place. Tell us what you need and we will help you pick the right set.",
            brands: "Brands available",
            help: "Not sure which product fits your property?",
            helpBtn: "Try the CCTV Advisor",
            all: "All", cameras: "Cameras", recorders: "Recorders", accessories: "Accessories",
            enquire: "Get a Quote", call: "Call", wa: "WhatsApp",
            waText: "Hello Krishna Engineering, I want to enquire about: ",
            formText: "Product enquiry: "
        },
        hi: {
            tag: "हमारे प्रोडक्ट्स",
            title: "आपके CCTV सेटअप का<br><span>सारा सामान।</span>",
            intro: "कैमरा, रिकॉर्डर और हर एक्सेसरी एक ही जगह। आपको क्या चाहिए बताइए, हम सही सेट चुनने में मदद करेंगे।",
            brands: "उपलब्ध ब्रांड",
            help: "समझ नहीं आ रहा कौन सा प्रोडक्ट सही रहेगा?",
            helpBtn: "CCTV एडवाइज़र आज़माएँ",
            all: "सभी", cameras: "कैमरा", recorders: "रिकॉर्डर", accessories: "एक्सेसरीज़",
            enquire: "कोटेशन लें", call: "कॉल", wa: "WhatsApp",
            waText: "नमस्ते Krishna Engineering, मुझे इस प्रोडक्ट की जानकारी चाहिए: ",
            formText: "प्रोडक्ट इन्क्वायरी: "
        }
    };

    const CATS = ["all", "cameras", "recorders", "accessories"];
    let activeCat = "all";

    function lang() {
        return document.body.classList.contains("lang-hi") ? "hi" : "en";
    }

    function esc(text) {
        const d = document.createElement("div");
        d.textContent = text;
        return d.innerHTML;
    }

    function renderStatic() {
        const t = UI[lang()];
        document.querySelectorAll("#products [data-p]").forEach(function (el) {
            const key = el.getAttribute("data-p");
            if (t[key]) el.innerHTML = t[key];
        });
    }

    function renderFilters() {
        const box = document.getElementById("prodFilters");
        if (!box) return;
        const t = UI[lang()];

        box.innerHTML = CATS.map(function (c) {
            return '<button type="button" role="tab" class="prod-filter' +
                (c === activeCat ? " active" : "") + '" data-cat="' + c +
                '" aria-selected="' + (c === activeCat) + '">' + esc(t[c]) + "</button>";
        }).join("");
    }

    function renderGrid() {
        const grid = document.getElementById("prodGrid");
        if (!grid) return;
        const l = lang();
        const t = UI[l];

        grid.innerHTML = PRODUCTS.map(function (p, i) {
            if (activeCat !== "all" && p.cat !== activeCat) return "";
            const name = p[l][0];
            const desc = p[l][1];
            const wa = "https://wa.me/" + WHATSAPP + "?text=" +
                encodeURIComponent(t.waText + p.en[0]);

            return '<article class="prod-card">' +
                '<div class="prod-icon" aria-hidden="true">' + p.icon + "</div>" +
                '<h3>' + esc(name) + "</h3>" +
                '<p>' + esc(desc) + "</p>" +
                '<div class="prod-actions">' +
                    '<button type="button" class="prod-quote" data-i="' + i + '">' + esc(t.enquire) + "</button>" +
                    '<a class="prod-mini" href="tel:' + PHONE + '" aria-label="' + esc(t.call) + '">📞</a>' +
                    '<a class="prod-mini prod-wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="' + esc(t.wa) + '">💬</a>' +
                "</div></article>";
        }).join("");
    }

    function renderAll() {
        renderStatic();
        renderFilters();
        renderGrid();
    }

    // Quote button: fills the quote form with the product and scrolls to it
    function fillQuote(index) {
        const p = PRODUCTS[index];
        if (!p) return;

        const service = document.getElementById("service");
        const message = document.getElementById("message");

        if (service) service.value = "Other CCTV Requirement";
        if (message) message.value = UI[lang()].formText + p[lang()][0];

        const contact = document.getElementById("contact");
        if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener("click", function (e) {
        const filter = e.target.closest(".prod-filter");
        if (filter) {
            activeCat = filter.getAttribute("data-cat");
            renderFilters();
            renderGrid();
            return;
        }

        const quote = e.target.closest(".prod-quote");
        if (quote) fillQuote(Number(quote.getAttribute("data-i")));
    });

    document.addEventListener("DOMContentLoaded", function () {
        renderAll();

        // Re-render when the Hindi/English toggle changes the body class
        let current = lang();
        new MutationObserver(function () {
            if (lang() !== current) {
                current = lang();
                renderAll();
            }
        }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    });

})();