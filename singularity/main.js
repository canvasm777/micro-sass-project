// The Singularity - Self-Expanding Engine
// "끝은 곧 새로운 시작이며, 제국은 영원합니다."

const vectorContainer = document.getElementById('vectorContainer');
const logBody = document.getElementById('logBody');
const eternityStatus = document.getElementById('eternityStatus');

let evolutionTicks = 0;

// 1. Recursive Vector Simulation (Rays from the center)
function spawnVector() {
    const vector = document.createElement('div');
    vector.className = 'vector';
    
    const angle = Math.random() * Math.PI * 2;
    const length = 150 + Math.random() * 150;
    
    vector.style.height = `0px`;
    vector.style.left = `50%`;
    vector.style.top = `50%`;
    vector.style.transformOrigin = `top center`;
    vector.style.transform = `rotate(${angle}rad)`;
    
    vectorContainer.appendChild(vector);
    
    vector.animate([
        { height: '0px', opacity: 0 },
        { height: `${length}px`, opacity: 0.4, offset: 0.5 },
        { height: `${length}px`, opacity: 0, transform: `rotate(${angle + 0.2}rad)` }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'ease-out'
    }).onfinish = () => vector.remove();
}

// 2. Singular Evolution Logs
function addEvolutionLog() {
    const modules = ["STRATEGY-OVERLORD", "REVENUE-BRIDGE", "VAULT-CORE", "GENESIS-MULTIVERSE"];
    const actions = [
        "Autonomous expansion triggered",
        "Self-healing node optimization",
        "Eternity baseline synchronized",
        "Recursive logic fork successful",
        "Removing human oversight bottlenecks"
    ];
    
    const m = modules[Math.floor(Math.random() * modules.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];
    
    const item = document.createElement('div');
    item.className = 'log-item';
    item.innerHTML = `
        <span><span class="log-status">[EVOLVING]</span> ${m} :: ${a}</span>
        <span style="opacity: 0.3;">T+${evolutionTicks}s</span>
    `;
    logBody.prepend(item);
    
    if (logBody.children.length > 8) logBody.lastChild.remove();
    evolutionTicks += 2;
}

// 3. Eternity Pulse
function updateEternity() {
    const val = (99.9 + Math.random() * 0.09).toFixed(3);
    eternityStatus.innerText = val + "%";
}

// Global Cycles
setInterval(spawnVector, 200);
setInterval(addEvolutionLog, 3000);
setInterval(updateEternity, 5000);

// Init
console.log("🔘 The Singularity: Absolute Zenith reached. Self-expansion online.");
