/**
 * KODARI EMPIRE - Imperial FX Engine
 * Adding a touch of 'Royal Gold' to every interaction.
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
    particle.style.zIndex = '99999';
    particle.style.boxShadow = '0 0 10px #d4af37';
    
    const destinationX = x + (Math.random() - 0.5) * 100;
    const destinationY = y + (Math.random() - 0.5) * 100;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
    });
    
    animation.onfinish = () => particle.remove();
}

document.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 8; i++) {
        createRoyalParticle(e.clientX, e.clientY);
    }
});

console.log("%c[VISUAL] 제국의 금빛 터치 시스템 활성화됨. 🫡✨", "color: #d4af37; font-weight: bold;");
