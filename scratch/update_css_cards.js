const fs = require('fs');

let css = fs.readFileSync('public/landing.css', 'utf8');

// 1. Desktop Service Card Header
const oldServiceIconRegex = /\.service-icon-box\s*\{[\s\S]*?\.service-desc\s*\{/;

const newServiceIconBlock = `.service-card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 14px;
}

.service-icon-box {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: var(--radius-md);
    background: var(--primary-50);
    border: 1px solid var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    flex-shrink: 0;
    transition: var(--transition);
    margin-bottom: 0;
}

.service-card.highlight .service-icon-box {
    background: var(--secondary-light);
    border-color: #fde68a;
    color: var(--secondary);
}

.service-card:hover .service-icon-box {
    transform: scale(1.08);
}

.service-heading-text {
    flex: 1;
    min-width: 0;
}

.service-title {
    font-size: 1.22rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 3px 0;
    line-height: 1.28;
}

.service-tamil-name {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--secondary-hover);
    margin: 0;
    line-height: 1.3;
}

.service-desc {`;

if (oldServiceIconRegex.test(css)) {
    css = css.replace(oldServiceIconRegex, newServiceIconBlock);
    console.log('Successfully replaced desktop service icon block');
} else {
    console.error('Could not find desktop service icon block');
}

// 2. Desktop Why Us Card Header
const oldWhyIconRegex = /\.why-icon\s*\{[\s\S]*?\.why-desc\s*\{/;

const newWhyIconBlock = `.why-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.why-icon {
    width: 42px;
    height: 42px;
    min-width: 42px;
    border-radius: var(--radius-md);
    background: var(--primary-100);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    flex-shrink: 0;
    transition: var(--transition);
}

.why-card:hover .why-icon {
    transform: scale(1.08);
}

.why-card.amber .why-icon {
    background: var(--secondary-light);
    color: var(--secondary);
}

.why-card.green .why-icon {
    background: var(--success-light);
    color: var(--success);
}

.why-title {
    font-size: 1.12rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.25;
}

.why-desc {`;

if (oldWhyIconRegex.test(css)) {
    css = css.replace(oldWhyIconRegex, newWhyIconBlock);
    console.log('Successfully replaced desktop why-icon block');
} else {
    console.error('Could not find desktop why-icon block');
}

// 3. Mobile rules for Services, Products, Why Us
const oldMobileServicesRegex = /\/\* SERVICES SECTION - Short & clean context on mobile \*\/[\s\S]*?\/\* PRODUCTS SECTION - Short & clean context on mobile \*\//;

const newMobileServicesBlock = `/* SERVICES SECTION - Short & clean context on mobile */
    .services-grid {
        grid-template-columns: 1fr !important;
        gap: 10px !important;
    }

    .service-card {
        padding: 14px 14px !important;
        border-radius: var(--radius-md) !important;
        display: flex !important;
        flex-direction: column !important;
    }

    .service-card-header {
        display: flex !important;
        align-items: center !important;
        gap: 11px !important;
        margin-bottom: 8px !important;
    }

    .service-icon-box {
        width: 38px !important;
        height: 38px !important;
        min-width: 38px !important;
        margin-bottom: 0 !important;
        border-radius: 8px !important;
        flex-shrink: 0 !important;
    }

    .service-icon-box svg {
        width: 20px !important;
        height: 20px !important;
    }

    .service-heading-text {
        flex: 1 !important;
        min-width: 0 !important;
    }

    .service-title {
        font-size: 1.05rem !important;
        margin-bottom: 1px !important;
        line-height: 1.22 !important;
    }

    .service-tamil-name {
        font-size: 0.76rem !important;
        margin-bottom: 0 !important;
        line-height: 1.2 !important;
    }

    .service-desc {
        font-size: 0.82rem !important;
        line-height: 1.42 !important;
        margin-bottom: 8px !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        flex: none !important;
    }

    .service-feature-list {
        margin-bottom: 8px !important;
        gap: 4px !important;
    }

    .service-feature-item {
        font-size: 0.75rem !important;
        gap: 5px !important;
    }

    .service-footer {
        margin-top: 2px !important;
        padding-top: 6px !important;
    }

    .service-link {
        font-size: 0.8rem !important;
    }

    /* PRODUCTS SECTION - Short & clean context on mobile */`;

if (oldMobileServicesRegex.test(css)) {
    css = css.replace(oldMobileServicesRegex, newMobileServicesBlock);
    console.log('Successfully replaced mobile services block');
} else {
    console.error('Could not find mobile services block');
}

// 4. Mobile Why-Us rules
const whyUsMobileAddition = `
    /* WHY US SECTION - Inline icon at heading on mobile */
    .why-grid {
        grid-template-columns: 1fr !important;
        gap: 10px !important;
    }

    .why-card {
        padding: 14px 14px !important;
        border-radius: var(--radius-md) !important;
    }

    .why-card-header {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        margin-bottom: 6px !important;
    }

    .why-icon {
        width: 34px !important;
        height: 34px !important;
        min-width: 34px !important;
        border-radius: 8px !important;
        margin-bottom: 0 !important;
        flex-shrink: 0 !important;
    }

    .why-icon svg {
        width: 18px !important;
        height: 18px !important;
    }

    .why-title {
        font-size: 0.98rem !important;
        margin: 0 !important;
        line-height: 1.22 !important;
    }

    .why-desc {
        font-size: 0.82rem !important;
        line-height: 1.42 !important;
    }
`;

// Also improve product image height & mobile touch buttons
css = css.replace('.product-img-wrap {\n        height: 125px !important;\n    }', '.product-img-wrap {\n        height: 145px !important;\n    }');

// Add whyUsMobileAddition to mobile query
css = css + '\n\n@media (max-width: 768px) {\n' + whyUsMobileAddition + '\n}\n';

fs.writeFileSync('public/landing.css', css, 'utf8');
console.log('Successfully updated public/landing.css');

