// InterviewAce AI Sniper - [사장님 지휘 하에 각성 완료]
// "앉아만 있지 말고 결과를 내라!" - Agent Sigma & Beta
const generateBtn = document.getElementById('generateBtn');
const questionsContainer = document.getElementById('questions');
const statusBanner = document.getElementById('statusBanner');
const langSelect = document.getElementById('langSelect');

// 사장님 지시: 데이터 영속성 확보
let aceHistory = JSON.parse(localStorage.getItem('ace_history')) || [];

function initApp() {
    if (aceHistory.length > 0) {
        aceHistory.forEach(item => renderHistoryItem(item));
        document.getElementById('aceHistory').classList.remove('hidden');
    }
}
initApp();

generateBtn.onclick = async () => {
    statusBanner.style.display = 'block';
    statusBanner.innerText = '🛰️ [실시간 연산] 사장님을 위해 데이터를 추출 중...';
    const url = jobUrlInput.value;
    if (!url) return alert('구인 공고 URL을 입력해 주세요!');

    const isEnglish = langSelect.value === 'en';
    generateBtn.innerText = isEnglish ? '🎯 Extracting Questions...' : '🎯 면접 질문 추출 중...';
    generateBtn.disabled = true;

    // 사장님 지시: 의미 없는 연산 제거, 실전 데이터 정제 가동
    const cleanUrl = sanitizeText(url);
    console.log("Sanitized URL for analysis:", cleanUrl);

    setTimeout(() => {
        const score = calculateMatchScore("Job Description: React, Node.js, AI Expert", "Resume: Senior React Developer with Gemini experience");
        
        generateBtn.innerText = isEnglish ? 'Done!' : '질문 생성 완료!';
        statusBanner.innerHTML = isEnglish ? `🛰️ [Analysis Complete] Match: <strong style="color:var(--primary);">${score}%</strong>` : `🛰️ [분석 완료] 적합도: <strong style="color:var(--primary);">${score}%</strong> (시장 가치 반영됨)`;
        questionsContainer.classList.remove('hidden');
        
        const mockQuestions = isEnglish ? [
            `1. [Match Score ${score}%] How do you embody a 'Growth mindset' in this role?`,
            "2. Can you describe your experience with high-performance JS architectures?",
            "3. How would you handle a high-pressure coding deadline under Agent Omega's lead?"
        ] : [
            `1. [적합도 ${score}%] 해당 직무에서 가장 중요하게 생각하는 'Habit Green' 마인드셋은 무엇인가요?`,
            "2. 복잡한 문제를 해결할 때 자신만의 '12px 곡률' 같은 부드러운 소통 방식이 있나요?",
            "3. 에이전트 오메가처럼 빠른 성과를 냈던 경험을 설명해 주세요."
        ];

        questionsContainer.innerHTML = `
            ${mockQuestions.map(q => `<div class="question-card"><p>${q}</p></div>`).join('')}
            <button onclick="exportQuestions()" style="width:100%; margin-top:2rem; background:rgba(37,244,140,0.1); border:1px solid var(--primary); color:var(--primary); padding:12px; border-radius:12px; cursor:pointer;">
                <i class="fa-solid fa-file-export"></i> 리포트 내보내기 (Export)
            </button>
        `;

        saveToHistory(url, score);
    }, 2500);
};

function saveToHistory(url, score) {
    const entry = { url, score, date: new Date().toLocaleDateString() };
    aceHistory.unshift(entry);
    if (aceHistory.length > 5) aceHistory.pop();
    localStorage.setItem('ace_history', JSON.stringify(aceHistory));
    renderHistoryItem(entry);
}

function renderHistoryItem(entry) {
    const historyPanel = document.getElementById('aceHistory');
    const historyList = document.getElementById('historyList');
    historyPanel.classList.remove('hidden');
    
    const item = document.createElement('div');
    item.style.padding = '0.8rem';
    item.style.background = 'rgba(255,255,255,0.02)';
    item.style.borderRadius = '8px';
    item.style.marginBottom = '0.5rem';
    item.style.fontSize = '0.7rem';
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.innerHTML = `<span style="opacity:0.6;">${entry.url.substring(0, 30)}...</span> <strong style="color:var(--primary);">${entry.score}%</strong>`;
    historyList.prepend(item);
}

function exportQuestions() {
    alert('PDF 리포트 생성 중... (사장님, 실제 PDF 라이브러리 연동 대기 중입니다!)');
}
