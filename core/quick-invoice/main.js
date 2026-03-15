// [코부장 & Z-부장] 공동 집도: 무결점 자산 솔루션 엔진 가동
// "데이터는 거짓말을 하지 않는다. 결과로 증명하라." - 코다리

// DOM 요소 일괄 획득
const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const scanner = document.getElementById('scannerLine');
const resultArea = document.getElementById('result');
const display = document.getElementById('data-display');
const currencySelect = document.getElementById('currencySelect');
const historyList = document.getElementById('historyList');
const historyContainer = document.getElementById('invoiceHistory');
const filterArea = document.getElementById('filterArea');
const reportView = document.getElementById('reportView');
const reportContent = document.getElementById('reportContent');

// 상태 관리 (localStorage 연동)
let currentCurrency = localStorage.getItem('invoice_currency') || 'KRW';
let totalSpending = parseFloat(localStorage.getItem('invoice_total_' + currentCurrency)) || 0;
let bizSpending = parseFloat(localStorage.getItem('invoice_biz_' + currentCurrency)) || 0;
let personalSpending = parseFloat(localStorage.getItem('invoice_personal_' + currentCurrency)) || 0;
let invoiceHistory = JSON.parse(localStorage.getItem('invoice_history_' + currentCurrency)) || [];

/**
 * 앱 초기화
 */
function initApp() {
    currencySelect.value = currentCurrency;
    updateChart();
    renderHistory();
    if (invoiceHistory.length > 0) {
        filterArea.classList.remove('hidden');
        resultArea.classList.remove('hidden');
    }
}

/**
 * 히스토리 렌더링
 */
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
    } else {
        historyContainer.classList.add('hidden');
    }
}

/**
 * 통화 변경 처리
 */
currencySelect.onchange = (e) => {
    currentCurrency = e.target.value;
    localStorage.setItem('invoice_currency', currentCurrency);
    
    // 해당 통화의 데이터로 리로드
    totalSpending = parseFloat(localStorage.getItem('invoice_total_' + currentCurrency)) || 0;
    bizSpending = parseFloat(localStorage.getItem('invoice_biz_' + currentCurrency)) || 0;
    personalSpending = parseFloat(localStorage.getItem('invoice_personal_' + currentCurrency)) || 0;
    invoiceHistory = JSON.parse(localStorage.getItem('invoice_history_' + currentCurrency)) || [];
    
    updateChart();
    renderHistory();
    display.innerHTML = '<p style="text-align:center; opacity:0.5;">통화가 변경되었습니다. 새로운 영수증을 스캔하세요.</p>';
};

/**
 * 파일 업로드 핸들러
 */
dropzone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
};

async function handleUpload(file) {
    if (!validateFile(file)) {
        display.innerHTML = '<p style="color: #ff4d4d; text-align: center;">❌ 유효하지 않은 파일 형식입니다. (이미지만 가능)</p>';
        resultArea.classList.remove('hidden');
        return;
    }

    scanner.classList.remove('hidden');
    dropzone.style.opacity = '0.5';
    display.innerHTML = '<p class="loading" style="text-align:center;">🔍 AI가 영수증 데이터를 정밀 분석 중입니다...</p>';
    resultArea.classList.remove('hidden');

    setTimeout(() => {
        scanner.classList.add('hidden');
        dropzone.style.opacity = '1';
        dropzone.classList.add('hidden');

        // 가상 데이터 생성
        let amount = Math.random() * 50 + 10;
        if (currentCurrency === 'KRW') amount = Math.floor(amount * 1000);
        if (currentCurrency === 'JPY') amount = Math.floor(amount * 100);

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
            date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            items: selectedItems,
            category: Math.random() > 0.5 ? "BUSINESS ARCHIVE" : "PERSONAL ARCHIVE"
        };

        // 데이터 저장
        totalSpending += mockData.total;
        if (mockData.category.includes('BUSINESS')) {
            bizSpending += mockData.total;
            localStorage.setItem('invoice_biz_' + currentCurrency, bizSpending);
        } else {
            personalSpending += mockData.total;
            localStorage.setItem('invoice_personal_' + currentCurrency, personalSpending);
        }
        localStorage.setItem('invoice_total_' + currentCurrency, totalSpending);
        
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
                <div class="card-header" style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.7rem; opacity: 0.6;">
                    <span class="category-badge" style="color: var(--primary); font-weight: bold;">${mockData.category}</span>
                    <span class="date-text">${mockData.date}</span>
                </div>
                <div class="card-body" style="text-align: center; padding: 1rem 0;">
                    <h2 style="font-size: 2.5rem; color: var(--primary); margin: 0.5rem 0;">${formatCurrency(mockData.total)}</h2>
                    <p class="merchant-name" style="letter-spacing: 2px;"><i class="fa-solid fa-store"></i> ${mockData.merchant}</p>
                    <div style="font-size: 0.8rem; opacity: 0.4; margin-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem;">
                        <strong>ITEMS:</strong> ${mockData.items.join(', ')}
                    </div>
                </div>
                <div class="card-footer" style="margin-top: 2rem;">
                    <button class="approve-btn" style="width: 100%; background: var(--primary); color: #000; border: none; padding: 1rem; font-weight: 900; cursor: pointer;" onclick="alert('ARCHIVED SUCCESSFULLY!')">ARCHIVE DATA</button>
                </div>
            </div>
        `;
    }, 2000);
}

/**
 * 리포트 생성 엔진
 */
function generateReport() {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;
    
    if (!start || !end) {
        alert('조회 기간을 설정해 주십시오!');
        return;
    }

    const filtered = invoiceHistory.filter(item => item.date >= start && item.date <= end);
    const periodTotal = filtered.reduce((acc, curr) => acc + curr.total, 0);
    
    const itemFrequency = {};
    filtered.forEach(invoice => {
        invoice.items.forEach(item => {
            itemFrequency[item] = (itemFrequency[item] || 0) + 1;
        });
    });

    let nextMonthStrategy = "";
    const topItem = Object.entries(itemFrequency).sort((a,b) => b[1] - a[1])[0];
    if (topItem) {
        nextMonthStrategy = `대표님, 이번 기간에 <strong>'${topItem[0]}'</strong>만 총 ${topItem[1]}번 구매하셨군요! 이 항목에 대한 지출을 최적화할 필요가 있어 보입니다.`;
    } else {
        nextMonthStrategy = "데이터를 더 쌓으시면 맞춤형 지출 분석을 제공해 드립니다. 🫡";
    }
    
    reportView.classList.remove('hidden');
    reportContent.innerHTML = `
        <div style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
            <div style="opacity: 0.6; font-size: 0.8rem;">PERIOD: ${start} ~ ${end}</div>
            <div style="font-size: 1.5rem; font-weight: bold; margin-top: 5px; color: var(--primary);">TOTAL: ${formatCurrency(periodTotal)}</div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <div style="font-weight: bold; margin-bottom: 0.8rem; font-size: 0.85rem;">
                <i class="fa-solid fa-layer-group"></i> ITEM FREQUENCY
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${Object.entries(itemFrequency).map(([name, count]) => `
                    <div style="background: rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 8px; font-size: 0.75rem; border: 1px solid var(--border);">
                        ${name} <strong style="color: var(--primary); margin-left: 4px;">${count}</strong>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="background: rgba(37,244,140,0.05); padding: 1rem; border-radius: 12px; border: 1px solid var(--primary);">
            <div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--primary);">
                <i class="fa-solid fa-wand-magic-sparkles"></i> AI ARCHIVE INSIGHT
            </div>
            <p style="font-size: 0.8rem; line-height: 1.5; opacity: 0.9;">
                ${nextMonthStrategy}
            </p>
        </div>
    `;
}

function closeReport() {
    reportView.classList.add('hidden');
}

/**
 * 엑셀 내보내기 (CSV)
 */
function exportToExcel() {
    if (invoiceHistory.length === 0) return alert('내보낼 데이터가 없습니다!');
    
    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel
    csvContent += "날짜,가맹점,카테고리,금액,통화,항목\r\n";
    
    invoiceHistory.forEach(item => {
        csvContent += `${item.date},${item.merchant},${item.category},${item.total},${currentCurrency},"${item.items.join('|')}"\r\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Quick_Invoice_Archive_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetUpload() {
    dropzone.classList.remove('hidden');
    resultArea.classList.add('hidden');
    fileInput.value = '';
}

function clearHistory() {
    if (confirm('모든 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('invoice_total_' + currentCurrency);
        localStorage.removeItem('invoice_biz_' + currentCurrency);
        localStorage.removeItem('invoice_personal_' + currentCurrency);
        localStorage.removeItem('invoice_history_' + currentCurrency);
        location.reload();
    }
}

function validateFile(file) {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
}

function formatCurrency(amount) {
    const locales = { 'KRW': 'ko-KR', 'USD': 'en-US', 'JPY': 'ja-JP' };
    return new Intl.NumberFormat(locales[currentCurrency] || 'ko-KR', { 
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

// 초기 로드
document.addEventListener('DOMContentLoaded', initApp);
