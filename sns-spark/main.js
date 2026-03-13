// SNS-Spark AI Engine - [사장님 지시: 초집중 모드]
// "정신을 집중해서 캡션을 뽑아라!" - Agent Omega & Beta
const captionResults = document.querySelector('.caption-results');
const toneSelect = document.getElementById('toneSelect');
const creditCountDisplay = document.getElementById('creditCount');

// 데이터 유지 및 신뢰를 위한 localStorage 연동
let userCredits = parseInt(localStorage.getItem('spark_credits')) || 5;
let sparkHistory = JSON.parse(localStorage.getItem('spark_history')) || [];

function initApp() {
    creditCountDisplay.innerText = userCredits;
    if (sparkHistory.length > 0) {
        sparkHistory.forEach(cap => renderHistoryItem(cap));
        document.getElementById('sparkHistory').classList.remove('hidden');
    }
}
initApp();

function analyzeImageContext(fileName) {
    console.log("이미지 컨텍스트 분석 중 (사장님의 초집중 지시 수행)...");
    // 파일명 키워드 기반 감성 분석 (실전 로직 시뮬레이션)
    if (fileName.toLowerCase().includes('food')) return 'Delicious';
    if (fileName.toLowerCase().includes('travel')) return 'Adventurous';
    return 'Premium';
}

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const loadingContainer = document.getElementById('loadingContainer');
const progressBar = document.getElementById('progressBar');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');

uploadArea.onclick = () => {
    if (userCredits <= 0) {
        alert('크레딧이 부족합니다! 사장님께 충전을 요청하세요! 🪙');
        return;
    }
    fileInput.click();
};

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImg.src = event.target.result;
            uploadArea.classList.add('hidden');
            imagePreview.classList.remove('hidden');
            
            // 파일 선택 후 자동 분석 시작
            startAnalysis(file.name);
        };
        reader.readAsDataURL(file);
    }
};

function startAnalysis(fileName) {
    const sentiment = analyzeImageContext(fileName);
    const selectedTone = toneSelect.value;
    
    // 크레딧 차감 및 저장
    userCredits--;
    creditCountDisplay.innerText = userCredits;
    localStorage.setItem('spark_credits', userCredits);
    
    loadingContainer.classList.remove('hidden');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            showResults(sentiment, selectedTone);
        } else {
            width += Math.random() * 20;
            progressBar.style.width = width + '%';
        }
    }, 150);
}

function resetUpload() {
    imagePreview.classList.add('hidden');
    uploadArea.classList.remove('hidden');
    captionResults.style.display = 'none';
    fileInput.value = '';
}

function showResults(sentiment, selectedTone) {
    document.getElementById('loadingContainer').classList.add('hidden');
    captionResults.style.display = 'block';
    
    const captions = {
        Professional: `"${sentiment}한 가치를 전달하는 프리미엄 서비스입니다. #비즈니스 #성공"`,
        Witty: `"이 ${sentiment}함, 실화냐? 영자도 울고 갈 퀄리티! #대박 #꿀잼"`,
        Emotional: `"어느덧 스며든 ${sentiment}한 공기. 오늘의 습관이 내일의 당신을 만듭니다. #감성 #수고했어오늘도"`
    };

    const finalCaption = captions[selectedTone];
    captionResults.innerHTML = `
        <div class="result-card" style="text-align: left; animation: slideInUp 0.6s ease-out;">
            <p id="captionText" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">${finalCaption}</p>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="copyCaption()" style="flex: 2; padding: 12px; border-radius: 12px; border: 1px solid var(--primary); background: rgba(37,244,140,0.1); color: var(--primary); font-weight: bold; cursor: pointer;">복사하기</button>
                <button onclick="alert('Instagram으로 연결합니다... (Mock)')" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #e1306c; color: white; cursor: pointer;"><i class="fa-brands fa-instagram"></i></button>
                <button onclick="location.reload()" style="padding: 12px; border-radius: 12px; border: none; background: rgba(255,255,255,0.05); color: white; cursor: pointer;"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>
    `;
    
    addToHistory(finalCaption);
}

function addToHistory(caption) {
    sparkHistory.unshift(caption);
    if (sparkHistory.length > 5) sparkHistory.pop(); // 최신 5개만 유지
    localStorage.setItem('spark_history', JSON.stringify(sparkHistory));
    
    renderHistoryItem(caption);
}

function renderHistoryItem(caption) {
    const historyPanel = document.getElementById('sparkHistory');
    const historyList = document.getElementById('historyList');
    historyPanel.classList.remove('hidden');
    
    const item = document.createElement('div');
    item.style.padding = '0.8rem';
    item.style.background = 'rgba(255,255,255,0.02)';
    item.style.borderRadius = '8px';
    item.style.marginBottom = '0.5rem';
    item.style.fontSize = '0.8rem';
    item.style.opacity = '0.7';
    item.innerText = caption.substring(0, 50) + '...';
    historyList.prepend(item);
}

function copyCaption() {
    const text = document.getElementById('captionText').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('캡션이 클립보드에 복사되었습니다! 🎉');
    });
}
