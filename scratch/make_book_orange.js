const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// Version bump to 6.6
html = html.replace(/landing\.css\?v=[0-9.]+/g, 'landing.css?v=6.6');
html = html.replace(/landing\.js\?v=[0-9.]+/g, 'landing.js?v=6.6');

// Replace hero-cta class with btn-orange
html = html.replace(
    'class="btn btn-primary" id="hero-cta"',
    'class="btn btn-orange" id="hero-cta"'
);

// Replace pre-footer cta btn-white with btn-orange
html = html.replace(
    'class="btn btn-white"',
    'class="btn btn-orange"'
);

// Add btn-orange to universal-sticky-btn
html = html.replace(
    'class="universal-sticky-btn" id="universal-sticky-btn"',
    'class="universal-sticky-btn btn-orange" id="universal-sticky-btn"'
);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully updated public/index.html');

// 2. Update landing.css
let css = fs.readFileSync('public/landing.css', 'utf8');

const orangeBtnRules = `
/* ==========================================================================
   ALL "BOOK YOUR ORDER" BUTTONS - VIBRANT HIGH-CONVERSION ORANGE
   ========================================================================== */
.btn-orange,
#hero-cta,
#universal-sticky-btn,
.universal-sticky-btn,
.hero-action-group .btn-primary,
.cta-banner-actions .btn-orange {
    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-orange:hover,
#hero-cta:hover,
#universal-sticky-btn:hover,
.universal-sticky-btn:hover,
.hero-action-group .btn-primary:hover,
.cta-banner-actions .btn-orange:hover {
    background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
    color: #ffffff !important;
    box-shadow: 0 10px 28px rgba(234, 88, 12, 0.65) !important;
    transform: translateY(-2px) !important;
}

.btn-orange:active,
#hero-cta:active,
#universal-sticky-btn:active,
.universal-sticky-btn:active,
.hero-action-group .btn-primary:active,
.cta-banner-actions .btn-orange:active {
    transform: scale(0.97) !important;
}
`;

// Append orangeBtnRules to landing.css
css = css + '\n' + orangeBtnRules;

fs.writeFileSync('public/landing.css', css, 'utf8');
console.log('Successfully updated public/landing.css');

