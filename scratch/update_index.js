const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Version bump to 6.4
html = html.replace('landing.css?v=6.3', 'landing.css?v=6.4');
html = html.replace('landing.js?v=6.3', 'landing.js?v=6.4');

// 2. Replace steps-grid contents
const oldStepsRegex = /<div class="steps-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const newStepsContent = `<div class="steps-grid">
                <div class="step-card">
                    <div class="step-card-header">
                        <span class="step-badge">Step 01</span>
                        <div class="step-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                        </div>
                    </div>
                    <h3 class="step-title">Select Materials or Service</h3>
                    <p class="step-desc">Browse our catalog and choose your required chamber bricks, certified Dalmia cement, washed sand, or modern JCB equipment.</p>
                </div>

                <div class="step-card">
                    <div class="step-card-header">
                        <span class="step-badge">Step 02</span>
                        <div class="step-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                    </div>
                    <h3 class="step-title">Instant Transparent Quote</h3>
                    <p class="step-desc">Receive honest, factory-direct pricing with zero hidden delivery charges via phone, WhatsApp, or our mobile app.</p>
                </div>

                <div class="step-card">
                    <div class="step-card-header">
                        <span class="step-badge">Step 03</span>
                        <div class="step-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        </div>
                    </div>
                    <h3 class="step-title">Fast Site Delivery & Unload</h3>
                    <p class="step-desc">Our drivers arrive at your construction site on schedule, verify quantity, and safely unload materials where needed.</p>
                </div>
            </div>
        </div>
    </section>`;

if (oldStepsRegex.test(html)) {
    html = html.replace(oldStepsRegex, newStepsContent);
    console.log('Successfully updated steps-grid in index.html');
} else {
    console.error('Could not find steps-grid in index.html');
}

// 3. Replace app-cta-row
const oldAppCtaRegex = /<div class="app-cta-row">[\s\S]*?<\/div>\s*<\/div>\s*<div class="app-card-visual">/;

const newAppCtaContent = `<div class="app-cta-row">
                        <a href="https://play.google.com/store/apps/details?id=com.nuvaminfotech.kskvasushop" target="_blank" rel="noopener" class="google-play-btn" id="google-play-cta" aria-label="Get KSK VASU App on Google Play">
                            <svg class="google-play-btn-icon" viewBox="0 0 512 512" width="24" height="24" aria-hidden="true">
                                <path fill="#00C3FF" d="M32.5 17.5c-4 4.3-6.5 10.7-6.5 18.5v439.9c0 7.8 2.5 14.2 6.5 18.5l237.4-238.4L32.5 17.5z"/>
                                <path fill="#00E676" d="M348.5 348.5l-78.6-78.6-237.4 238.4c4.6 4.9 12 7.7 20.9 7.7 5.7 0 11.5-1.2 17.1-3.7l278-163.8z"/>
                                <path fill="#FFD400" d="M479.5 237.7l-78.8-46.4-52.2 52.2 52.2 52.2 79-46.6c11.7-6.9 18.3-17.7 18.3-30.7s-6.6-23.8-18.5-30.7z"/>
                                <path fill="#FF334B" d="M70.5 8.2C64.9 5.7 59.1 4.5 53.4 4.5c-8.9 0-16.3 2.8-20.9 7.7l237.4 238.4 78.6-78.6-278-163.8z"/>
                            </svg>
                            <div class="play-btn-text">
                                <span class="play-subtitle">GET IT ON</span>
                                <span class="play-title">Google Play</span>
                            </div>
                            <svg class="play-btn-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>

                        <div class="app-qr-box" id="qr-trigger" role="button" tabindex="0" title="Click to enlarge QR code" aria-label="Enlarge QR Code to scan app">
                            <img src="images/qr_playstore.png" alt="Scan QR Code" class="qr-code-img" width="38" height="38" loading="lazy">
                            <div class="qr-text-col">
                                <span class="qr-heading">Scan QR</span>
                                <span class="qr-hint">Enlarge ⤢</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="app-card-visual">`;

if (oldAppCtaRegex.test(html)) {
    html = html.replace(oldAppCtaRegex, newAppCtaContent);
    console.log('Successfully updated app-cta-row in index.html');
} else {
    console.error('Could not find app-cta-row in index.html');
}

// 4. Add QR Modal before Scripts / </body>
if (!html.includes('id="qr-modal"')) {
    const modalMarkup = `
    <!-- QR Code Lightbox Modal ("Big Pop") -->
    <div id="qr-modal" class="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title">
        <div class="qr-modal-backdrop"></div>
        <div class="qr-modal-card">
            <button type="button" class="qr-modal-close" id="qr-modal-close" aria-label="Close QR Modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="qr-modal-header">
                <div class="qr-modal-badge">
                    <svg viewBox="0 0 512 512" width="13" height="13" aria-hidden="true">
                        <path fill="#00C3FF" d="M32.5 17.5c-4 4.3-6.5 10.7-6.5 18.5v439.9c0 7.8 2.5 14.2 6.5 18.5l237.4-238.4L32.5 17.5z"/>
                        <path fill="#00E676" d="M348.5 348.5l-78.6-78.6-237.4 238.4c4.6 4.9 12 7.7 20.9 7.7 5.7 0 11.5-1.2 17.1-3.7l278-163.8z"/>
                        <path fill="#FFD400" d="M479.5 237.7l-78.8-46.4-52.2 52.2 52.2 52.2 79-46.6c11.7-6.9 18.3-17.7 18.3-30.7s-6.6-23.8-18.5-30.7z"/>
                        <path fill="#FF334B" d="M70.5 8.2C64.9 5.7 59.1 4.5 53.4 4.5c-8.9 0-16.3 2.8-20.9 7.7l237.4 238.4 78.6-78.6-278-163.8z"/>
                    </svg>
                    <span>Google Play Store</span>
                </div>
                <h3 id="qr-modal-title" class="qr-modal-title">Scan to Install KSK VASU App</h3>
                <p class="qr-modal-desc">Point your smartphone camera or Google Lens to download directly from Google Play.</p>
            </div>
            <div class="qr-modal-body">
                <div class="qr-modal-image-wrapper">
                    <img src="images/qr_playstore.png" alt="Scan QR Code to Download KSK VASU App" class="qr-modal-img" width="220" height="220">
                </div>
            </div>
            <div class="qr-modal-footer">
                <a href="https://play.google.com/store/apps/details?id=com.nuvaminfotech.kskvasushop" target="_blank" rel="noopener" class="qr-modal-link-btn">
                    <span>Open in Google Play</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
            </div>
        </div>
    </div>
`;
    html = html.replace('<!-- Scripts -->', modalMarkup + '\n    <!-- Scripts -->');
    console.log('Successfully inserted qr-modal into index.html');
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Done writing public/index.html');

