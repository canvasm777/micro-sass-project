// Nexus Link - Digital Twin Sync Engine
// "가상 세계의 명령이 현실의 인프라를 움직입니다."

const canvas = document.getElementById('worldMap');
const ctx = canvas.getContext('2d');
const logContent = document.getElementById('logContent');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// 1. World Map Wireframe Simulation
function drawMap() {
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
    ctx.lineWidth = 1;
    
    // Draw grid of dots to simulate a map
    for (let x = 0; x < canvas.width; x += 30) {
        for (let y = 0; y < canvas.height; y += 30) {
            // Pseudo-randomizing to create a 'land' effect
            if (Math.sin(x * 0.05) * Math.cos(y * 0.05) > -0.2) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }
}

// 2. Data Sync Pings
function startSync() {
    setInterval(() => {
        const events = [
            { tag: "ASYNC", msg: "Seoul Hub: Processing Ad-Revenue payload." },
            { tag: "P-SYNC", msg: "San Francisco: Scaling server clusters +15%." },
            { tag: "LOGIS", msg: "London: 84 new logistics drones deployed." },
            { tag: "LINK", msg: "Tokyo: Real-world latency calibrated to 14ms." },
            { tag: "VAULT", msg: "Global TLV updated via Physical Node 01." }
        ];
        
        const e = events[Math.floor(Math.random() * events.length)];
        const row = document.createElement('div');
        row.className = 'log-row';
        row.innerHTML = `
            <span><span class="log-tag">${e.tag}</span> ${e.msg}</span>
            <span>${new Date().toLocaleTimeString([], {hour12: false})}</span>
        `;
        logContent.prepend(row);
        
        if (logContent.children.length > 10) logContent.lastChild.remove();
        
        // Randomly update monitor values
        if (Math.random() > 0.7) {
            const val = document.querySelector('#node-servers .value');
            val.innerText = (99.8 + Math.random() * 0.2).toFixed(2) + "% Online";
        }
    }, 3000);
}

// Init
drawMap();
startSync();

console.log("🛰️ Nexus Link: Infrastructure Sync Protocol Initiated.");
