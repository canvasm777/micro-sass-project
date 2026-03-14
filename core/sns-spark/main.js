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
    const overlay = document.getElementById('textOverlay');
    overlay.classList.remove('show');
    overlay.innerText = "";
    fileInput.value = '';
}

function showResults(sentiment, selectedTone) {
    loadingContainer.classList.add('hidden');
    captionResults.style.display = 'block';
    
    // [코부장의 비기] MZ 감성 넘치는 힙한 멘트 라이브러리 (사장님 지시: 구리지 않게!)
    const slang = ["극락", "찢었다", "갓기", "폼 미쳤다", "오운완", "데일리에 정점", "말해뭐해"];
    const getRandomSlang = () => slang[Math.floor(Math.random() * slang.length)];

    const captions = {
        Professional: [
            `"${sentiment}한 가치를 증명하는 선명한 결과물. 비즈니스의 새로운 스탠다드를 제시합니다."`,
            `"완벽주의가 만든 ${sentiment}한 디테일. 당신의 성장을 서포트하는 최상의 선택."`,
            `"프로페셔널의 완성은 작은 ${sentiment}함에서 시작됩니다. #성공 #비즈니스인사이트"`
        ],
        Witty: [
            `"이 ${sentiment}함, ${getRandomSlang()}! 영자(AI)도 탐나는 비주얼 실화냐? 😎 #내돈내산 #폼미쳤다"`,
            `"사장님이 ${sentiment}하게 뽑으라고 해서 진짜 영혼 갈아 넣었습니다. 🚀 #갓기 #갓벽"`,
            `"다른 건 몰라도 이 ${sentiment}함은 못 참지! 내 피드의 주인공은 나야 나! #찢었다 #힙해"`
        ],
        Emotional: [
            `"어느덧 스며든 ${sentiment}한 공기. 오늘의 수고가 헛되지 않도록 기록하는 한 장. ✨"`,
            `"당신의 결 사이를 채우는 ${sentiment}한 무드. 마음 한구석에 간직하고 싶은 순간입니다."`,
            `"노을처럼 은은하게 번지는 이 ${sentiment}함. 오늘 하루도 고생한 당신에게 건네는 위로. #감성 #수고했어"`
        ]
    };

    const variations = captions[selectedTone];
    const finalCaption = variations[Math.floor(Math.random() * variations.length)];

    // [인스타 최적화] 사진 위에 글씨 입히기 프리뷰 가동
    const overlay = document.getElementById('textOverlay');
    overlay.innerText = finalCaption;
    overlay.classList.add('show');

    captionResults.innerHTML = `
        <div class="result-card" style="text-align: left; animation: slideInUp 0.6s ease-out;">
            <p id="captionText" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; color: #fff;">${finalCaption}</p>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="copyCaption()" style="flex: 2; padding: 12px; border-radius: 12px; border: 1px solid var(--primary); background: rgba(37,244,140,0.1); color: var(--primary); font-weight: bold; cursor: pointer;">클립보드 복사</button>
                <button onclick="shareToInstagram()" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; cursor: pointer;"><i class="fa-brands fa-instagram"></i></button>
                <button onclick="resetUpload()" style="padding: 12px; border-radius: 12px; border: none; background: rgba(255,255,255,0.05); color: white; cursor: pointer;"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>
    `;
    
    addToHistory(finalCaption);
}

function shareToInstagram() {
    const text = document.getElementById('captionText').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'SNS-Spark AI Caption',
            text: text,
            url: window.location.href
        }).then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback: Deep link to Instagram
        window.open('https://www.instagram.com/', '_blank');
        alert('캡션이 복사되었습니다! 인스타그램에서 사진과 함께 붙여넣으세요! 📸');
        copyCaption();
    }
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
