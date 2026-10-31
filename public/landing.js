/**
 * KSK VASU & Co. - Core Interactive Logic
 * Features: Mobile Menu, Sticky Header, Live Marquee, Smart Sticky CTA,
 * Product Filter Tabs, FAQ Accordion, Quick Inquiry
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReset();
    initMobileMenu();
    initStickyHeader();
    initStickyCTA();
    initMarquee();
    initProductFilters();
    initFaqAccordion();
    initInquiryForm();
    initScrollAnimations();
    initQrModal();
    initPortfolioDynamicBanner();
});

// =========================================
// 1. SCROLL RESET
// =========================================
function initScrollReset() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
}

// =========================================
// 2. MOBILE NAVIGATION DRAWER
// =========================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const body = document.body;

    if (!toggle || !drawer || !backdrop) return;

    function openMenu() {
        drawer.classList.add('active');
        backdrop.classList.add('active');
        body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
        body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        if (drawer.classList.contains('active')) closeMenu();
        else openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeMenu();
        }
    });

    drawer.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            closeMenu();
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    setTimeout(() => {
                        const header = document.querySelector('.header');
                        const headerH = header ? header.offsetHeight : 97;
                        const targetRect = targetEl.getBoundingClientRect();
                        const targetTop = targetRect.top + window.scrollY - headerH - 6;
                        window.scrollTo({
                            top: Math.max(0, targetTop),
                            behavior: 'smooth'
                        });
                    }, 120);
                }
            }
        });
    });

    drawer.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && drawer.classList.contains('active')) {
            closeMenu();
        }
    });
}

// =========================================
// 3. STICKY HEADER
// =========================================
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// =========================================
// 4. SMART STICKY CTA BUTTON
// =========================================
function initStickyCTA() {
    const heroCTA = document.getElementById('hero-cta');
    const stickyBtn = document.getElementById('universal-sticky-btn');
    if (!stickyBtn) return;

    function checkVisibility() {
        if (heroCTA) {
            const rect = heroCTA.getBoundingClientRect();
            if (rect.bottom < 100) {
                stickyBtn.classList.add('visible');
            } else {
                stickyBtn.classList.remove('visible');
            }
        } else {
            if (window.scrollY > 450) {
                stickyBtn.classList.add('visible');
            } else {
                stickyBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();
}

// =========================================
// 5. LIVE MARQUEE ANIMATION
// =========================================
function initMarquee() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const marqueeText = document.querySelector('.marquee-text');
    const header = document.querySelector('.header');

    if (!marqueeContainer || !marqueeText || !header) return;

    let position = 0;
    let isPaused = false;
    let animationId = null;
    const speed = 1.2;

    function getContentWidth() {
        const spans = marqueeText.querySelectorAll('span');
        return spans.length > 0 ? spans[0].offsetWidth : marqueeText.scrollWidth / 2;
    }

    function animate() {
        if (!isPaused) {
            position -= speed;
            const contentWidth = getContentWidth();
            if (Math.abs(position) >= contentWidth) {
                position = 0;
            }
            marqueeText.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    marqueeContainer.addEventListener('mouseenter', () => { isPaused = true; });
    marqueeContainer.addEventListener('mouseleave', () => { isPaused = false; });
    marqueeContainer.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    marqueeContainer.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animate);
        }
    });

    animationId = requestAnimationFrame(animate);
}

// =========================================
// 6. PRODUCT FILTER TABS
// =========================================
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.display = 'none';
                }
            });

            // If user has scrolled down into products, ensure filter bar & top card stay visible
            const filterBar = document.querySelector('.product-filter-bar');
            if (filterBar) {
                const filterRect = filterBar.getBoundingClientRect();
                const header = document.querySelector('.header');
                const headerH = header ? header.offsetHeight : 97;
                if (filterRect.top < headerH) {
                    window.scrollTo({
                        top: window.scrollY + filterRect.top - headerH - 8,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// =========================================
// 7. FAQ ACCORDION
// =========================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(other => other.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// =========================================
// 9. QUICK INQUIRY FORM
// =========================================
function initInquiryForm() {
    const form = document.getElementById('quick-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('inquiry-name').value.trim();
        const phone = document.getElementById('inquiry-phone').value.trim();
        const material = document.getElementById('inquiry-material').value;
        const location = document.getElementById('inquiry-location').value.trim();

        if (!name || !phone) {
            alert('Please provide your name and contact phone number.');
            return;
        }

        const message = `Hello KSK VASU & Co., I am ${encodeURIComponent(name)} from ${encodeURIComponent(location || 'Tamil Nadu')}. I need a quote for: ${encodeURIComponent(material)}. Contact: ${encodeURIComponent(phone)}.`;
        
        // Open WhatsApp directly with prefilled order request
        const whatsappUrl = `https://wa.me/919443350464?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}

// =========================================
// 10. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// =========================================
function initScrollAnimations() {
    const cards = document.querySelectorAll(
        '.service-card, .product-card, .metric-card, .why-card, .step-card, ' +
        '.testimonial-card, .contact-card, .faq-item, .developer-card'
    );

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseFloat(el.dataset.delay || '0');
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1)';
                }, delay);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    cards.forEach((el, idx) => {
        // Stagger delay within same parent grid: 0, 80, 160, 240ms
        const siblings = el.parentElement ? [...el.parentElement.children] : [el];
        const posInGroup = siblings.indexOf(el);
        el.dataset.delay = String(Math.min(posInGroup * 80, 320));
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px) scale(0.98)';
        el.style.transition = 'opacity 0.55s ease-out, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// =========================================
// 11. QR CODE LIGHTBOX MODAL ("BIG POP")
// =========================================
function initQrModal() {
    const trigger = document.getElementById('qr-trigger');
    const modal = document.getElementById('qr-modal');
    if (!trigger || !modal) return;

    const backdrop = modal.querySelector('.qr-modal-backdrop');
    const closeBtn = document.getElementById('qr-modal-close') || modal.querySelector('.qr-modal-close');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        trigger.focus();
    }

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// =========================================
// 11. DYNAMIC PORTFOLIO BANNER EFFECTS
// =========================================
function initPortfolioDynamicBanner() {
    const card = document.getElementById('portfolioDynamicCard');
    if (!card) return;

    // Check if touch device or prefers-reduced-motion
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let rafId = null;

    card.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set mouse position for dynamic flashlight spotlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D tilt calculation (-3.5deg to +3.5deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3.2;
            const rotateY = ((x - centerX) / centerX) * 3.2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
        });
    });

    card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}
