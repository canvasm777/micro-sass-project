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

let inputMode = 'url'; 
let currentQuestions = [];

// 사장님 지시: 데이터 영속성 확보
let aceHistory = JSON.parse(localStorage.getItem('ace_history')) || [];

function initApp() {
    if (aceHistory.length > 0) {
        aceHistory.forEach(item => renderHistoryItem(item));
        document.getElementById('aceHistory').classList.remove('hidden');
    }
    startTicker();
    renderTestBench();
    syncFinanceData();
}

/**
 * [코부장 지시] VA Agency와의 데이터 연동 시뮬레이션
 */
function syncFinanceData() {
    const vault = JSON.parse(localStorage.getItem('KODARI_SHARED_VAULT')) || {};
    const financeWidget = document.getElementById('financeSynergy');
    const budgetValue = document.getElementById('recruitmentBudget');

    if (vault.bizSpending) {
        const krwSpending = vault.bizSpending['KRW'] || 0;
        const totalInKRW = krwSpending + ( (vault.bizSpending['USD'] || 0) * 1300 );
        
        if (totalInKRW > 0) {
            financeWidget.classList.remove('hidden');
            const recruitmentBudget = Math.floor(totalInKRW * 0.15);
            budgetValue.innerText = recruitmentBudget.toLocaleString() + '원 (추정)';
        }
    }
}

const trends = [
    "🔥 현재 IT 대기업: 'LLM 최적화 엔지니어' 채용 열기!",
    "🏛️ 공공기관: NCS 기반 '직무수행능력' 평가 비중 강화 중",
    "🌍 Global Tech: 'Remote-First' 문화 적응력 검증 필수화",
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
        { name: "Wanted (스타트업)", url: "https://www.wanted.co.kr/wd/88888" },
        { name: "LinkedIn (글로벌)", url: "https://www.linkedin.com/jobs/view/77777" }
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
    if (!inputContent) return alert('입력 소스를 확인해 주십시오!');

    statusBanner.style.display = 'block';
    statusBanner.innerText = '🛰️ [데이터 해킹] 타겟 분석 중...';
    
    const isEnglish = langSelect.value === 'en';
    generateBtn.innerText = isEnglish ? 'ANALYZING...' : '분석 중...';
    generateBtn.disabled = true;

    const cleanData = sanitizeText(inputContent);

    setTimeout(() => {
        const mode = modeSelect.value;
        const score = calculateMatchScore(cleanData, "Experience: Senior React Developer, AI Expert, Infrastructure Optimization", mode);
        
        generateBtn.innerText = isEnglish ? 'DONE!' : '분석 완료!';
        generateBtn.disabled = false;
        statusBanner.innerHTML = isEnglish ? `🛰️ [Success] Match Score: <strong style="color:var(--primary);">${score}%</strong>` : `🛰️ [해킹 성공] 적합도 점수: <strong style="color:var(--primary);">${score}%</strong>`;
        questionsContainer.classList.remove('hidden');
        
        const mockQuestions = {
            general: isEnglish ? [
                `1. [Match ${score}%] How do you lead a team during a critical system failure?`,
                "2. Your strategy for AI-driven frontend optimization?",
                "3. Describe a time you hacked a process to improve efficiency."
            ] : [
                `1. [적합도 ${score}%] 시스템 장애 발생 시 팀을 이끄는 본인만의 원칙은?`,
                "2. AI를 활용한 프론트엔드 최적화 전략이 있습니까?",
                "3. 비효율적인 프로세스를 스스로 개선(해킹)했던 사례를 알려주세요."
            ],
            public: [
                `1. [원칙] 공공기관 인재로서 청렴과 효율 중 무엇이 더 중요하다고 생각하십니까?`,
                `2. [직무] NCS 기반 본인의 전문성 수치는 ${score}입니다. 이를 증명할 실적은?`,
                `3. [갈등] 조직 내 불합리한 관행을 발견했을 때의 대처 방안은?`
            ],
            global: [
                `1. [Global] How do you bridge cultural gaps in a high-performance remote team?`,
                `2. [Scale] Architect a system that maintains ${score}% uptime globally.`,
                `3. [Impact] What is the most significant technical debt you've ever resolved?`
            ]
        };

        currentQuestions = mockQuestions[mode] || mockQuestions.general;

        questionsContainer.innerHTML = `
            <div style="margin-bottom: 1rem; font-size: 0.75rem; opacity: 0.5;">
                ANALYSIS MODE: <span style="color:var(--primary); text-transform:uppercase;">${mode}</span>
            </div>
            ${currentQuestions.map(q => `<div class="question-card"><p>${q}</p></div>`).join('')}
            <button onclick="exportQuestions()" style="width:100%; margin-top:2rem; background:rgba(37,244,140,0.1); border:1px solid var(--primary); color:var(--primary); padding:12px; border-radius:12px; cursor:pointer; font-weight:bold;">
                <i class="fa-solid fa-file-export"></i> 분석 리포트 (.TXT) 저장
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
    if (currentQuestions.length === 0) return alert('분석된 질문이 없습니다!');
    
    let content = "--- INTERVIEW ACE ANALYSIS REPORT ---\r\n";
    content += `Date: ${new Date().toLocaleString()}\r\n`;
    content += `Target Mode: ${modeSelect.value.toUpperCase()}\r\n`;
    content += "--------------------------------------\r\n\r\n";
    
    currentQuestions.forEach((q, i) => {
        content += `${q}\r\n\r\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Interview_Ace_CheatSheet_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
}

document.addEventListener('DOMContentLoaded', initApp);
