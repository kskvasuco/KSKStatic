const fs = require('fs');

let css = fs.readFileSync('public/landing.css', 'utf8');

// 1. Replace desktop Section 13 (lines ~1412-1476)
const oldSection13Regex = /\/\* ==========================================================================\s*13\. How It Works \(3-Step Timeline\)[\s\S]*?\/\* ==========================================================================\s*14\. Google Play App Showcase Card/;

const newSection13 = `/* ==========================================================================
   13. How It Works (3-Step Timeline)
   ========================================================================== */
.steps-section {
    padding: 64px 0;
    background: #f8fafc;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

@media (max-width: 768px) {
    .steps-grid {
        grid-template-columns: 1fr;
        gap: 14px;
    }
}

.step-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 24px 22px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s;
}

.step-card:hover {
    transform: translateY(-4px);
    border-color: #38bdf8;
    box-shadow: 0 12px 30px rgba(2, 132, 199, 0.1);
}

.step-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}

.step-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 11px;
    background: #e0f2fe;
    color: #0284c7;
    border: 1px solid #bae6fd;
    border-radius: 9999px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    transition: all 0.2s ease;
}

.step-card:hover .step-badge {
    background: #0284c7;
    color: #ffffff;
    border-color: #0284c7;
}

.step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f0f9ff;
    color: #0284c7;
    border: 1px solid #bae6fd;
    transition: transform 0.2s ease, background 0.2s ease;
}

.step-card:hover .step-icon {
    transform: scale(1.08);
    background: #e0f2fe;
}

.step-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 0;
    margin-bottom: 8px;
    line-height: 1.3;
}

.step-desc {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin-bottom: 0;
}

/* ==========================================================================
   14. Google Play App Showcase Card`;

if (oldSection13Regex.test(css)) {
    css = css.replace(oldSection13Regex, newSection13);
    console.log('Successfully replaced Section 13 in landing.css');
} else {
    console.error('Could not find Section 13 in landing.css');
}

// 2. Replace lines 2448-2515 (HOW IT WORKS and APP SHOWCASE overrides)
const oldThemeRegex = /\/\* HOW IT WORKS: Steel blue tint \*\/[\s\S]*?\/\* ABOUT US: Warm terracotta-amber \*\//;

const newTheme = `/* HOW IT WORKS: Clean modern card layout (no overlay) */
.steps-section {
    background: #eff6ff !important;
    border-top: 1px solid #bae6fd !important;
    border-bottom: 1px solid #bae6fd !important;
}
.step-card {
    background: #ffffff !important;
    border: 1px solid #bae6fd !important;
    border-radius: 16px !important;
    padding: 24px 22px !important;
    box-shadow: 0 2px 6px rgba(2, 132, 199, 0.05) !important;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s !important;
}
.step-card:hover {
    transform: translateY(-4px) !important;
    border-color: #38bdf8 !important;
    box-shadow: 0 12px 32px rgba(2, 132, 199, 0.12) !important;
}
.step-card-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 14px !important;
}
.step-badge {
    display: inline-flex !important;
    align-items: center !important;
    padding: 4px 11px !important;
    background: #e0f2fe !important;
    color: #0284c7 !important;
    border: 1px solid #bae6fd !important;
    border-radius: 9999px !important;
    font-size: 0.76rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.03em !important;
    text-transform: uppercase !important;
}
.step-card:hover .step-badge {
    background: #0284c7 !important;
    color: #ffffff !important;
    border-color: #0284c7 !important;
}
.step-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 36px !important;
    height: 36px !important;
    border-radius: 10px !important;
    background: #f0f9ff !important;
    color: #0284c7 !important;
    border: 1px solid #bae6fd !important;
    transition: transform 0.2s ease !important;
}
.step-card:hover .step-icon {
    transform: scale(1.08) !important;
    background: #e0f2fe !important;
}

/* APP SHOWCASE: Dark navy-ocean band (clean compact layout) */
.app-showcase-section {
    background: linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%) !important;
    border-top: none !important;
}
.app-card-wrapper {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: var(--radius-xl) !important;
    padding: 34px 34px !important;
}
.app-title { 
    color: #f1f5f9 !important; 
    margin-bottom: 10px !important;
}
.app-description { 
    color: #94a3b8 !important; 
    margin-bottom: 16px !important;
}
.app-chips-row {
    margin-bottom: 20px !important;
    gap: 8px !important;
}
.app-chip {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #bae6fd !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
    padding: 6px 11px !important;
    font-size: 0.8rem !important;
}
.app-badge-pill {
    background: rgba(34, 197, 94, 0.15) !important;
    color: #4ade80 !important;
    border-color: rgba(34, 197, 94, 0.25) !important;
    margin-bottom: 10px !important;
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
    padding: 6px 12px !important;
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
    cursor: pointer !important;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    flex-shrink: 0 !important;
}
.app-qr-box:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
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

if (oldThemeRegex.test(css)) {
    css = css.replace(oldThemeRegex, newTheme);
    console.log('Successfully replaced theme section in landing.css');
} else {
    console.error('Could not find theme section in landing.css');
}

// 3. Mobile overrides in @media (max-width: 768px)
const mobileAdditions = `
    /* Steps cards mobile refinement (clean, no overlay) */
    .steps-grid {
        gap: 12px !important;
    }
    .step-card {
        padding: 18px 16px !important;
        border-radius: 14px !important;
    }
    .step-card-header {
        margin-bottom: 10px !important;
    }
    .step-badge {
        font-size: 0.72rem !important;
        padding: 3px 9px !important;
    }
    .step-icon {
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px !important;
    }
    .step-title {
        font-size: 1.05rem !important;
        margin-bottom: 6px !important;
    }
    .step-desc {
        font-size: 0.84rem !important;
        line-height: 1.5 !important;
    }

    /* App Showcase mobile single-line CTA layout */
    .app-card-wrapper {
        padding: 20px 15px !important;
        gap: 16px !important;
    }
    .app-badge-pill {
        margin-bottom: 8px !important;
        font-size: 0.72rem !important;
        padding: 3px 9px !important;
    }
    .app-title {
        font-size: 1.5rem !important;
        line-height: 1.2 !important;
        margin-bottom: 6px !important;
    }
    .app-description {
        font-size: 0.85rem !important;
        line-height: 1.45 !important;
        margin-bottom: 10px !important;
    }
    .app-chips-row {
        gap: 5px !important;
        margin-bottom: 14px !important;
    }
    .app-chip {
        padding: 4px 8px !important;
        font-size: 0.72rem !important;
    }
    .app-cta-row {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        flex-wrap: nowrap !important;
    }
    .google-play-btn {
        flex: 1 1 auto !important;
        min-width: 0 !important;
        padding: 8px 10px !important;
        gap: 7px !important;
        border-radius: 10px !important;
    }
    .google-play-btn-icon {
        width: 22px !important;
        height: 22px !important;
    }
    .play-subtitle {
        font-size: 0.55rem !important;
    }
    .play-title {
        font-size: 0.86rem !important;
    }
    .play-btn-arrow {
        display: none !important;
    }
    .app-qr-box {
        flex: 0 0 auto !important;
        padding: 6px 8px !important;
        gap: 6px !important;
        border-radius: 10px !important;
    }
    .qr-code-img {
        width: 32px !important;
        height: 32px !important;
    }
    .qr-heading {
        font-size: 0.7rem !important;
    }
    .qr-hint {
        font-size: 0.58rem !important;
    }
`;

// Insert into @media (max-width: 768px) before closing bracket of that query or at end of file
const modalCss = `
/* ==========================================================================
   QR Code Lightbox Modal ("Big Pop")
   ========================================================================== */
.qr-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    padding: 16px;
    box-sizing: border-box;
}

.qr-modal.active {
    opacity: 1;
    pointer-events: auto;
}

.qr-modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.78);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.qr-modal-card {
    position: relative;
    background: #ffffff;
    border-radius: 20px;
    padding: 28px 24px 22px;
    max-width: 360px;
    width: 100%;
    text-align: center;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: scale(0.88) translateY(12px);
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
}

.qr-modal.active .qr-modal-card {
    transform: scale(1) translateY(0);
}

.qr-modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.qr-modal-close:hover {
    background: #e2e8f0;
    color: #0f172a;
    transform: rotate(90deg);
}

.qr-modal-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #15803d;
    margin-bottom: 10px;
}

.qr-modal-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 6px;
    line-height: 1.25;
}

.qr-modal-desc {
    font-size: 0.82rem;
    color: #64748b;
    margin: 0 0 16px;
    line-height: 1.45;
}

.qr-modal-image-wrapper {
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    padding: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

.qr-modal-img {
    width: 190px;
    height: 190px;
    object-fit: contain;
    display: block;
    image-rendering: pixelated;
    border-radius: 8px;
}

.qr-modal-link-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 18px;
    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
    transition: all 0.2s ease;
}

.qr-modal-link-btn:hover {
    background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
    box-shadow: 0 6px 18px rgba(2, 132, 199, 0.45);
    color: #ffffff;
    transform: translateY(-1px);
}
`;

// Append mobile overrides and modal styles to css
css = css + '\n\n@media (max-width: 768px) {\n' + mobileAdditions + '\n}\n' + modalCss;

fs.writeFileSync('public/landing.css', css, 'utf8');
console.log('Successfully updated landing.css');

