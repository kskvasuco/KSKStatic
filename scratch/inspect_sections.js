const fs = require('fs');
const css = fs.readFileSync('public/landing.css', 'utf8');

const lines = css.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('background') && (
        line.includes('section') || 
        line.includes('.app-') || 
        line.includes('.services') || 
        line.includes('.products') ||
        line.includes('.why-') ||
        line.includes('footer')
    )) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});

