// Ad-Revenue Hub - Royal Wealth Engine
// "사장님의 제국을 숫자로 증명합니다."

const totalWealthEl = document.getElementById('totalWealth');
const todayProfitEl = document.getElementById('todayProfit');
const impressionsEl = document.getElementById('impressions');
const transactionList = document.getElementById('transactionList');

let currentWealth = 14250.75;
let todayProfit = 342.12;
let impressions = 89420;

function updateDisplay() {
    totalWealthEl.innerText = `$${currentWealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    todayProfitEl.innerText = `$${todayProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    impressionsEl.innerText = impressions.toLocaleString();
}

function simulateRevenue() {
    setInterval(() => {
        const gain = (Math.random() * 5).toFixed(2);
        const amount = parseFloat(gain);
        
        currentWealth += amount;
        todayProfit += amount;
        impressions += Math.floor(Math.random() * 50);
        
        updateDisplay();
        
        // 가끔 큰 트랜잭션 발생
        if (Math.random() > 0.8) {
            addTransaction(amount);
        }
    }, 4000);
}

function addTransaction(amount) {
    const apps = ["SNS-Spark", "InterviewAce", "QuickInvoice", "VA Agency", "Lead Sniper", "Global Dubber"];
    const randomApp = apps[Math.floor(Math.random() * apps.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const item = document.createElement('div');
    item.className = 'tx-item';
    item.innerHTML = `
        <div class="tx-info">
            <div style="font-weight: bold;">${randomApp} Ad Revenue</div>
            <div style="font-size: 0.7rem; opacity: 0.5;">${time} • Global Tier 1</div>
        </div>
        <div class="tx-amount">+$${amount.toFixed(2)}</div>
    `;
    
    transactionList.prepend(item);
    if (transactionList.children.length > 5) transactionList.lastChild.remove();
}

function boostRevenue() {
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = "AI OPTIMIZING... ⚡";
    
    setTimeout(() => {
        const boost = 500.00;
        currentWealth += boost;
        todayProfit += boost;
        addTransaction(boost);
        updateDisplay();
        
        btn.innerText = "수익 가속기 가동 완료! 🚀";
        setTimeout(() => {
            btn.innerText = "수익 가속기 가동 (AI Boost) 🚀";
            btn.disabled = false;
        }, 3000);
        
        console.log("🦁 Manager Ko: Revenue Boost activated. Royal treasury expanding.");
    }, 2000);
}

// 초기화
updateDisplay();
simulateRevenue();
console.log("💰 Financial Core: Active. Wealth tracking online.");
