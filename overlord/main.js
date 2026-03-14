// Universe Overlord - Strategic Engine
// "사장님의 제국을 지탱하는 최상위 자율 지능입니다."

const domScoreEl = document.getElementById('domScore');
const scoreFill = document.getElementById('scoreFill');
const logWindow = document.getElementById('logWindow');

let score = 84.2;

// 1. Domination Score Ticker
function updateDomination() {
    setInterval(() => {
        const growth = (Math.random() * 0.05).toFixed(3);
        score = (parseFloat(score) + parseFloat(growth)).toFixed(2);
        domScoreEl.innerText = `${score}%`;
        scoreFill.style.width = `${score}%`;
    }, 5000);
}

// 2. Strategic Event Log
function addLog(tag, msg) {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-tag">[${tag.toUpperCase()}]</span>
        <span class="log-msg">${msg}</span>
    `;
    logWindow.prepend(entry);
    if (logWindow.children.length > 20) logWindow.lastChild.remove();
}

function simulateEvents() {
    const eventPool = [
        { tag: "Marketing", msg: "SNS-Spark: Viral trend detected. Scaling ad spend automatically." },
        { tag: "Sales", msg: "Lead Sniper: High-value enterprise lead captured. Sending cold mail payload." },
        { tag: "Finance", msg: "Revenue Hub: Daily profit threshold exceeded. Depositing to vault." },
        { tag: "Local", msg: "Global Dubber: Japanese localized content reach up by 300%." },
        { tag: "Intelligence", msg: "Knowledge Bot: Successfully handled 50 customer inquiries autonomously." },
        { tag: "Security", msg: "Overlord: Firewall updated. All modules secure." }
    ];

    setInterval(() => {
        if (Math.random() > 0.4) {
            const ev = eventPool[Math.floor(Math.random() * eventPool.length)];
            addLog(ev.tag, ev.msg);
        }
    }, 4000);
}

// 3. Director Card Interaction
document.querySelectorAll('.director-card').forEach(card => {
    card.onclick = () => {
        const app = card.getAttribute('data-app');
        addLog("COMMAND", `${app} AI Director에게 세부 전략 보고를 요청했습니다.`);
        setTimeout(() => {
            addLog(app, "Current performance is within optimal range. No manual intervention required.");
        }, 1000);
    };
});

// Initial Logs
addLog("SYSTEM", "Universe Overlord Strategic Link Established.");
addLog("SYSTEM", "All 10 Business Modules reporting Online.");
addLog("COMMAND", "Autopilot Mode: ACTIVE (Boss's Trust Multiplier: 5.0x)");

updateDomination();
simulateEvents();
console.log("👑 Overlord Engine: Absolute Command Active.");
