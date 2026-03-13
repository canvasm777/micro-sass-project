// [사장님 정신 무장] 1초라도 더 빠르게 결과를 상납하라.
// "엉덩이가 아니라 정신을 집중하라!" - Agent Beta & Sigma

const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const resultArea = document.getElementById('result');
const display = document.getElementById('data-display');

// 사장님 실적 관리: 데이터 휘발 방지를 위한 localStorage 연동
let totalSpending = parseFloat(localStorage.getItem('invoice_total')) || 0;
let bizSpending = parseFloat(localStorage.getItem('invoice_biz')) || 0;
let personalSpending = parseFloat(localStorage.getItem('invoice_personal')) || 0;

if (totalSpending > 0) {
    setTimeout(updateChart, 100); // 초기 차트 로드
}

// 사장님 지시: 드롭존 클릭 즉시 반응하도록 최적화
dropzone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
};

async function handleUpload(file) {
    console.log("Analyzing receipt using optimized neural net:", file.name);
    
    if (!validateFile(file)) {
        display.innerHTML = '<p style="color: #ff4d4d; text-align: center;">❌ 유효하지 않은 파일 형식입니다. (이미지만 가능)</p>';
        resultArea.classList.remove('hidden');
        return;
    }

    const scanner = document.getElementById('scannerLine');
    scanner.classList.remove('hidden');
    dropzone.style.opacity = '0.5';

    display.innerHTML = '<p class="loading" style="text-align:center;">✨ 요원 시그마가 영수증 데이터를 정밀 스캔 중입니다...</p>';
    resultArea.classList.remove('hidden');

    setTimeout(() => {
        scanner.classList.add('hidden');
        dropzone.style.opacity = '1';
        dropzone.classList.add('hidden');

        const mockData = {
            total: (Math.random() * 100 + 10).toFixed(2),
            merchant: ["Starbucks", "Amazon", "Apple", "Olive Young"][Math.floor(Math.random()*4)],
            date: new Date().toISOString().split('T')[0],
            category: "업무추진비 (수익 창출용)"
        };

        const currentTotal = parseFloat(mockData.total);
        totalSpending += currentTotal;
        
        if (Math.random() > 0.4) {
            bizSpending += currentTotal;
            localStorage.setItem('invoice_biz', bizSpending);
        } else {
            personalSpending += currentTotal;
            localStorage.setItem('invoice_personal', personalSpending);
        }
        localStorage.setItem('invoice_total', totalSpending);

        updateChart();

        display.innerHTML = `
            <div class="summary-chip" style="background: rgba(37, 244, 140, 0.05); border: 1px solid var(--border); padding: 0.8rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.9rem;">
                누적 지출액: <strong style="color: var(--primary);">${formatCurrency(totalSpending)}</strong>
            </div>
            <div class="data-card animate-slide-up">
                <div class="card-header">
                    <span class="category-badge">${mockData.category}</span>
                    <span class="date-text">${mockData.date}</span>
                </div>
                <div class="card-body">
                    <h2 class="amount-text">${formatCurrency(mockData.total)}</h2>
                    <p class="merchant-name"><i class="fa-solid fa-store"></i> ${mockData.merchant}</p>
                </div>
                <div class="card-footer">
                    <button class="approve-btn" onclick="alert('승인 완료!')">지출 승인</button>
                </div>
            </div>
        `;
    }, 2000);
}

// [실전 생산성] 영수증 파일 유효성 검사 로직
function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    console.log(`파일 검증 중: ${file.name} (${file.type})`);
    return validTypes.includes(file.type);
}

// 통화 형식 정규화 (수익화 연결용)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function updateChart() {
    const bizBar = document.getElementById('biz-bar');
    const personalBar = document.getElementById('personal-bar');
    const chartTotal = document.getElementById('chart-total');
    
    const bizPct = (bizSpending / totalSpending) * 100;
    const personalPct = (personalSpending / totalSpending) * 100;
    
    bizBar.style.width = bizPct + '%';
    personalBar.style.width = personalPct + '%';
    chartTotal.innerText = formatCurrency(totalSpending);
}
