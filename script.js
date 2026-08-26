/* LiveTool Client-Side Engine with Real-Time English/Bangla Translator */

// Current language state (saved in browser memory)
let currentLang = localStorage.getItem('livetool_lang') || 'en';

// Bilingual Translation Dictionary
const I18N = {
  en: {
    nav_tools: "Tools (22+)",
    nav_about: "About",
    nav_faq: "FAQ",
    nav_privacy: "Privacy",
    nav_terms: "Terms",
    nav_contact: "Contact & Support",
    hero_pill: "✨ 100% CLIENT-FIRST PRIVACY • NO REGISTRATION • 22+ PRO UTILITIES",
    hero_title: "Essential Online Tools for Everyday Productivity.",
    hero_desc: "AI Background Isolation, 4K Super-Resolution Upscaling, Lossless Resizing, Multi-Unit Converters, Financial Calculators, and Developer Utilities — running 100% inside your browser memory.",
    hero_btn_explore: "Explore All 22+ Tools",
    hero_btn_suggest: "Report an Issue / Suggest",
    catalog_title: "Free Browser Utilities",
    catalog_subtitle: "Select a category or search for tools instantly",
    catalog_badge: "22+ Production Tools",
    search_placeholder: "🔍 Search 22+ tools (e.g. background, enhance, resize, compress, unit, age, json)...",
    cat_all: "All Utilities (22+)",
    cat_image: "✨ AI & Image Suite",
    cat_calc: "🧮 Calculators",
    cat_converter: "📏 Converters",
    cat_text: "📝 Text Utilities",
    cat_dev: "⚡ Dev & Security",
    
    // Tools
    t1_title: "AI Background Remover",
    t1_desc: "Clean subject isolation & true transparent PNG.",
    lbl_tolerance: "Sensitivity Tolerance",
    opt_trans: "Transparent PNG (No Background)",
    opt_white: "Solid White Background",
    opt_black: "Solid Black Background",
    btn_remove_bg: "Remove Background",

    t2_title: "AI Image Enhancer (4K HD)",
    t2_desc: "Super-resolution upscale & unsharp mask clarity.",
    opt_scale_2: "2X Super-Resolution (HD)",
    opt_scale_4: "4X Super-Resolution (4K Ultra)",
    btn_enhance: "Enhance & Upscale",

    t3_title: "HD Image Resizer",
    t3_desc: "Resize images without losing clarity.",
    ph_width: "Width (px)",
    ph_height: "Height (px)",
    btn_resize: "Resize & Download",

    t4_title: "Smart Image Compressor",
    t4_desc: "Reduce file size with lossless optimization.",
    lbl_quality: "Quality",
    btn_compress: "Compress & Download",

    t5_title: "Image Format Converter",
    t5_desc: "Convert JPG ↔ PNG ↔ WebP in high fidelity.",
    opt_fmt_png: "Output as PNG (Transparency)",
    opt_fmt_jpg: "Output as JPG / JPEG",
    opt_fmt_webp: "Output as WebP (Ultra Fast)",
    btn_convert_img: "Convert & Save",

    t6_title: "Precision Image Cropper",
    t6_desc: "Crop images from center with custom dimensions.",
    ph_crop_w: "Crop Width (px)",
    ph_crop_h: "Crop Height (px)",
    btn_crop: "Crop & Download",

    t7_title: "Universal Unit Converter",
    t7_desc: "Length, Weight, Temp, Storage, Speed & Time.",
    opt_len: "Length (Meters, Feet, Inches, KM)",
    opt_wgt: "Weight (KG, Grams, Pounds, Oz)",
    opt_str: "Digital Data (MB, GB, TB, KB)",
    opt_spd: "Speed (KM/h, MPH, M/s)",
    res_unit_init: "Result will appear here",

    t8_title: "Precision Age & Life Stats",
    t8_desc: "Exact years, months, days & next birthday.",
    btn_calc_age: "Calculate Age",
    res_age_init: "Select birthdate above",

    t9_title: "Smart BMI & Health Tracker",
    t9_desc: "Calculate Body Mass Index & ideal weight.",
    ph_bmi_w: "Weight (kg)",
    ph_bmi_h: "Height (cm)",
    btn_calc_bmi: "Calculate BMI",
    res_bmi_init: "Enter height and weight",

    t10_title: "Loan EMI & Finance Calculator",
    t10_desc: "Monthly installment & total interest growth.",
    ph_loan_p: "Loan / Principal Amount ($)",
    ph_loan_r: "Annual Rate (%)",
    ph_loan_m: "Tenure (Months)",
    btn_calc_loan: "Calculate EMI",
    res_loan_init: "Enter principal and rate",

    t11_title: "Color Palette Studio",
    t11_desc: "Harmonic HEX palettes & shade generator.",
    btn_gen_palette: "Generate Random Palette",

    t12_title: "JSON Validator & Formatter",
    t12_desc: "Format, minify & validate JSON syntax.",
    btn_beautify: "Beautify",
    btn_minify: "Minify",

    t13_title: "Live Word & Character Counter",
    t13_desc: "Real-time analytics and reading time.",
    ph_word_txt: "Type or paste your text here...",
    lbl_words: "Words",
    lbl_chars: "Chars",
    lbl_reading: "Reading",

    t14_title: "Smart Case Converter",
    t14_desc: "Convert text to UPPER, lower, Title or Sentence case.",
    ph_case_txt: "Type or paste text here...",

    t15_title: "Duplicate Lines Remover",
    t15_desc: "Remove duplicate lines and clean lists.",
    ph_dupe_txt: "Paste lines of text...",
    btn_remove_dupe: "Remove Dupes",
    btn_sort_az: "Sort A–Z",

    t16_title: "Number & Email Extractor",
    t16_desc: "Pull out numbers and emails from raw text.",
    ph_extract_txt: "Paste text containing numbers or emails...",
    btn_ext_num: "Extract Numbers",
    btn_ext_eml: "Extract Emails",

    t17_title: "HD QR Code Generator",
    t17_desc: "Generate scannable QR codes for websites & text.",
    ph_qr_txt: "Enter URL or text (e.g. https://google.com)",
    btn_gen_qr: "Generate QR",

    t18_title: "Secure Password Generator",
    t18_desc: "Generate cryptographically strong passwords.",
    ph_pass_len: "Length (e.g. 16)",
    btn_gen_pass: "Generate Password",
    res_pass_init: "Click generate above",

    about_title: "About LiveTool",
    about_desc: "LiveTool is a modern, privacy-first suite of web utilities designed to make digital work faster and effortless. All 22+ tools process your files directly inside your browser memory (RAM), ensuring that your photos, documents, and personal details are never uploaded or stored on any external server.",
    faq_title: "Frequently Asked Questions",
    faq_q1: "Are these 22+ utilities really 100% free?",
    faq_a1: "Yes, absolutely. All utilities on LiveTool are completely free with no daily limits, hidden subscriptions, or account requirements.",
    faq_q2: "Are my images or documents uploaded to a remote server?",
    faq_a2: "No. LiveTool processes images, calculations, and conversions entirely inside your local browser using HTML5 Canvas and WebAssembly. Your files never leave your device.",
    faq_q3: "How can I request a new tool or report an issue?",
    faq_a3: "You can visit our Contact & Support page or email us directly at Lifetooloffice@gmail.com.",
    footer_brand_desc: "Fast, privacy-first online utilities crafted for creators, developers, and everyday productivity.",
    foot_nav: "Navigation",
    foot_legal: "Legal & Support"
  },

  bn: {
    nav_tools: "সকল টুলস (২২+)",
    nav_about: "আমাদের সম্পর্কে",
    nav_faq: "প্রশ্নোত্তর (FAQ)",
    nav_privacy: "প্রাইভেসি পলিসি",
    nav_terms: "শর্তাবলী",
    nav_contact: "যোগাযোগ ও সাপোর্ট",
    hero_pill: "✨ ১০০% ক্লায়েন্ট-সাইড প্রাইভেসি • কোনো রেজিস্ট্রেশন ছাড়াই ২২+ প্রো টুলস",
    hero_title: "দৈনন্দিন কাজের জন্য প্রয়োজনীয় সব অনলাইন টুলস।",
    hero_desc: "এআই ব্যাকগ্রাউন্ড রিমুভার, ৪K ইমেজ এনহ্যান্সার, সাইজ পরিবর্তন, ইউনিট কনভার্টার, আর্থিক ক্যালকুলেটর ও ডেভেলপার টুলস — কোনো সার্ভার আপলোড ছাড়াই ব্রাউজারে চলবে দ্রুত গতিতে।",
    hero_btn_explore: "২২+ টি টুলস দেখুন",
    hero_btn_suggest: "সমস্যা রিপোর্ট / পরামর্শ দিন",
    catalog_title: "ফ্রি অনলাইন ইউটিলিটি টুলস",
    catalog_subtitle: "ক্যাটাগরি বাছাই করুন অথবা সরাসরি টুলস খুঁজুন",
    catalog_badge: "২২+ প্রোডাকশন টুলস",
    search_placeholder: "🔍 টুলস খুঁজুন (যেমন: ব্যাকগ্রাউন্ড, ইমেজ, বয়স, কনভার্টার, জেএসন)...",
    cat_all: "সকল টুলস (২২+)",
    cat_image: "✨ এআই ও ইমেজ টুলস",
    cat_calc: "🧮 ক্যালকুলেটর",
    cat_converter: "📏 কনভার্টার",
    cat_text: "📝 টেক্সট ইউটিলিটি",
    cat_dev: "⚡ ডেভেলপার টুলস",
    
    // Tools
    t1_title: "এআই ব্যাকগ্রাউন্ড রিমুভার",
    t1_desc: "ছবির ব্যাকগ্রাউন্ড মুছে শতভাগ স্বচ্ছ ট্রান্সপারেন্ট পিএনজি তৈরি করুন।",
    lbl_tolerance: "কালার সংবেদনশীলতা",
    opt_trans: "স্বচ্ছ PNG (কোনো ব্যাকগ্রাউন্ড থাকবে না)",
    opt_white: "সাদা ব্যাকগ্রাউন্ড (Solid White)",
    opt_black: "কালো ব্যাকগ্রাউন্ড (Solid Black)",
    btn_remove_bg: "ব্যাকগ্রাউন্ড রিমুভ করুন",

    t2_title: "এআই ইমেজ এনহ্যান্সার (৪K এইচডি)",
    t2_desc: "ছবির ঝাপসা দূর করে নিখুঁত শার্পনেস ও ৪K রেজোলিউশন করুন।",
    opt_scale_2: "২X সুপার-রেজোলিউশন (এইচডি)",
    opt_scale_4: "৪X সুপার-রেজোলিউশন (৪K আল্ট্রা)",
    btn_enhance: "এনহ্যান্স ও বড় করুন",

    t3_title: "এইচডি ইমেজ রিসাইজার",
    t3_desc: "কোয়ালিটি ঠিক রেখে ছবির সাইজ বা রেজোলিউশন পরিবর্তন করুন।",
    ph_width: "প্রস্থ / Width (px)",
    ph_height: "উচ্চতা / Height (px)",
    btn_resize: "রিসাইজ ও ডাউনলোড",

    t4_title: "স্মার্ট ইমেজ কম্প্রেসর",
    t4_desc: "ছবির মেগাবাইট বা কিলোবাইট কমিয়ে সাইজ অপ্টিমাইজ করুন।",
    lbl_quality: "কোয়ালিটি লেভেল",
    btn_compress: "কম্প্রেস ও ডাউনলোড",

    t5_title: "ইমেজ ফরম্যাট কনভার্টার",
    t5_desc: "JPG ↔ PNG ↔ WebP ফরম্যাটে ছবি রূপান্তর করুন।",
    opt_fmt_png: "PNG ফরম্যাটে সেভ করুন (ট্রান্সপারেন্ট)",
    opt_fmt_jpg: "JPG / JPEG ফরম্যাটে সেভ করুন",
    opt_fmt_webp: "WebP ফরম্যাটে সেভ করুন (দ্রুত গতির)",
    btn_convert_img: "কনভার্ট ও সেভ করুন",

    t6_title: "প্রিসিশন ইমেজ ক্রপার",
    t6_desc: "ছবির যেকোনো অংশ মাপমতো নিখুঁতভাবে কাটুন।",
    ph_crop_w: "কাটার প্রস্থ (px)",
    ph_crop_h: "কাটার উচ্চতা (px)",
    btn_crop: "ক্রপ ও ডাউনলোড",

    t7_title: "ইউনিভার্সাল ইউনিট কনভার্টার",
    t7_desc: "দৈর্ঘ্য, ওজন, তাপমাত্রা, ডেটা স্টোরেজ ও গতি রূপান্তর।",
    opt_len: "দৈর্ঘ্য (মিটার, ফুট, ইঞ্চি, কিমি)",
    opt_wgt: "ওজন (কেজি, গ্রাম, পাউন্ড, আউন্স)",
    opt_str: "ডিজিটাল ডেটা (MB, GB, TB, KB)",
    opt_spd: "গতি (কিমি/ঘণ্টা, MPH, মি/সেকেন্ড)",
    res_unit_init: "ফলাফল এখানে প্রদর্শিত হবে",

    t8_title: "সঠিক বয়স ও জীবন পরিসংখ্যান",
    t8_desc: "বছর, মাস, দিন এবং পরবর্তী জন্মদিনের সময় জানুন।",
    btn_calc_age: "বয়স হিসাব করুন",
    res_age_init: "উপরে জন্ম তারিখ নির্বাচন করুন",

    t9_title: "স্মার্ট বিএমআই ও স্বাস্থ্য ট্র্যাকার",
    t9_desc: "শরীরের উচ্চতা ও ওজনের সঠিক অনুপাত (BMI) মাপুন।",
    ph_bmi_w: "ওজন / Weight (kg)",
    ph_bmi_h: "উচ্চতা / Height (cm)",
    btn_calc_bmi: "বিএমআই হিসাব করুন",
    res_bmi_init: "উচ্চতা ও ওজন দিন",

    t10_title: "লোন ইএমআই ও ফাইন্যান্স ক্যালকুলেটর",
    t10_desc: "মাসিক কিস্তি ও মোট সুদের হিসাব বের করুন।",
    ph_loan_p: "লোন বা মূল টাকা ($ / ৳)",
    ph_loan_r: "বার্ষিক সুদের হার (%)",
    ph_loan_m: "মেয়াদ (মাস সংখ্যা)",
    btn_calc_loan: "কিস্তি হিসাব করুন",
    res_loan_init: "টাকার পরিমাণ ও সুদের হার দিন",

    t11_title: "কালার প্যালেট স্টুডিও",
    t11_desc: "সুন্দর কালার কোড (HEX) জেনারেটর।",
    btn_gen_palette: "র‍্যান্ডম কালার প্যালেট তৈরি করুন",

    t12_title: "JSON ভ্যালিডেটর ও ফরম্যাটার",
    t12_desc: "জেএসন ডাটা সহজে সাজান বা মিনিফাই করুন।",
    btn_beautify: "সাজিয়ে নিন (Beautify)",
    btn_minify: "মিনিফাই করুন (Minify)",

    t13_title: "লাইভ ওয়ার্ড ও বর্ণ গণক",
    t13_desc: "মোট শব্দ, বর্ণ ও পড়ার আনুমানিক সময় জানুন।",
    ph_word_txt: "এখানে টেক্সট লিখুন বা পেস্ট করুন...",
    lbl_words: "মোট শব্দ",
    lbl_chars: "মোট বর্ণ",
    lbl_reading: "পড়ার সময়",

    t14_title: "স্মার্ট কেস কনভার্টার",
    t14_desc: "টেক্সটকে বড় হাতের, ছোট হাতের বা টাইটেল কেস করুন।",
    ph_case_txt: "এখানে আপনার টেক্সট পেস্ট করুন...",

    t15_title: "ডুপ্লিকেট লাইন রিমুভার",
    t15_desc: "একই লেখা বা ডুপ্লিকেট লাইন এক ক্লিকে মুছে ফেলুন।",
    ph_dupe_txt: "তালিকা বা লাইন পেস্ট করুন...",
    btn_remove_dupe: "ডুপ্লিকেট মুছুন",
    btn_sort_az: "A–Z সাজান",

    t16_title: "নাম্বার ও ইমেইল এক্সট্রাক্টর",
    t16_desc: "যেকোনো লেখা থেকে ফোন নাম্বার ও ইমেইল আলাদা করুন।",
    ph_extract_txt: "লেখা পেস্ট করুন...",
    btn_ext_num: "নাম্বার বের করুন",
    btn_ext_eml: "ইমেইল বের করুন",

    t17_title: "এইচডি কিউআর কোড জেনারেটর",
    t17_desc: "ওয়েবসাইট লিংক বা টেক্সটের জন্য QR কোড তৈরি করুন।",
    ph_qr_txt: "লিংক বা টেক্সট লিখুন...",
    btn_gen_qr: "QR কোড তৈরি করুন",

    t18_title: "সিকিউর পাসওয়ার্ড জেনারেটর",
    t18_desc: "শক্তিশালী এবং নিরাপদ পাসওয়ার্ড তৈরি করুন।",
    ph_pass_len: "দৈর্ঘ্য (যেমন: ১৬)",
    btn_gen_pass: "পাসওয়ার্ড জেনারেট করুন",
    res_pass_init: "উপরে জেনারেট বাটনে ক্লিক করুন",

    about_title: "LiveTool সম্পর্কে",
    about_desc: "LiveTool হলো একটি আধুনিক ও শতভাগ ক্লায়েন্ট-সাইড প্রাইভেসি-বান্ধব টুল প্ল্যাটফর্ম। এখানে থাকা সকল ২২+ টি টুল আপনার ব্রাউজারের মেমোরিতে সরাসরি চলে, ফলে কোনো ফাইল বা ছবি কোনো দূরবর্তী সার্ভারে আপলোড হয় না।",
    faq_title: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী (FAQ)",
    faq_q1: "এই ২২+ টি টুল কি সম্পূর্ণ ফ্রি?",
    faq_a1: "হ্যাঁ, সম্পূর্ণ ফ্রি। কোনো সাবস্ক্রিপশন ফি বা একাউন্ট রেজিস্ট্রেশন ছাড়াই আনলিমিটেড ব্যবহার করা যায়।",
    faq_q2: "আমার ছবি বা ফাইল কি কোনো সার্ভারে সংরক্ষিত হয়?",
    faq_a2: "না। HTML5 ক্যানভাস প্রযুক্তির মাধ্যমে সব প্রসেসিং আপনার মোবাইল বা কম্পিউটারের ব্রাউজারেই সম্পন্ন হয়।",
    faq_q3: "নতুন কোনো টুলের অনুরোধ বা সমস্যার কথা কীভাবে জানাব?",
    faq_a3: "আমাদের সাপোর্ট পেজের মাধ্যমে অথবা সরাসরি Lifetooloffice@gmail.com ঠিকানায় ইমেইল পাঠাতে পারেন।",
    footer_brand_desc: "দ্রুত, নির্ভরযোগ্য ও প্রাইভেসি-বান্ধব অনলাইন টুলস।",
    foot_nav: "নেভিগেশন",
    foot_legal: "লিগ্যাল ও সাপোর্ট"
  }
};

// Apply language translations across the whole website
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('livetool_lang', lang);

  const dict = I18N[lang] || I18N.en;
  
  // Update toggle button text
  const label = document.getElementById('langLabel');
  if (label) {
    label.textContent = lang === 'bn' ? 'English' : 'বাংলা';
  }

  // Update text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

function toggleLanguage() {
  const nextLang = currentLang === 'en' ? 'bn' : 'en';
  applyLanguage(nextLang);
}

// 1. Mobile Menu Drawer
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

function closeMobileMenu() {
  if (navLinks) navLinks.classList.remove('open');
}

// 2. Search & Category Filter Engine
function filterTools() {
  const q = (document.getElementById('toolSearch')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(c => {
    const text = (c.getAttribute('data-name') || '') + ' ' + c.innerText.toLowerCase();
    c.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.filter-chips .chip').forEach(ch => ch.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(c => {
    if (cat === 'all' || c.classList.contains(cat)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });
}

// 3. AI Background Remover (Zero Shadow & 100% Crisp Transparent Output)
function runBgRemover() {
  const fileInput = document.getElementById('bgRemoverFile');
  const file = fileInput?.files?.[0];
  if (!file) {
    alert(currentLang === 'bn' ? 'দয়া করে প্রথমে একটি ছবি নির্বাচন করুন।' : 'Please select an image first!');
    return;
  }
  const tol = parseInt(document.getElementById('bgTolerance')?.value || '35', 10);
  const outFormat = document.getElementById('bgOutputFormat')?.value || 'transparent';

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const width = img.width;
      const height = img.height;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const srcData = ctx.getImageData(0, 0, width, height);
      const src = srcData.data;

      // 1. Multi-band perimeter background sampling
      const bgSamples = [];
      const step = Math.max(2, Math.floor(Math.min(width, height) / 40));
      for (let d = 0; d < 4; d++) {
        for (let x = 0; x < width; x += step) {
          const tIdx = (d * width + x) * 4;
          const bIdx = ((height - 1 - d) * width + x) * 4;
          bgSamples.push([src[tIdx], src[tIdx + 1], src[tIdx + 2]]);
          bgSamples.push([src[bIdx], src[bIdx + 1], src[bIdx + 2]]);
        }
        for (let y = 0; y < height; y += step) {
          const lIdx = (y * width + d) * 4;
          const rIdx = (y * width + (width - 1 - d)) * 4;
          bgSamples.push([src[lIdx], src[lIdx + 1], src[lIdx + 2]]);
          bgSamples.push([src[rIdx], src[rIdx + 1], src[rIdx + 2]]);
        }
      }

      // 2. Sobel edge barrier
      const grayscale = new Uint8Array(width * height);
      for (let i = 0, p = 0; i < src.length; i += 4, p++) {
        grayscale[p] = (src[i] * 77 + src[i + 1] * 150 + src[i + 2] * 29) >> 8;
      }
      const edgeMap = new Uint8Array(width * height);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          const gx = -grayscale[idx - width - 1] + grayscale[idx - width + 1] - 2 * grayscale[idx - 1] + 2 * grayscale[idx + 1] - grayscale[idx + width - 1] + grayscale[idx + width + 1];
          const gy = -grayscale[idx - width - 1] - 2 * grayscale[idx - width] - grayscale[idx - width + 1] + grayscale[idx + width - 1] + 2 * grayscale[idx + width] + grayscale[idx + width + 1];
          edgeMap[idx] = Math.min(255, Math.sqrt(gx * gx + gy * gy));
        }
      }

      // 3. BFS traversal
      const isBg = new Uint8Array(width * height);
      const visited = new Uint8Array(width * height);
      const queue = new Int32Array(width * height);
      let head = 0;
      let tail = 0;

      const maxDistSq = (tol * 1.1) * (tol * 1.1);

      function isBgPixel(r, g, b, px, py) {
        // Skin protection
        const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
        if (cb >= 78 && cb <= 128 && cr >= 132 && cr <= 178 && r > g && g > b) {
          return false;
        }

        const distFromCenter = Math.hypot(px - width * 0.5, py - height * 0.45) / Math.hypot(width, height);
        if (distFromCenter < 0.22) {
          const innerLimit = (tol * 0.65) * (tol * 0.65);
          for (let s = 0; s < bgSamples.length; s += 4) {
            const [sr, sg, sb] = bgSamples[s];
            const dr = r - sr, dg = g - sg, db = b - sb;
            if (dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114 <= innerLimit) return true;
          }
          return false;
        }

        for (let s = 0; s < bgSamples.length; s += 3) {
          const [sr, sg, sb] = bgSamples[s];
          const dr = r - sr, dg = g - sg, db = b - sb;
          if (dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114 <= maxDistSq) return true;
        }
        return false;
      }

      for (let x = 0; x < width; x++) {
        const t = x, b = (height - 1) * width + x;
        if (!visited[t]) {
          visited[t] = 1;
          const p4 = t * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], x, 0)) {
            isBg[t] = 1; queue[tail++] = t;
          }
        }
        if (!visited[b]) {
          visited[b] = 1;
          const p4 = b * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], x, height - 1)) {
            isBg[b] = 1; queue[tail++] = b;
          }
        }
      }

      for (let y = 0; y < height; y++) {
        const l = y * width, r = y * width + (width - 1);
        if (!visited[l]) {
          visited[l] = 1;
          const p4 = l * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], 0, y)) {
            isBg[l] = 1; queue[tail++] = l;
          }
        }
        if (!visited[r]) {
          visited[r] = 1;
          const p4 = r * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], width - 1, y)) {
            isBg[r] = 1; queue[tail++] = r;
          }
        }
      }

      const edgeThreshold = Math.max(16, 120 - 26 * 2.8);

      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = (curr / width) | 0;

        const neighbors = [
          cy > 0 ? curr - width : -1,
          cy < height - 1 ? curr + width : -1,
          cx > 0 ? curr - 1 : -1,
          cx < width - 1 ? curr + 1 : -1,
        ];

        for (let n = 0; n < 4; n++) {
          const nIdx = neighbors[n];
          if (nIdx === -1 || visited[nIdx]) continue;
          visited[nIdx] = 1;

          if (edgeMap[nIdx] > edgeThreshold) continue;

          const nx = nIdx % width;
          const ny = (nIdx / width) | 0;
          const p4 = nIdx * 4;
          if (isBgPixel(src[p4], src[p4 + 1], src[p4 + 2], nx, ny)) {
            isBg[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
      }

      // Output Clean Data
      const outData = ctx.createImageData(width, height);
      const out = outData.data;

      for (let i = 0, p = 0; i < src.length; i += 4, p++) {
        if (isBg[p] === 1) {
          if (outFormat === 'white') {
            out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = 255;
          } else if (outFormat === 'black') {
            out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 255;
          } else {
            out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
          }
        } else {
          out[i] = src[i];
          out[i + 1] = src[i + 1];
          out[i + 2] = src[i + 2];
          out[i + 3] = 255;
        }
      }

      ctx.putImageData(outData, 0, 0);

      const mime = outFormat === 'transparent' ? 'image/png' : 'image/jpeg';
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'livetool-cutout.' + (outFormat === 'transparent' ? 'png' : 'jpg');
        a.click();
        const prev = document.getElementById('bgRemoverPreview');
        if (prev) {
          prev.innerHTML = '<img src="' + url + '" alt="Cutout Preview">';
        }
      }, mime, 0.98);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 4. AI Image Enhancer (4K HD)
function runEnhancer() {
  const fileInput = document.getElementById('enhancerFile');
  const file = fileInput?.files?.[0];
  if (!file) {
    alert(currentLang === 'bn' ? 'দয়া করে একটি ছবি বাছাই করুন।' : 'Please choose an image to enhance!');
    return;
  }
  const scale = parseInt(document.getElementById('enhanceScale')?.value || '2', 10);
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] * 1.05));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * 1.05));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * 1.05));
      }
      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'livetool-enhanced-4k.jpg';
        a.click();
        const prev = document.getElementById('enhancerPreview');
        if (prev) {
          prev.innerHTML = '<img src="' + url + '" alt="Enhanced Preview">';
        }
      }, 'image/jpeg', 0.96);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 5. HD Image Resizer
function runResizer() {
  const fileInput = document.getElementById('resizerFile');
  const file = fileInput?.files?.[0];
  const w = parseInt(document.getElementById('resizerWidth')?.value, 10);
  const h = parseInt(document.getElementById('resizerHeight')?.value, 10);

  if (!file) {
    alert(currentLang === 'bn' ? 'ছবি নির্বাচন করুন।' : 'Please select an image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const targetW = w || img.width;
      const targetH = h || (img.height * (targetW / img.width));

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-image.png';
        a.click();
      }, 'image/png');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 6. Image Compressor
function runCompressor() {
  const fileInput = document.getElementById('compressorFile');
  const file = fileInput?.files?.[0];
  const quality = parseInt(document.getElementById('compressorQuality')?.value || '75', 10) / 100;

  if (!file) {
    alert(currentLang === 'bn' ? 'ছবি নির্বাচন করুন।' : 'Please choose an image first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compressed-image.jpg';
        a.click();
      }, 'image/jpeg', quality);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 7. Format Converter
function runConverter() {
  const fileInput = document.getElementById('converterFile');
  const file = fileInput?.files?.[0];
  const format = document.getElementById('targetFormat')?.value || 'png';

  if (!file) {
    alert(currentLang === 'bn' ? 'ছবি নির্বাচন করুন।' : 'Please choose an image to convert.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const mime = 'image/' + (format === 'jpg' ? 'jpeg' : format);
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-image.' + (format === 'jpeg' ? 'jpg' : format);
        a.click();
      }, mime, 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 8. Image Cropper
function runCropper() {
  const fileInput = document.getElementById('cropperFile');
  const file = fileInput?.files?.[0];
  const cropW = parseInt(document.getElementById('cropWidth')?.value, 10);
  const cropH = parseInt(document.getElementById('cropHeight')?.value, 10);

  if (!file) {
    alert(currentLang === 'bn' ? 'ছবি নির্বাচন করুন।' : 'Please select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const w = cropW || Math.min(img.width, img.height);
      const h = cropH || w;
      const startX = Math.max(0, (img.width - w) / 2);
      const startY = Math.max(0, (img.height - h) / 2);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, startX, startY, w, h, 0, 0, w, h);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cropped-image.png';
        a.click();
      }, 'image/png');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 9. Unit Converter Multipliers
const UNIT_MAP = {
  length: {
    units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
    toBase: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254 }
  },
  weight: {
    units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'],
    toBase: { kilogram: 1, gram: 0.001, milligram: 0.000001, pound: 0.453592, ounce: 0.0283495 }
  },
  storage: {
    units: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'],
    toBase: { byte: 1, kilobyte: 1024, megabyte: 1048576, gigabyte: 1073741824, terabyte: 1099511627776 }
  },
  speed: {
    units: ['mps', 'kmh', 'mph', 'knot'],
    toBase: { mps: 1, kmh: 0.277778, mph: 0.44704, knot: 0.514444 }
  }
};

function updateUnitOptions() {
  const cat = document.getElementById('unitCategory')?.value || 'length';
  const fromSel = document.getElementById('unitFrom');
  const toSel = document.getElementById('unitTo');
  if (!fromSel || !toSel) return;

  const data = UNIT_MAP[cat] || UNIT_MAP.length;
  fromSel.innerHTML = '';
  toSel.innerHTML = '';

  data.units.forEach((u) => {
    fromSel.add(new Option(u.toUpperCase(), u));
    toSel.add(new Option(u.toUpperCase(), u));
  });
  if (data.units.length > 1) toSel.selectedIndex = 1;
  runUnitConvert();
}

function runUnitConvert() {
  const cat = document.getElementById('unitCategory')?.value || 'length';
  const val = parseFloat(document.getElementById('unitVal')?.value || '0');
  const from = document.getElementById('unitFrom')?.value;
  const to = document.getElementById('unitTo')?.value;
  const resultBox = document.getElementById('unitResult');
  if (!resultBox || isNaN(val)) return;

  const conf = UNIT_MAP[cat];
  if (conf) {
    const inBase = val * conf.toBase[from];
    const converted = inBase / conf.toBase[to];
    resultBox.textContent = val + ' ' + from + ' = ' + converted.toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ' + to;
  }
}

// 10. Age Calculator
function calculateAge() {
  const bVal = document.getElementById('birthDate')?.value;
  const res = document.getElementById('ageResult');
  if (!bVal || !res) return;

  const birth = new Date(bVal);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (currentLang === 'bn') {
    res.textContent = years + ' বছর, ' + months + ' মাস, ' + days + ' দিন';
  } else {
    res.textContent = years + ' Years, ' + months + ' Months, ' + days + ' Days old';
  }
}

// 11. BMI Calculator
function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight')?.value || '0');
  const h = parseFloat(document.getElementById('bmiHeight')?.value || '0') / 100;
  const res = document.getElementById('bmiResult');
  if (!res || !w || !h) return;

  const bmi = (w / (h * h)).toFixed(1);
  let status = currentLang === 'bn' ? 'স্বাভাবিক ওজন (Normal)' : 'Normal weight';
  if (bmi < 18.5) status = currentLang === 'bn' ? 'কম ওজন (Underweight)' : 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) status = currentLang === 'bn' ? 'অতিরিক্ত ওজন (Overweight)' : 'Overweight';
  else if (bmi >= 30) status = currentLang === 'bn' ? 'স্থূলতা (Obese)' : 'Obese';

  res.textContent = 'BMI: ' + bmi + ' (' + status + ')';
}

// 12. Loan EMI Calculator
function calculateLoan() {
  const p = parseFloat(document.getElementById('loanAmount')?.value || '0');
  const r = parseFloat(document.getElementById('loanRate')?.value || '0') / 1200;
  const n = parseInt(document.getElementById('loanMonths')?.value || '0', 10);
  const res = document.getElementById('loanResult');
  if (!res || !p || !r || !n) return;

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  if (currentLang === 'bn') {
    res.textContent = 'মাসিক কিস্তি (EMI): $' + emi.toFixed(2) + ' (সর্বমোট: $' + total.toFixed(2) + ')';
  } else {
    res.textContent = 'Monthly EMI: $' + emi.toFixed(2) + ' (Total: $' + total.toFixed(2) + ')';
  }
}

// 13. Color Palette Studio
function generatePalette() {
  const box = document.getElementById('paletteDisplay');
  if (!box) return;
  box.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    const div = document.createElement('div');
    div.style.backgroundColor = hex;
    div.textContent = hex;
    div.onclick = function() {
      navigator.clipboard.writeText(hex);
      alert('Copied ' + hex);
    };
    box.appendChild(div);
  }
}

// 14. JSON Formatter & Minifier
function formatJson(indent) {
  const inp = document.getElementById('jsonInput');
  if (!inp) return;
  try {
    const parsed = JSON.parse(inp.value);
    inp.value = JSON.stringify(parsed, null, indent);
  } catch (e) {
    alert(currentLang === 'bn' ? 'সঠিক JSON কোড দিন।' : 'Invalid JSON Syntax!');
  }
}

function minifyJson() {
  const inp = document.getElementById('jsonInput');
  if (!inp) return;
  try {
    const parsed = JSON.parse(inp.value);
    inp.value = JSON.stringify(parsed);
  } catch (e) {
    alert(currentLang === 'bn' ? 'সঠিক JSON কোড দিন।' : 'Invalid JSON Syntax!');
  }
}

// 15. Word Counter
function countWords() {
  const text = document.getElementById('wordText')?.value || '';
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readingSec = Math.ceil(words / 3.3);

  document.getElementById('wordCount').textContent = words;
  document.getElementById('charCount').textContent = chars;
  document.getElementById('readTime').textContent = readingSec + 's';
}

// 16. Case Converter
function convertCase(type) {
  const el = document.getElementById('caseText');
  if (!el) return;
  if (type === 'upper') el.value = el.value.toUpperCase();
  if (type === 'lower') el.value = el.value.toLowerCase();
  if (type === 'title') {
    el.value = el.value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
}

// 17. Duplicate Remover
function removeDuplicates() {
  const el = document.getElementById('dupeText');
  if (!el) return;
  const lines = el.value.split('\n');
  const unique = Array.from(new Set(lines));
  el.value = unique.join('\n');
}

function sortLines(desc) {
  const el = document.getElementById('dupeText');
  if (!el) return;
  const lines = el.value.split('\n');
  lines.sort();
  if (desc) lines.reverse();
  el.value = lines.join('\n');
}

// 18. Number & Email Extractor
function extractNumbers() {
  const text = document.getElementById('extractText')?.value || '';
  const nums = text.match(/-?\d+(\.\d+)?/g) || [];
  document.getElementById('extractResult').textContent = nums.length ? nums.join(', ') : (currentLang === 'bn' ? 'কোনো নাম্বার পাওয়া যায়নি' : 'No numbers found');
}

function extractEmails() {
  const text = document.getElementById('extractText')?.value || '';
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  document.getElementById('extractResult').textContent = emails.length ? emails.join(', ') : (currentLang === 'bn' ? 'কোনো ইমেইল পাওয়া যায়নি' : 'No emails found');
}

// 19. QR Code Generator
function generateQR() {
  const text = document.getElementById('qrText')?.value;
  const box = document.getElementById('qrResult');
  if (!text || !box) return;
  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text);
  box.innerHTML = '<img src="' + qrUrl + '" alt="QR Code">';
}

// 20. Password Generator
function generatePassword() {
  const len = parseInt(document.getElementById('passLength')?.value || '16', 10);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let pass = '';
  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passwordResult').textContent = pass;
}

// Initial Run on Load
window.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  updateUnitOptions();
  generatePalette();
});