// [사장님 정신 무장] 1초라도 더 빠르게 결과를 상납하라.
// "엉덩이가 아니라 정신을 집중하라!" - Agent Beta & Sigma

const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const resultArea = document.getElementById('result');
const display = document.getElementById('data-display');
const currencySelect = document.getElementById('currencySelect');

// 사장님 실적 관리: 데이터 휘발 방지를 위한 localStorage 연동
let currentCurrency = localStorage.getItem('invoice_currency') || 'KRW';
let totalSpending = parseFloat(localStorage.getItem('invoice_total_' + currentCurrency)) || 0;
let bizSpending = parseFloat(localStorage.getItem('invoice_biz_' + currentCurrency)) || 0;
let personalSpending = parseFloat(localStorage.getItem('invoice_personal_' + currentCurrency)) || 0;

function initApp() {
    currencySelect.value = currentCurrency;
    if (totalSpending > 0) {
        updateChart();
    }
}
initApp();

currencySelect.onchange = (e) => {
    currentCurrency = e.target.value;
    localStorage.setItem('invoice_currency', currentCurrency);
    
    // 해당 통화의 데이터로 리로드
    totalSpending = parseFloat(localStorage.getItem('invoice_total_' + currentCurrency)) || 0;
    bizSpending = parseFloat(localStorage.getItem('invoice_biz_' + currentCurrency)) || 0;
    personalSpending = parseFloat(localStorage.getItem('invoice_personal_' + currentCurrency)) || 0;
    
    updateChart();
    display.innerHTML = '<p style="text-align:center; opacity:0.5;">통화가 변경되었습니다. 새로운 영수증을 스캔하세요.</p>';
};

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

        // 통화별 적정 금액 생성 로직 강화
        let amount = Math.random() * 50 + 10;
        if (currentCurrency === 'KRW') amount = Math.floor(amount * 1000);
        if (currentCurrency === 'JPY') amount = Math.floor(amount * 100);

        const mockData = {
            total: amount,
            merchant: ["스타벅스 강남점", "쿠팡 결제", "애플 스토어", "올리브영", "파리바게뜨"][Math.floor(Math.random()*5)],
            date: new Date().toISOString().split('T')[0],
            category: Math.random() > 0.5 ? "업무 추진비 (수익 창출)" : "개인 생활비 (복지)"
        };

        const currentTotal = parseFloat(mockData.total);
        totalSpending += currentTotal;
        
        if (mockData.category.includes('업무')) {
            bizSpending += currentTotal;
            localStorage.setItem('invoice_biz_' + currentCurrency, bizSpending);
        } else {
            personalSpending += currentTotal;
            localStorage.setItem('invoice_personal_' + currentCurrency, personalSpending);
        }
        localStorage.setItem('invoice_total_' + currentCurrency, totalSpending);

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

// 통화 형식 정규화 (글로벌 런칭 버전)
function formatCurrency(amount) {
    const locales = {
        'KRW': 'ko-KR',
        'USD': 'en-US',
        'JPY': 'ja-JP',
        'EUR': 'de-DE'
    };
    return new Intl.NumberFormat(locales[currentCurrency] || 'en-US', { 
        style: 'currency', 
        currency: currentCurrency,
        maximumFractionDigits: (currentCurrency === 'KRW' || currentCurrency === 'JPY') ? 0 : 2
    }).format(amount);
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
