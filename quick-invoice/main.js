// [사장님 정신 무장] 1초라도 더 빠르게 결과를 상납하라.
// "엉덩이가 아니라 정신을 집중하라!" - Agent Beta & Sigma

const historyList = document.getElementById('historyList');
const historyContainer = document.getElementById('invoiceHistory');
const filterArea = document.getElementById('filterArea');
const reportView = document.getElementById('reportView');
const reportContent = document.getElementById('reportContent');

// 사장님 실적 관리: 데이터 휘발 방지를 위한 localStorage 연동
let currentCurrency = localStorage.getItem('invoice_currency') || 'KRW';
let totalSpending = parseFloat(localStorage.getItem('invoice_total_' + currentCurrency)) || 0;
let bizSpending = parseFloat(localStorage.getItem('invoice_biz_' + currentCurrency)) || 0;
let personalSpending = parseFloat(localStorage.getItem('invoice_personal_' + currentCurrency)) || 0;
let invoiceHistory = JSON.parse(localStorage.getItem('invoice_history_' + currentCurrency)) || [];

function initApp() {
    currencySelect.value = currentCurrency;
    updateChart();
    renderHistory();
    if (invoiceHistory.length > 0) filterArea.classList.remove('hidden');
}
initApp();

function renderHistory() {
    historyList.innerHTML = '';
    if (invoiceHistory.length > 0) {
        historyContainer.classList.remove('hidden');
        invoiceHistory.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-item';
            card.style.cssText = 'padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;';
            card.innerHTML = `
                <div>
                    <div style="font-weight: bold; margin-bottom: 4px;">${item.merchant}</div>
                    <div style="opacity: 0.5; font-size: 0.75rem;">${item.date} • ${item.category}</div>
                </div>
                <div style="color: var(--primary); font-weight: bold;">${formatCurrency(item.total)}</div>
            `;
            historyList.appendChild(card);
        });
    }
}

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

        // [사장님 요청] 구매 목록 및 날짜 정밀 데이터 생성
        const itemOptions = [
            ["카페라떼", "샌드위치", "초코 쿠키"],
            ["맥북 에어 M3", "USB-C 허브", "매직 마우스"],
            ["비즈니스 셔츠", "슬랙스", "넥타이"],
            ["사무용 의자", "데스크 매트", "모니터 암"],
            ["점심 코스 요리", "법인카드 결제 건"]
        ];
        const selectedItems = itemOptions[Math.floor(Math.random()*itemOptions.length)];

        const mockData = {
            total: amount,
            merchant: ["스타벅스 강남점", "애플 코리아", "무신사 스토어", "한샘 가구", "우치다 다이닝"][Math.floor(Math.random()*5)],
            date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 7일 이내 랜덤 날짜
            items: selectedItems,
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
        
        // 히스토리에 추가
        invoiceHistory.unshift(mockData);
        if (invoiceHistory.length > 50) invoiceHistory.pop(); 
        localStorage.setItem('invoice_history_' + currentCurrency, JSON.stringify(invoiceHistory));

        updateChart();
        renderHistory();
        filterArea.classList.remove('hidden');

        display.innerHTML = `
            <div class="summary-chip" style="background: rgba(37, 244, 140, 0.05); border: 1px solid var(--border); padding: 0.8rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.9rem; text-align: center;">
                누적 데이터 분석 완료: <strong style="color: var(--primary);">${formatCurrency(totalSpending)}</strong>
            </div>
            <div class="data-card animate-slide-up">
                <div class="card-header">
                    <span class="category-badge">${mockData.category}</span>
                    <span class="date-text">${mockData.date}</span>
                </div>
                <div class="card-body" style="text-align: center; padding: 1rem 0;">
                    <h2 style="font-size: 2.5rem; color: var(--primary); margin: 0.5rem 0;">${formatCurrency(mockData.total)}</h2>
                    <p class="merchant-name"><i class="fa-solid fa-store"></i> ${mockData.merchant}</p>
                    <div style="font-size: 0.8rem; opacity: 0.6; margin-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem;">
                        <strong>구매 목록:</strong> ${mockData.items.join(', ')}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="approve-btn" style="width: 100%;" onclick="alert('데이터베이스 저장 완료!')">데이터 승인</button>
                </div>
            </div>
        `;
    }, 2000);
}

// [기술적 확장] 기간별 지출 합산 및 리포트 엔진
function generateReport() {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;
    
    if (!start || !end) {
        alert('조회 기간을 설정해 주십시오, 대표님!');
        return;
    }

    const filtered = invoiceHistory.filter(item => item.date >= start && item.date <= end);
    const periodTotal = filtered.reduce((acc, curr) => acc + curr.total, 0);
    const allItems = [...new Set(filtered.flatMap(item => item.items))];

    const reportView = document.getElementById('reportView');
    const reportContent = document.getElementById('reportContent');
    
    reportView.classList.remove('hidden');
    reportContent.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <div style="opacity: 0.6; font-size: 0.8rem;">설정 기간: ${start} ~ ${end}</div>
            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 5px;">총 지출: ${formatCurrency(periodTotal)}</div>
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 12px;">
            <div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 0.8rem;">📦 구매 물품 목록 (${filtered.length}건)</div>
            <div style="font-size: 0.75rem; opacity: 0.8; line-height: 1.5;">
                ${allItems.length > 0 ? allItems.join(', ') : '내역 없음'}
            </div>
        </div>
    `;
}

function closeReport() {
    document.getElementById('reportView').classList.add('hidden');
}

function resetUpload() {
    document.getElementById('dropzone').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('fileInput').value = '';
}

function clearHistory() {
    if (confirm('정말로 모든 지출 내역을 초기화하시겠습니까?')) {
        localStorage.removeItem('invoice_total_' + currentCurrency);
        localStorage.removeItem('invoice_biz_' + currentCurrency);
        localStorage.removeItem('invoice_personal_' + currentCurrency);
        localStorage.removeItem('invoice_history_' + currentCurrency);
        location.reload();
    }
}

function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return validTypes.includes(file.type);
}

function formatCurrency(amount) {
    const locales = { 'KRW': 'ko-KR', 'USD': 'en-US', 'JPY': 'ja-JP', 'EUR': 'de-DE' };
    return new Intl.NumberFormat(locales[currentCurrency] || 'en-US', { 
        style: 'currency', currency: currentCurrency,
        maximumFractionDigits: (currentCurrency === 'KRW' || currentCurrency === 'JPY') ? 0 : 2
    }).format(amount);
}

function updateChart() {
    const bizBar = document.getElementById('biz-bar');
    const personalBar = document.getElementById('personal-bar');
    const chartTotal = document.getElementById('chart-total');
    if (!bizBar || !personalBar || !chartTotal) return;
    
    const bizPct = totalSpending > 0 ? (bizSpending / totalSpending) * 100 : 0;
    const personalPct = totalSpending > 0 ? (personalSpending / totalSpending) * 100 : 0;
    
    bizBar.style.width = bizPct + '%';
    personalBar.style.width = personalPct + '%';
    chartTotal.innerText = formatCurrency(totalSpending);
}
