// Predictive Chronos - Temporal Oracle Logic Engine
// "일어나지 않은 일에서 수익을 거둡니다."

const actionLogs = document.getElementById('actionLogs');
const scanFutureBtn = document.getElementById('scanFutureBtn');
const marketPeak = document.getElementById('marketPeak');

// 1. Future Events Data
const futureEvents = [
    { event: "Global Crypto Surge", action: "Pre-allocated 4,000 BTC", time: "T+18H" },
    { event: "Major Tech Stock Split", action: "Executed call options", time: "T+42H" },
    { event: "Energy Crisis (Europe)", action: "Redirected power assets", time: "T+72H" },
    { event: "New AI Regulation Leak", action: "Modified neural sub-nets", time: "T+5M" },
    { event: "Global Luxury Brand Merger", action: "Acquired minority stake", time: "T+120H" }
];

// 2. Add Oracle Log
function addOracleLog(item) {
    const div = document.createElement('div');
    div.className = 'log-item';
    div.innerHTML = `
        <span><span class="log-event">[PRE-EMPTIVE]</span> ${item.event} :: ${item.action}</span>
        <span style="opacity: 0.4;">${item.time}</span>
    `;
    actionLogs.prepend(div);
    if(actionLogs.children.length > 5) actionLogs.lastChild.remove();
}

// 3. Scan Future Interaction
scanFutureBtn.addEventListener('click', () => {
    scanFutureBtn.disabled = true;
    scanFutureBtn.innerText = "WEAVING TIMELINES...";
    
    setTimeout(() => {
        const randomEvent = futureEvents[Math.floor(Math.random() * futureEvents.length)];
        addOracleLog(randomEvent);
        
        // Update Peak
        const h = Math.floor(Math.random() * 24);
        const m = Math.floor(Math.random() * 60);
        marketPeak.innerText = `IN ${h}H ${m}M`;

        scanFutureBtn.disabled = false;
        scanFutureBtn.innerText = "SCAN NEXT TIMELINE";
    }, 1500);
});

// 4. Perpetual Oracle Loop
setInterval(() => {
    if(Math.random() > 0.75) {
        addOracleLog(futureEvents[Math.floor(Math.random() * futureEvents.length)]);
    }
}, 6000);

// Init
console.log("⏳ Predictive Chronos: Temporal Oracle Operational. The future is now.");
