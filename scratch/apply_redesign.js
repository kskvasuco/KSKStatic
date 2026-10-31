const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Version bump to 6.5
html = html.replace(/landing\.css\?v=[0-9.]+/g, 'landing.css?v=6.5');
html = html.replace(/landing\.js\?v=[0-9.]+/g, 'landing.js?v=6.5');

// 2. Redesign Service cards: wrap icon and heading in .service-card-header
const serviceCardRegex = /<div class="service-icon-box">([\s\S]*?)<\/div>\s*<h3 class="service-title">([\s\S]*?)<\/h3>\s*<div class="service-tamil-name">([\s\S]*?)<\/div>/g;

html = html.replace(serviceCardRegex, (match, icon, title, tamil) => {
    return `<div class="service-card-header">
                        <div class="service-icon-box">${icon}</div>
                        <div class="service-heading-text">
                            <h3 class="service-title">${title.trim()}</h3>
                            <div class="service-tamil-name">${tamil.trim()}</div>
                        </div>
                    </div>`;
});

// 3. Redesign Why Us cards: wrap icon and heading in .why-card-header
const whyCardRegex = /<div class="why-icon">([\s\S]*?)<\/div>\s*<h3 class="why-title">([\s\S]*?)<\/h3>/g;

html = html.replace(whyCardRegex, (match, icon, title) => {
    return `<div class="why-card-header">
                        <div class="why-icon">${icon}</div>
                        <h3 class="why-title">${title.trim()}</h3>
                    </div>`;
});

// 4. Remove tag at top left corner of each product (product-badge-overlay)
const productBadgeRegex = /\s*<div class="product-badge-overlay">[\s\S]*?<\/div>/g;
html = html.replace(productBadgeRegex, '');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully updated public/index.html');

