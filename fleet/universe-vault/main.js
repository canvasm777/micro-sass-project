// Universe Vault - Decentralized Ledger Engine
// "제국의 모든 부는 암호화되어 영원히 보존됩니다."

const tlvCounter = document.getElementById('tlvCounter');
const distList = document.getElementById('distList');
const ledgerBox = document.getElementById('ledgerBox');

let tlv = 84200500000;

// 1. TLV Growth Simulation
function updateTLV() {
    setInterval(() => {
        const dividend = Math.floor(Math.random() * 200000);
        tlv += dividend;
        tlvCounter.innerText = `₩${tlv.toLocaleString()}`;
        addLedgerEntry("ASSET_IN", `₩${dividend.toLocaleString()} secured from Ads-Revenue.`);
    }, 5000);
}

// 2. Dividend Distribution Logic
const modules = ["SNS-Spark", "InterviewAce", "VA-Agency", "Lead-Sniper", "Knowledge-Bot"];

function initDistributions() {
    modules.forEach(m => {
        const item = document.createElement('div');
        item.className = 'dist-item';
        item.innerHTML = `
            <span class="module">${m}</span>
            <span class="share" id="share-${m}">₩0</span>
        `;
        distList.appendChild(item);
    });
}

function distributeProfits() {
    setInterval(() => {
        const target = modules[Math.floor(Math.random() * modules.length)];
        const amount = Math.floor(Math.random() * 50000) + 10000;
        const shareEl = document.getElementById(`share-${target}`);
        
        let current = parseInt(shareEl.innerText.replace('₩', '').replace(/,/g, '')) || 0;
        shareEl.innerText = `₩${(current + amount).toLocaleString()}`;
        
        addLedgerEntry("DIVIDEND", `${target}에게 ₩${amount.toLocaleString()} 분배 완료.`);
    }, 8000);
}

// 3. Immutable Ledger
function addLedgerEntry(type, msg) {
    const txId = Math.random().toString(16).substr(2, 8).toUpperCase();
    const time = new Date().toLocaleTimeString([], { hour12: false });
    
    const row = document.createElement('div');
    row.className = 'tx-row';
    row.innerHTML = `
        <span class="tx-id">[TX-${txId}]</span>
        <span class="tx-type">[${type}]</span>
        <span class="tx-msg">${msg}</span>
        <span class="tx-time">${time}</span>
    `;
    ledgerBox.prepend(row);
    if (ledgerBox.children.length > 30) ledgerBox.lastChild.remove();
}

// Initial State
initDistributions();
updateTLV();
distributeProfits();
addLedgerEntry("SYSTEM", "Universe Vault Decentralized Network Online.");
addLedgerEntry("SECURE", "Master Encryption Key synchronized with Overlord.");

console.log("🛡️ Vault Engine: Active and securing assets.");
