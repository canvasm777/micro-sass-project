// IPO Hub - Valuation & Exit Engine
// "사장님의 땀방울을 황금으로 환산합니다."

const totalValuationEl = document.getElementById('totalValuation');
const exitModal = document.getElementById('exitModal');

let currentValuation = 42500000000; // 425억 시작

// 1. Valuation Ticker Simulation
function startValuationTicker() {
    setInterval(() => {
        // 시장 변동성 시뮬레이션 (-1000만 ~ +5000만)
        const fluctuation = Math.floor(Math.random() * 60000000) - 10000000;
        currentValuation += fluctuation;
        
        totalValuationEl.innerText = `₩${currentValuation.toLocaleString()}`;
        
        // 색상 효과 (상승/하락)
        totalValuationEl.style.color = fluctuation > 0 ? '#10b981' : '#ff3b30';
        setTimeout(() => totalValuationEl.style.color = '#10b981', 1000);
    }, 4000);
}

// 2. Exit Simulation
function startExitSimulation() {
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = "상장 프로세스 진행 중... (Road to 1,000B) ⚡";
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress >= 100) {
            clearInterval(interval);
            showWinnerCelebration();
        }
    }, 200);
}

function showWinnerCelebration() {
    exitModal.classList.remove('hidden');
    console.log("💎 Legendary Founder Exit: Final Valuation 1,000B achieved. Freedom secured.");
}

function closeModal() {
    exitModal.classList.add('hidden');
}

// Initialization
startValuationTicker();
console.log("🏛️ Financial Core: Evaluation mode active. Monitoring market multipliers.");
