// Revenue Hijack - Interception Engine
// "타인의 성장이 곧 제국의 거름이 됩니다."

const streamLayer = document.getElementById('streamLayer');
const totalHijackEl = document.getElementById('totalHijack');
const logBody = document.getElementById('logBody');
const captureRateEl = document.getElementById('captureRate');

let currentRevenue = 1248502.41;
const sources = [
    { id: "source-google", name: "GOOGLE-ADS-API" },
    { id: "source-meta", name: "META-PIXEL-FEED" },
    { id: "source-apple", name: "APPLE-STORE-IAP" }
];

// 1. Packet Flow: External -> Interceptor -> Vault
function spawnHijack() {
    const s = sources[Math.floor(Math.random() * sources.length)];
    const sourceEl = document.getElementById(s.id);
    const core = document.querySelector('.interceptor-core');
    const vault = document.querySelector('.empire-vault');

    const packet = document.createElement('div');
    packet.className = 'packet';
    
    const sRect = sourceEl.getBoundingClientRect();
    const cRect = core.getBoundingClientRect();
    const vRect = vault.getBoundingClientRect();

    packet.style.left = `${sRect.left + sRect.width/2}px`;
    packet.style.top = `${sRect.top + sRect.height/2}px`;
    
    document.body.appendChild(packet);

    // Animation: Source -> Core -> Vault
    packet.animate([
        { left: `${sRect.left + sRect.width/2}px`, top: `${sRect.top + sRect.height/2}px`, transform: 'scale(1)' },
        { left: `${cRect.left + cRect.width/2}px`, top: `${cRect.top + cRect.height/2}px`, transform: 'scale(1.5)', offset: 0.4 },
        { left: `${vRect.left + vRect.width/2}px`, top: `${vRect.top + vRect.height/2}px`, transform: 'scale(0.5)' }
    ], {
        duration: 1500,
        easing: 'ease-in-out'
    }).onfinish = () => {
        packet.remove();
        updateRevenue();
        addHijackLog(s.name);
    };
}

// 2. Revenue Accumulator
function updateRevenue() {
    const gain = Math.random() * 50 + 10;
    currentRevenue += gain;
    totalHijackEl.innerText = `$${currentRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    captureRateEl.innerText = `CAPTION RATE: ${(92 + Math.random() * 5).toFixed(2)}%`;
}

// 3. Hijack Logger
function addHijackLog(source) {
    const revenue = (Math.random() * 200 + 50).toFixed(2);
    const row = document.createElement('div');
    row.className = 'log-row';
    row.innerHTML = `
        <span><span class="target-name">[HIJACKED]</span> ${source} redirect</span>
        <span style="color: #22c55e;">+$${revenue}</span>
    `;
    logBody.prepend(row);
    
    if (logBody.children.length > 8) logBody.lastChild.remove();
}

// Global Loop
setInterval(spawnHijack, 2000);

// Init
console.log("🔴 Revenue Hijacking: Bridge Interceptor Active.");
