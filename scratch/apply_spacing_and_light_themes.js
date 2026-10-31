const fs = require('fs');

// 1. Update index.html version to 6.7
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace(/landing\.css\?v=[0-9.]+/g, 'landing.css?v=6.7');
html = html.replace(/landing\.js\?v=[0-9.]+/g, 'landing.js?v=6.7');
fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Updated index.html to v=6.7');

// 2. Update landing.css
let css = fs.readFileSync('public/landing.css', 'utf8');

// Replace dark App Showcase section styles (around line 2580)
const darkAppShowcaseRegex = /\/\* APP SHOWCASE: Dark navy-ocean band[\s\S]*?\/\* ABOUT US: Warm terracotta-amber \*\//;

const lightAppShowcaseBlock = `/* APP SHOWCASE: Clean Light-Themed Pattern (Industrial Standards) */
.app-showcase-section {
    background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #eff6ff 100%) !important;
    border-top: 1px solid #e2e8f0 !important;
    border-bottom: 1px solid #e2e8f0 !important;
    padding: 68px 0 !important;
}
.app-card-wrapper {
    background: #ffffff !important;
    border: 1px solid #bae6fd !important;
    border-radius: var(--radius-xl) !important;
    padding: 38px 40px !important;
    box-shadow: 0 10px 30px rgba(2, 132, 199, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}
.app-title { 
    color: #0f172a !important; 
    margin-bottom: 10px !important;
    font-weight: 800 !important;
}
.app-description { 
    color: #475569 !important; 
    margin-bottom: 18px !important;
    line-height: 1.55 !important;
}
.app-chips-row {
    margin-bottom: 22px !important;
    gap: 8px !important;
}
.app-chip {
    background: #f8fafc !important;
    color: #0284c7 !important;
    border: 1px solid #e2e8f0 !important;
    padding: 6px 12px !important;
    font-size: 0.8rem !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
}
.app-badge-pill {
    background: #dcfce7 !important;
    color: #15803d !important;
    border: 1px solid #86efac !important;
    margin-bottom: 12px !important;
}

/* Same line layout for CTA button & QR Box */
.app-cta-row {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 12px !important;
    flex-wrap: nowrap !important;
    margin-top: 0 !important;
}

/* Attractive Google Play Button */
.google-play-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 9px 18px !important;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #15803d 100%) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 16px rgba(34, 197, 94, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
    text-decoration: none !important;
    cursor: pointer !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    flex-shrink: 0 !important;
}
.google-play-btn:hover {
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%) !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
    color: #ffffff !important;
}
.google-play-btn:active {
    transform: scale(0.97) !important;
}
.google-play-btn-icon {
    width: 24px !important;
    height: 24px !important;
    flex-shrink: 0 !important;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25)) !important;
}
.play-btn-text {
    display: flex !important;
    flex-direction: column !important;
}
.play-subtitle {
    font-size: 0.62rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.6px !important;
    color: rgba(255, 255, 255, 0.85) !important;
    line-height: 1 !important;
    margin-bottom: 2px !important;
}
.play-title {
    font-size: 0.98rem !important;
    font-weight: 800 !important;
    line-height: 1.1 !important;
    color: #ffffff !important;
}
.play-btn-arrow {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: transform 0.2s ease, color 0.2s ease !important;
    margin-left: 2px !important;
}
.google-play-btn:hover .play-btn-arrow {
    color: #ffffff !important;
    transform: translateX(2px) !important;
}

/* Interactive QR Box */
.app-qr-box {
    display: inline-flex !important;
    align-items: center !important;
    gap: 9px !important;
    background: #ffffff !important;
    padding: 7px 13px !important;
    border-radius: 12px !important;
    border: 1px solid #cbd5e1 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
    cursor: pointer !important;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    flex-shrink: 0 !important;
}
.app-qr-box:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12) !important;
    border-color: #38bdf8 !important;
    background: #f8fafc !important;
}
.app-qr-box:active {
    transform: scale(0.97) !important;
}
.qr-code-img {
    width: 38px !important;
    height: 38px !important;
    object-fit: contain !important;
    border-radius: 5px !important;
    image-rendering: pixelated !important;
    display: block !important;
}
.qr-text-col {
    display: flex !important;
    flex-direction: column !important;
}
.qr-heading {
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    line-height: 1.15 !important;
}
.qr-hint {
    font-size: 0.65rem !important;
    font-weight: 600 !important;
    color: #0284c7 !important;
    line-height: 1.15 !important;
    margin-top: 2px !important;
}

/* ABOUT US: Warm terracotta-amber */`;

if (darkAppShowcaseRegex.test(css)) {
    css = css.replace(darkAppShowcaseRegex, lightAppShowcaseBlock);
    console.log('Successfully replaced App Showcase with light-themed styles');
} else {
    console.error('Could not find App Showcase section in landing.css');
}

// Replace CTA banner & Footer dark styles (around line 2828)
const ctaBannerFooterRegex = /\/\* CTA BANNER: Full-bleed brand blue gradient[\s\S]*?\/\* SECTION TAG POLISH \*\//;

const lightCtaBannerFooterBlock = `/* CTA BANNER: Clean Light-Themed Pattern */
.cta-banner-section {
    background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 50%, #fffdf0 100%) !important;
    border-top: 1px solid #bae6fd !important;
    border-bottom: 1px solid #bae6fd !important;
    padding: 60px 0 !important;
}
.cta-banner-box {
    background: #ffffff !important;
    border: 1.5px solid #bae6fd !important;
    border-radius: var(--radius-xl) !important;
    padding: 38px 42px !important;
    box-shadow: 0 12px 36px rgba(2, 132, 199, 0.08) !important;
}
.cta-banner-text h2 { 
    color: #0f172a !important; 
    font-weight: 800 !important;
}
.cta-banner-text p  { 
    color: #475569 !important; 
}
.btn-white {
    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%) !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45) !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
}
.btn-white:hover {
    background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
    color: #ffffff !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 28px rgba(234, 88, 12, 0.65) !important;
}
.btn-outline-white {
    background: #ffffff !important;
    color: #0f172a !important;
    border: 1.5px solid #cbd5e1 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}
.btn-outline-white:hover {
    background: #f8fafc !important;
    border-color: #94a3b8 !important;
    color: #0f172a !important;
    transform: translateY(-2px) !important;
}

/* FOOTER: Clean Modern Light-Themed Pattern */
footer {
    background: #ffffff !important;
    color: #475569 !important;
    border-top: 1px solid #e2e8f0 !important;
}
.footer-top { 
    border-bottom: 1px solid #f1f5f9 !important; 
}
.footer-brand h3  { 
    color: #0f172a !important; 
    font-weight: 800 !important;
}
.footer-brand p   { 
    color: #64748b !important; 
}
.footer-col h4    { 
    color: #0f172a !important; 
    font-weight: 700 !important; 
    letter-spacing: 0.5px !important; 
}
.footer-links a   { 
    color: #64748b !important; 
}
.footer-links a:hover { 
    color: #0284c7 !important; 
    padding-left: 4px !important; 
}
.footer-bottom    { 
    color: #94a3b8 !important; 
    border-top: 1px solid #f1f5f9 !important; 
}
.footer-bottom a  { 
    color: #0284c7 !important; 
}

/* SECTION TAG POLISH */`;

if (ctaBannerFooterRegex.test(css)) {
    css = css.replace(ctaBannerFooterRegex, lightCtaBannerFooterBlock);
    console.log('Successfully replaced CTA banner and footer with light-themed styles');
} else {
    console.error('Could not find CTA banner and footer in landing.css');
}

// 3. Update comprehensive desktop card gaps and industrial standards
const industrialStandardRules = `
/* ==========================================================================
   INDUSTRIAL STANDARDS: PROPER CARD GAPS & SPACIOUS LIGHT ARCHITECTURE
   ========================================================================== */

/* Proper gap between cards across Services and Products */
.services-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 28px !important;
}

.products-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 28px !important;
}

.why-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 24px !important;
}

.steps-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
}

.testimonials-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
}

/* Services Card - High Industrial Standard */
.service-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 16px !important;
    padding: 26px 24px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03) !important;
    display: flex !important;
    flex-direction: column !important;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s !important;
}

.service-card:hover {
    transform: translateY(-4px) !important;
    border-color: #38bdf8 !important;
    box-shadow: 0 14px 32px -4px rgba(2, 132, 199, 0.12), 0 4px 8px -2px rgba(2, 132, 199, 0.04) !important;
}

.service-card.highlight {
    background: #ffffff !important;
    border: 1px solid #bae6fd !important;
    border-left: 4px solid var(--primary) !important;
}

.service-card-header {
    display: flex !important;
    align-items: flex-start !important;
    gap: 14px !important;
    margin-bottom: 14px !important;
}

.service-icon-box {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    border-radius: 12px !important;
    background: #eff6ff !important;
    color: var(--primary) !important;
    border: 1px solid #bae6fd !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    margin-bottom: 0 !important;
}

.service-title {
    font-size: 1.22rem !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    margin: 0 0 3px 0 !important;
    line-height: 1.28 !important;
}

.service-tamil-name {
    font-size: 0.84rem !important;
    font-weight: 600 !important;
    color: var(--secondary) !important;
    margin: 0 !important;
    line-height: 1.3 !important;
}

.service-desc {
    font-size: 0.88rem !important;
    color: #475569 !important;
    line-height: 1.55 !important;
    margin-bottom: 14px !important;
}

.service-feature-list {
    margin-bottom: 16px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
}

.service-feature-item {
    font-size: 0.825rem !important;
    color: #334155 !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
}

.service-feature-item svg {
    color: #16a34a !important;
    flex-shrink: 0 !important;
}

.service-footer {
    margin-top: auto !important;
    padding-top: 14px !important;
    border-top: 1px solid #f1f5f9 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

/* Product Card - High Industrial Standard */
.product-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03) !important;
    display: flex !important;
    flex-direction: column !important;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s !important;
}

.product-card:hover {
    transform: translateY(-4px) !important;
    border-color: #cbd5e1 !important;
    box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.1) !important;
}

.product-img-wrap {
    height: 205px !important;
    overflow: hidden !important;
    position: relative !important;
    background: #f1f5f9 !important;
}

.product-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    transition: transform 0.4s ease !important;
}

.product-card:hover .product-img {
    transform: scale(1.04) !important;
}

.product-status-overlay {
    position: absolute !important;
    bottom: 12px !important;
    right: 12px !important;
    background: #10b981 !important;
    color: #ffffff !important;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    padding: 3px 10px !important;
    border-radius: 9999px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.product-info {
    padding: 20px 20px 22px !important;
    display: flex !important;
    flex-direction: column !important;
    flex: 1 !important;
}

.product-category {
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    color: #0284c7 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    margin-bottom: 4px !important;
    display: block !important;
}

.product-name {
    font-size: 1.22rem !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    margin-bottom: 3px !important;
    line-height: 1.25 !important;
}

.product-tamil-name {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: #b45309 !important;
    margin-bottom: 8px !important;
}

.product-desc {
    font-size: 0.88rem !important;
    line-height: 1.5 !important;
    color: #475569 !important;
    margin-bottom: 12px !important;
}

.product-specs-list {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    margin-bottom: 16px !important;
}

.spec-chip {
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    color: #475569 !important;
    padding: 4px 10px !important;
    font-size: 0.74rem !important;
    font-weight: 600 !important;
    border-radius: 6px !important;
}

.product-actions {
    display: flex !important;
    gap: 10px !important;
    align-items: center !important;
    margin-top: auto !important;
}

.product-actions .btn-primary {
    flex: 1 1 auto !important;
    padding: 11px 18px !important;
    font-size: 0.9rem !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
}

.product-actions .btn-secondary {
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: 1.5px solid #cbd5e1 !important;
    border-radius: 10px !important;
    background: #ffffff !important;
    color: #0f172a !important;
    padding: 0 !important;
}

/* Proper breathing room across sections */
.section-header {
    text-align: center !important;
    max-width: 680px !important;
    margin: 0 auto 38px auto !important;
}

.section-tag {
    display: inline-block !important;
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
    color: var(--primary) !important;
    background: #eff6ff !important;
    border: 1px solid #bae6fd !important;
    padding: 4px 12px !important;
    border-radius: 9999px !important;
    margin-bottom: 10px !important;
}

.section-title {
    font-size: 2.2rem !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    line-height: 1.2 !important;
    margin-bottom: 8px !important;
}

.section-tamil-sub {
    font-size: 0.95rem !important;
    font-weight: 600 !important;
    color: var(--secondary) !important;
    margin-bottom: 12px !important;
}

.section-subtitle {
    font-size: 0.98rem !important;
    color: #64748b !important;
    line-height: 1.6 !important;
}

/* Tablet Responsive Gaps (max-width: 992px) */
@media (max-width: 992px) {
    .services-grid, .products-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
    }
    .why-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 18px !important;
    }
}

/* Mobile Responsive Gaps & Clean Spacing (max-width: 768px) */
@media (max-width: 768px) {
    /* Section padding */
    section:not(.hero),
    .services-section,
    .products-section,
    .why-us-section,
    .steps-section,
    .app-showcase-section,
    .about-section,
    .testimonials-section,
    .faq-section,
    .contact-section {
        padding-top: 38px !important;
        padding-bottom: 38px !important;
    }

    .section-header {
        margin-bottom: 24px !important;
    }

    .section-title {
        font-size: 1.65rem !important;
        line-height: 1.24 !important;
        margin-bottom: 6px !important;
    }

    .section-tamil-sub {
        font-size: 0.85rem !important;
        margin-bottom: 8px !important;
    }

    .section-subtitle {
        font-size: 0.88rem !important;
        line-height: 1.5 !important;
    }

    /* Proper gaps between cards on mobile */
    .services-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
    }

    .products-grid {
        grid-template-columns: 1fr !important;
        gap: 18px !important;
    }

    .why-grid, .steps-grid, .testimonials-grid {
        gap: 14px !important;
    }

    .service-card {
        padding: 18px 16px !important;
        border-radius: 14px !important;
    }

    .product-card {
        border-radius: 14px !important;
    }

    .product-img-wrap {
        height: 160px !important;
    }

    .product-info {
        padding: 14px 14px 16px !important;
    }

    .product-name {
        font-size: 1.12rem !important;
    }

    .product-desc {
        font-size: 0.84rem !important;
        line-height: 1.45 !important;
    }

    /* Light App Showcase Mobile */
    .app-showcase-section {
        padding-top: 34px !important;
        padding-bottom: 34px !important;
    }

    .app-card-wrapper {
        padding: 22px 18px !important;
        border-radius: 16px !important;
    }

    .cta-banner-box {
        padding: 26px 20px !important;
        border-radius: 16px !important;
    }
}
`;

css = css + '\n' + industrialStandardRules;

fs.writeFileSync('public/landing.css', css, 'utf8');
console.log('Successfully updated landing.css with industrial standards and light themes');

