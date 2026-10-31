const fs = require('fs');

let js = fs.readFileSync('public/landing.js', 'utf8');

if (!js.includes('initQrModal();')) {
    js = js.replace(
        'initScrollAnimations();',
        'initScrollAnimations();\n    initQrModal();'
    );
}

const qrModalFunc = `
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
`;

if (!js.includes('function initQrModal()')) {
    js = js.trim() + '\n' + qrModalFunc;
}

fs.writeFileSync('public/landing.js', js, 'utf8');
console.log('Successfully updated landing.js');

