// Global Dubber Sonic Engine
// "사장님의 목소리를 세계의 언어로 변환합니다."

const dubNowBtn = document.getElementById('dubNowBtn');
const flagBtns = document.querySelectorAll('.flag-btn');
const processVisual = document.getElementById('processVisual');
const processStatusText = document.getElementById('processStatusText');
const dubbingControls = document.querySelector('.dubbing-controls');

let selectedLang = 'en';

flagBtns.forEach(btn => {
    btn.onclick = () => {
        flagBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedLang = btn.dataset.lang;
        console.log(`🌍 Language updated to: ${selectedLang}`);
    };
});

dubNowBtn.onclick = () => {
    dubbingControls.classList.add('hidden');
    processVisual.classList.remove('hidden');
    
    const steps = [
        "🔍 오디오 트랙 분리 중...",
        "🧠 실시간 스크립트 번역 중 (${selectedLang})",
        "🎙️ AI 보이스 합성 및 립싱크 매칭 중...",
        "✨ 고해상도 렌더링 중..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
        processStatusText.innerText = steps[currentStep];
        currentStep++;

        if (currentStep >= steps.length) {
            clearInterval(interval);
            finishDubbing();
        }
    }, 2000);
};

function finishDubbing() {
    processVisual.innerHTML = `
        <div style="text-align: center; animation: slideUp 0.5s ease-out;">
            <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #25f48c; margin-bottom: 1rem;"></i>
            <h3 style="color: white;">더빙 완료!</h3>
            <p style="font-size: 0.8rem; opacity: 0.7;">사장님의 영상이 성공적으로 번역되었습니다.</p>
            <button onclick="location.reload()" style="margin-top: 1.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 10px 20px; border-radius: 12px; cursor: pointer;">새 영상 더빙하기</button>
        </div>
    `;
    console.log("🏅 Global Dubbing Operation: Success.");
}
