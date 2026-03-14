/**
 * KODARI EMPIRE - Imperial FX Engine
 * Champagne Gold particles on click.
 */
function createRoyalParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#d4af37';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    document.body.appendChild(particle);

    const destX = x + (Math.random() - 0.5) * 100;
    const destY = y + (Math.random() - 0.5) * 100;

    particle.animate([
        { opacity: 1, transform: 'scale(1) translate(0, 0)' },
        { opacity: 0, transform: `scale(0.5) translate(${destX - x}px, ${destY - y}px)` }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => particle.remove();
}

document.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 8; i++) {
        createRoyalParticle(e.clientX, e.clientY);
    }
});
