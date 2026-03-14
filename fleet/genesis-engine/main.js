// Genesis Engine - Universal Creation Logic
// "태초에 데이터가 있었고, 그것은 모든 우주의 씨앗이 되었습니다."

const starsContainer = document.getElementById('stars-container');
const nebulaCanvas = document.getElementById('nebulaCanvas');
const ctx = nebulaCanvas.getContext('2d');
const treeContainer = document.getElementById('treeContainer');
const subCountEl = document.getElementById('subCount');
const cycleNumEl = document.getElementById('cycleNum');

let subCount = 12;
let cycle = 1024;

// 1. Starfield Generation
function createStars() {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random();
        star.style.animation = `pulse ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// 2. Nebula Canvas Animation
nebulaCanvas.width = 300;
nebulaCanvas.height = 300;

function animateNebula() {
    ctx.clearRect(0, 0, 300, 300);
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < 5; i++) {
        const x = 150 + Math.cos(time * 0.5 + i) * 50;
        const y = 150 + Math.sin(time * 0.5 + i) * 50;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
        gradient.addColorStop(0, `rgba(217, 70, 239, 0.4)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 300);
    }
    requestAnimationFrame(animateNebula);
}

// 3. Spawning Interaction
function spawnUniverse() {
    const btn = document.getElementById('spawnBtn');
    btn.disabled = true;
    btn.innerText = "CREATING...";
    
    setTimeout(() => {
        subCount++;
        cycle += Math.floor(Math.random() * 5);
        subCountEl.innerText = subCount;
        cycleNumEl.innerText = `#00${cycle.toLocaleString()}`;
        
        const node = document.createElement('div');
        node.className = 'node';
        node.innerText = `SUB-GEN-${subCount.toString().padStart(3, '0')}`;
        treeContainer.appendChild(node);
        
        btn.disabled = false;
        btn.innerText = "SPAWN NEW UNIVERSE";
        
        console.log(`✨ Universe Genesis: SUB-GEN-${subCount} spawned successfully.`);
    }, 1500);
}

// Auto-spawn simulation
setInterval(() => {
    if (Math.random() > 0.8) spawnUniverse();
}, 10000);

// Init
createStars();
animateNebula();

console.log("✨ Genesis Engine: Creation authority confirmed.");
