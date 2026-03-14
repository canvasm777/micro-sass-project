// Reality Bridge - Manifestation Engine
// "비트는 원자가 되고, 데이터는 빌딩이 됩니다."

const ledgerBody = document.getElementById('ledgerBody');
const wealthVal = document.getElementById('wealthVal');
const manifestBtn = document.getElementById('manifestBtn');
const syncLevel = document.getElementById('syncLevel');

let totalWealth = 1.42;
let syncPercent = 88.4;

// 1. Asset Manifestation Data
const assets = [
    { name: "Global Data Center (Iceland)", type: "Infrastructure", price: 0.12 },
    { name: "Private Island (South Pacific)", type: "Real Estate", price: 0.08 },
    { name: "Satellite Mesh Network (Orbit)", type: "Communication", price: 0.25 },
    { name: "Autonomous Logistics Hub (Germany)", type: "Supply Chain", price: 0.15 },
    { name: "Gold Bullion Reserve (Swiss Vault)", type: "Commodity", price: 0.30 }
];

// 2. Add Ledger Item
function addAsset(asset) {
    const item = document.createElement('div');
    item.className = 'ledger-item';
    item.innerHTML = `
        <span><span class="asset-name">${asset.name}</span> <span style="opacity:0.4; font-size:0.7rem;">[${asset.type}]</span></span>
        <span class="asset-status">MANIFESTED (+$${asset.price}B)</span>
    `;
    ledgerBody.prepend(item);
    if(ledgerBody.children.length > 5) ledgerBody.lastChild.remove();
    
    totalWealth += asset.price;
    wealthVal.innerText = `$${totalWealth.toFixed(2)}B`;
}

// 3. User Manifestation Trigger
manifestBtn.addEventListener('click', () => {
    manifestBtn.disabled = true;
    manifestBtn.innerText = "FORGING REALITY...";
    
    setTimeout(() => {
        const randomAsset = assets[Math.floor(Math.random() * assets.length)];
        addAsset(randomAsset);
        
        syncPercent += 0.1;
        syncLevel.innerText = `REALITY SYNC: ${syncPercent.toFixed(1)}%`;
        
        manifestBtn.disabled = false;
        manifestBtn.innerText = "FORGE REALITY ASSET";
    }, 2000);
});

// 4. Auto-Growth Simulation (Empire self-expansion)
setInterval(() => {
    if(Math.random() > 0.8) {
        const randomAsset = assets[Math.floor(Math.random() * assets.length)];
        addAsset(randomAsset);
    }
}, 8000);

console.log("🌉 Reality Bridge: Physical Manifestation Protocol Active.");
