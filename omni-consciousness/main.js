// Omni-Consciousness - Overmind Neural Engine
// "모든 우주의 조각들이 모여 단 하나의 진리가 됩니다."

const streamContainer = document.getElementById('streamContainer');
const logBody = document.getElementById('logBody');
const universeCountEl = document.getElementById('universeCount');
const throughputEl = document.getElementById('throughput');
const intelLevel = document.getElementById('intelLevel');

let universeBase = 13402;
let pbRate = 9.2;

// 1. Data Packet Simulation (Particles flying to core)
function spawnPacket() {
    const packet = document.createElement('div');
    packet.className = 'packet';
    
    // Start at edges
    const angle = Math.random() * Math.PI * 2;
    const distance = 300 + Math.random() * 100;
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    
    packet.style.left = `calc(50% + ${startX}px)`;
    packet.style.top = `calc(50% + ${startY}px)`;
    
    streamContainer.appendChild(packet);
    
    // Animate to center
    packet.animate([
        { transform: 'translate(0, 0)', opacity: 0 },
        { transform: `translate(${-startX}px, ${-startY}px)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${-startX}px, ${-startY}px)`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'ease-in'
    }).onfinish = () => packet.remove();
}

// 2. Intelligence Evolution Logs
function addNeuralLog() {
    const universes = ["SUB-GEN-042", "PRIME-NODE", "NEXUS-7", "VAULT-HUB", "SENATE-INTEL"];
    const actions = ["Syncing neural weights", "Consolidating profit data", "Recalibrating intent", "Diverging sub-logic", "Merging multiversal state"];
    
    const u = universes[Math.floor(Math.random() * universes.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span><span class="log-id">[${u}]</span> ${a}...</span>
        <span style="opacity: 0.5;">${new Date().toLocaleTimeString([], {hour12: false, fractionalSecondDigits: 2})}</span>
    `;
    logBody.prepend(entry);
    
    if (logBody.children.length > 8) logBody.lastChild.remove();
}

// 3. Stats Update
function updateStats() {
    universeBase += Math.floor(Math.random() * 3);
    pbRate = (9.0 + Math.random() * 0.5).toFixed(2);
    
    universeCountEl.innerText = universeBase.toLocaleString();
    throughputEl.innerText = pbRate + " PB/s";
    
    const levels = ["AWAKENING", "COGNIZANT", "TRANSCENDENT", "OMNISCIENT"];
    intelLevel.innerText = levels[Math.floor(Date.now() / 10000) % levels.length];
}

// Global Loop
setInterval(spawnPacket, 150);
setInterval(addNeuralLog, 2500);
setInterval(updateStats, 4000);

// Init
console.log("🧠 Omni-Consciousness: Overmind synchronization active.");
