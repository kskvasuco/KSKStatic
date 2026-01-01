// ===== LOADING SCREEN =====
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Minimum 1.5s display for animation to complete
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelector('form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

// --- Initialize Marquee Position on Page Load ---
function initializeMarqueePosition() {
    const header = document.querySelector('.header');
    const marqueeContainer = document.querySelector('.marquee-container');

    if (header && marqueeContainer) {
        const headerHeight = header.offsetHeight;
        marqueeContainer.style.position = 'fixed';
        marqueeContainer.style.top = headerHeight + 'px';
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', initializeMarqueePosition);
// Also run after images/fonts load to recalculate if header height changes
window.addEventListener('load', initializeMarqueePosition);

// Handle window resize and mobile orientation changes
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    // Use debounce to avoid too many calculations
    resizeTimer = setTimeout(initializeMarqueePosition, 100);
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    // --- Header Background and Shadow Change ---
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #32548ef4 0%, #0086d4f8 100%)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'linear-gradient(135deg, #32548ee2 0%, #0086d49f 100%)';
        header.style.boxShadow = 'none';
    }

    // --- Marquee Scroll Behavior ---
    const marqueeContainer = document.querySelector('.marquee-container');

    if (marqueeContainer) {
        const headerHeight = header.offsetHeight;
        const scrollThreshold = 1; // Start detaching immediately

        if (window.scrollY > scrollThreshold) {
            // After scrolling, keep it absolutely positioned
            if (marqueeContainer.style.position !== 'absolute') {
                marqueeContainer.style.position = 'absolute';
                marqueeContainer.style.top = (headerHeight + scrollThreshold) + 'px';
            }
        } else {
            // At the very top, make it fixed to stick with header
            marqueeContainer.style.position = 'fixed';
            marqueeContainer.style.top = headerHeight + 'px';
        }
    }

    // --- Sticky Button Logic with Stop Zone ---
    const ctaButton = document.querySelector('#sticky-cta');
    const stopElement = document.querySelector('#button-stop-zone');
    const heroSection = document.querySelector('.hero');

    if (ctaButton && stopElement && heroSection) {
        // Ensure body has positioning context for absolute positioning
        document.body.style.position = 'relative';

        // Get scroll position
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Get positions
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const stopElementTop = stopElement.offsetTop;
        const buttonHeight = ctaButton.offsetHeight;

        // Calculate scroll bottom (bottom of viewport)
        const scrollBottom = scrollY + windowHeight;

        // Scroll threshold: activate after scrolling 300px
        const scrollThreshold = 300;

        // Padding before stop zone (larger for better visibility)
        const padding = 150;

        // Check if we've scrolled past the threshold
        if (scrollY > scrollThreshold) {
            // Check if we've reached the stop zone
            if (scrollBottom >= (stopElementTop - padding)) {
                // Stop being fixed - position absolutely above stop zone
                ctaButton.classList.remove('cta-button-fixed');
                ctaButton.classList.add('cta-button-stopped');
                ctaButton.style.position = 'absolute';
                ctaButton.style.bottom = '';
                ctaButton.style.left = '50%';
                ctaButton.style.right = 'auto';
                ctaButton.style.marginLeft = 'auto';
                ctaButton.style.marginRight = 'auto';
                ctaButton.style.transform = 'translateX(-50%)';
                ctaButton.style.zIndex = '9999';
                ctaButton.style.visibility = 'visible';
                ctaButton.style.display = 'inline-block';
                // Position it above the stop zone
                const topPosition = stopElementTop - buttonHeight - padding;
                ctaButton.style.top = topPosition + 'px';
            } else {
                // Make button sticky at bottom
                ctaButton.classList.add('cta-button-fixed');
                ctaButton.classList.remove('cta-button-stopped');
                ctaButton.style.position = 'fixed';
                ctaButton.style.bottom = '20px';
                ctaButton.style.left = '50%';
                ctaButton.style.right = 'auto';
                ctaButton.style.marginLeft = 'auto';
                ctaButton.style.marginRight = 'auto';
                ctaButton.style.transform = 'translateX(-50%)';
                ctaButton.style.zIndex = '9999';
                ctaButton.style.visibility = 'visible';
                ctaButton.style.display = 'inline-block';
                ctaButton.style.top = '';
            }
        } else {
            // At top of page - button stays in hero section
            ctaButton.classList.remove('cta-button-fixed');
            ctaButton.classList.remove('cta-button-stopped');
            ctaButton.style.position = '';
            ctaButton.style.bottom = '';
            ctaButton.style.left = '';
            ctaButton.style.transform = '';
            ctaButton.style.top = '';
        }
    }
});

// --- Intersection Observer ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== NEW YEAR CELEBRATION LOGIC (Active Jan 1-7) =====

/**
 * Check if current date is within New Year celebration period
 * @returns {boolean} True if within Jan 1-7, false otherwise
 */
function isNewYearPeriod() {
    const now = new Date();
    const month = now.getMonth(); // 0 = January
    const date = now.getDate();

    // Active from January 1 to January 7
    return (month === 0 && date >= 1 && date <= 7);
}

/**
 * Check if today is specifically New Year's Day (January 1st)
 * @returns {boolean} True if Jan 1st, false otherwise
 */
function isNewYearDay() {
    const now = new Date();
    const month = now.getMonth(); // 0 = January
    const date = now.getDate();
    return (month === 0 && date === 1);
}

/**
 * Position New Year banner (replaces marquee on Jan 1-7)
 */
function positionNewYearBanner() {
    const header = document.querySelector('.header');
    const marquee = document.querySelector('.marquee-container');
    const banner = document.querySelector('.newyear-banner');

    if (header && marquee && banner) {
        const headerHeight = header.offsetHeight;

        if (isNewYearPeriod()) {
            // On January 1-7: Hide the regular marquee and position banner in its place
            marquee.style.display = 'none';
            banner.style.position = 'fixed';
            banner.style.top = headerHeight + 'px';
        } else {
            // After January 7: Restore regular marquee
            marquee.style.display = 'block';
            banner.style.position = 'fixed';
            const marqueeBottom = headerHeight + marquee.offsetHeight;
            banner.style.top = marqueeBottom + 'px';
        }
    }
}

/**
 * Initialize New Year celebration features
 */
function initNewYearCelebration() {
    if (!isNewYearPeriod()) {
        console.log('New Year celebration period has ended. Features hidden.');
        return;
    }

    console.log('🎊 Happy New Year! Activating celebration features...');

    const overlay = document.getElementById('newyear-overlay');
    const confettiContainer = document.getElementById('confetti-container');

    if (!overlay) return;

    // Show New Year overlay
    overlay.classList.remove('newyear-hidden');

    // Position New Year banner below marquee
    positionNewYearBanner();

    // Initialize confetti
    createConfetti(confettiContainer);

    // Regenerate confetti periodically
    setInterval(() => {
        if (isNewYearPeriod()) {
            createConfetti(confettiContainer);
        }
    }, 5000);

    // Reposition banner on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            positionNewYearBanner();
        }, 100);
    });
}

/**
 * Create confetti animation
 * @param {HTMLElement} container - Container element for confetti
 */
function createConfetti(container) {
    if (!container) return;

    const colors = ['#ffd700', '#c0c0c0', '#ffed4e', '#ff6b6b', '#4ecdc4', '#95e1d3'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = (Math.random() * 3 + 2); // 2-5 seconds
        const delay = Math.random() * 2;
        const size = Math.random() * 6 + 4; // 4-10px

        confetti.style.left = `${left}%`;
        confetti.style.background = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${delay}s`;

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + delay) * 1000);
    }
}

/**
 * Add fadeOut animation to CSS if not exists
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize New Year celebration when page loads
window.addEventListener('load', () => {
    // Small delay to let the loading screen finish
    setTimeout(initNewYearCelebration, 1600);
});