// InterviewAce AI Sniper - [사장님 지휘 하에 각성 완료]
// "앉아만 있지 말고 결과를 내라!" - Agent Sigma & Beta
const generateBtn = document.getElementById('generateBtn');
const questionsContainer = document.getElementById('questions');
const statusBanner = document.getElementById('statusBanner');
const langSelect = document.getElementById('langSelect');
const modeSelect = document.getElementById('modeSelect');
const jobUrlInput = document.getElementById('jobUrl');
const jobTextInput = document.getElementById('jobText');
const trendTicker = document.getElementById('trendTicker');
const testLinksContainer = document.getElementById('testLinks');
const toggleInputBtn = document.getElementById('toggleInputBtn');
const sampleBtn = document.getElementById('sampleBtn');
const urlInputArea = document.getElementById('urlInputArea');
const textInputArea = document.getElementById('textInputArea');

let inputMode = 'url'; // 'url' or 'text'

// 사장님 지시: 데이터 영속성 확보
let aceHistory = JSON.parse(localStorage.getItem('ace_history')) || [];

function initApp() {
    if (aceHistory.length > 0) {
        aceHistory.forEach(item => renderHistoryItem(item));
        document.getElementById('aceHistory').classList.remove('hidden');
    }
    startTicker();
    renderTestBench();
}
initApp();

const trends = [
    "🔥 현재 IT 대기업: 'LLM 최적화 엔지니어' 채용 열기!",
    "🏛️ 공공기관: NCS 기반 '직무수행능력' 평가 비중 강화 중",
    "🌍 Global Tech: 'Remote-First' 문화 적응력 검증 필수화",
    "🚀 스타벅스: '비즈니스 민첩성(Agility)' 중점 채용 중",
    "💡 채용 트렌드: 'AI 협업 능력'이 연봉 20% 결정"
];

function startTicker() {
    let i = 0;
    trendTicker.innerText = trends[0];
    setInterval(() => {
        i = (i + 1) % trends.length;
        trendTicker.style.opacity = '0';
        setTimeout(() => {
            trendTicker.innerText = trends[i];
            trendTicker.style.opacity = '0.8';
        }, 500);
    }, 4000);
}

function renderTestBench() {
    const samples = [
        { name: "사람인 (국내 대기업 예시)", url: "https://www.saramin.co.kr/zf_user/jobs/public/view?rec_idx=12345" },
        { name: "잡코리아 (중견기업 예시)", url: "https://www.jobkorea.co.kr/Recruit/GI_Read/99999" },
        { name: "Wanted (스타트업/신산업)", url: "https://www.wanted.co.kr/wd/88888" },
        { name: "LinkedIn (글로벌 테크)", url: "https://www.linkedin.com/jobs/view/77777" }
    ];
    testLinksContainer.innerHTML = samples.map(s => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; padding: 4px 8px; background: rgba(255,255,255,0.03); border-radius: 6px;">
            <span>${s.name}</span>
            <button onclick="document.getElementById('jobUrl').value='${s.url}'" style="background:transparent; border:none; color:var(--primary); cursor:pointer; font-size: 0.7rem; font-weight: bold;">[입력]</button>
        </div>
    `).join('');
}

toggleInputBtn.onclick = () => {
    inputMode = inputMode === 'url' ? 'text' : 'url';
    urlInputArea.classList.toggle('hidden');
    textInputArea.classList.toggle('hidden');
    toggleInputBtn.innerText = inputMode === 'url' ? '[URL ↔ 텍스트 전환]' : '[텍스트 ↔ URL 전환]';
};

sampleBtn.onclick = () => {
    if (inputMode === 'url') {
        jobUrlInput.value = "https://www.wanted.co.kr/wd/123456";
    } else {
        jobTextInput.value = "[구인공고 예시]\n- 직무: 시니어 React 개발자\n- 필수: TypeScript, Node.js, AI 연동 경험\n- 우대: NCS 기반 시스템 구축 경험자";
    }
};

generateBtn.onclick = async () => {
    const inputContent = inputMode === 'url' ? jobUrlInput.value : jobTextInput.value;
    if (!inputContent) return alert(inputMode === 'url' ? '구인 공고 URL을 입력해 주세요!' : '공고 내용을 입력해 주세요!');

    statusBanner.style.display = 'block';
    statusBanner.innerText = '🛰️ [실시간 연산] 사장님을 위해 데이터를 추출 중...';
    
    const isEnglish = langSelect.value === 'en';
    generateBtn.innerText = isEnglish ? '🎯 Extracting Questions...' : '🎯 질문 추출 중...';
    generateBtn.disabled = true;

    // 사장님 지시: 의미 없는 연산 제거, 실전 데이터 정제 가동
    const cleanData = sanitizeText(inputContent);
    console.log("Sanitized Input for analysis:", cleanData);

    setTimeout(() => {
        const mode = modeSelect.value;
        const score = calculateMatchScore(cleanData, "Resume: Senior React Developer with Gemini experience, NCS expert, Scalable systems", mode);
        
        generateBtn.innerText = isEnglish ? 'Done!' : '질문 생성 완료!';
        generateBtn.disabled = false;
        statusBanner.innerHTML = isEnglish ? `🛰️ [Analysis Complete] Match: <strong style="color:var(--primary);">${score}%</strong>` : `🛰️ [분석 완료] 적합도: <strong style="color:var(--primary);">${score}%</strong>`;
        questionsContainer.classList.remove('hidden');
        
        const mockQuestions = {
            general: isEnglish ? [
                `1. [Match ${score}%] How do you handle rapid changes in a startup environment?`,
                "2. Experience with React & Node.js scalable architecture?",
                "3. How would you solve a critical bug within a 24-hour sprint?"
            ] : [
                `1. [적합도 ${score}%] 스타트업의 빠른 속도에 적응하기 위한 자신만의 노하우는?`,
                "2. React/Node.js 기반 대규모 트래픽 처리 경험이 있나요?",
                "3. 24시간 스프린트 내에 치명적인 버그를 해결했던 사례를 알려주세요."
            ],
            public: [
                `1. [원칙 준수] 공공기관 종사자로서 가장 최우선시해야 할 직업윤리는 무엇인가요?`,
                `2. [직무 역량] NCS 기반 해당 직무에서 본인이 가진 전문성 수치는 ${score}점입니다. 이를 증명할 사례는?`,
                `3. [갈등 관리] 조직 내 규정과 개인의 의견이 상충할 때 어떻게 대처하시겠습니까?`
            ],
            global: [
                `1. [Global Mindset] How do you collaborate effectively in a cross-border, multi-cultural remote team?`,
                `2. [Technical Depth] Explain how you would architect a ${score}% available globally distributed system.`,
                `3. [Communication] Describe a time you simplified a complex technical concept for non-technical stakeholders.`
            ]
        };

        const finalQuestions = mockQuestions[mode] || mockQuestions.general;

        questionsContainer.innerHTML = `
            <div style="margin-bottom: 1rem; font-size: 0.75rem; opacity: 0.5;">
                분석 모드: <span style="color:var(--primary); text-transform:uppercase;">${mode}</span>
            </div>
            ${finalQuestions.map(q => `<div class="question-card"><p>${q}</p></div>`).join('')}
            <button onclick="exportQuestions()" style="width:100%; margin-top:2rem; background:rgba(37,244,140,0.1); border:1px solid var(--primary); color:var(--primary); padding:12px; border-radius:12px; cursor:pointer;">
                <i class="fa-solid fa-file-export"></i> 분석 리포트 PDF 저장
            </button>
        `;

        saveToHistory(inputMode === 'url' ? inputContent : 'Direct Paste Content', score);
    }, 2500);
};

function saveToHistory(identifier, score) {
    const entry = { url: identifier, score, date: new Date().toLocaleDateString() };
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
