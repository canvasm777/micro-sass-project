// Kodari Mobile OS Engine
// "보스의 손안에서 유니버스가 살아 숨 쉽니다."

const authScreen = document.getElementById('auth-screen');
const mainScreen = document.getElementById('main-screen');
const mobileTime = document.getElementById('mobile-time');
const profitEl = document.getElementById('mobile-profit');
const toast = document.getElementById('notif-toast');
const toastTitle = document.getElementById('toast-title');
const toastBody = document.getElementById('toast-body');

// 1. Biometric Auth Simulation
setTimeout(() => {
    console.log("🔋 Biometric Auth: Face ID Matched. Access Granted.");
    authScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    startLifeSimulation();
}, 3000);

// 2. Real-time Clock
function updateClock() {
    const now = new Date();
    mobileTime.innerText = now.getHours().toString().padStart(2, '0') + ":" + 
                         now.getMinutes().toString().padStart(2, '0');
}
setInterval(updateClock, 1000);
updateClock();

// 3. Profit & Notif Simulation
let currentProfit = 1240.20;

function startLifeSimulation() {
    // Profit Ticker
    setInterval(() => {
        currentProfit += Math.random() * 0.5;
        profitEl.innerText = `$${currentProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    }, 3000);

    // Random Push Notifications
    setInterval(() => {
        if (Math.random() > 0.7) {
            showNotification();
        }
    }, 15000);
}

function showNotification() {
    const events = [
        { title: "New Lead! 🎯", body: "Lead Sniper found a high-value target in SEO niche." },
        { title: "Ad Sale! 💰", body: "Revenue increased by $12.40 from SNS-Spark ads." },
        { title: "Inquiry! 💬", body: "Knowledge Bot is answering an enterprise user." },
        { title: "Task Done! ✅", body: "AI VA completed document filing for Project X." }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    
    toastTitle.innerText = event.title;
    toastBody.innerText = event.body;
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

console.log("📱 Mobile OS: Initialized and ready for command.");
