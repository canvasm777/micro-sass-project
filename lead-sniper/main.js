// Lead Sniper Intelligence Engine
// "사장님의 직관을 데이터로 정밀 조준합니다."

const scanBtn = document.getElementById('scanBtn');
const targetNicheInput = document.getElementById('targetNiche');
const statusReport = document.getElementById('statusReport');
const resultsArea = document.getElementById('resultsArea');
const leadList = document.getElementById('leadList');
const leadCount = document.getElementById('leadCount');
const emailModal = document.getElementById('emailModal');
const emailTemplate = document.getElementById('emailTemplate');

const mockBusinesses = [
    { name: "카페 오아시스", ceo: "김철수", type: "F&B", potential: "High", score: 92 },
    { name: "테크웨이브 솔루션", ceo: "이영희", type: "IT", potential: "Medium", score: 78 },
    { name: "그린 디자인 스튜디오", ceo: "박지민", type: "Design", potential: "Very High", score: 95 },
    { name: "글로벌 물류 센터", ceo: "최동석", type: "Logistics", potential: "Low", score: 45 },
    { name: "스타트업 에이전시", ceo: "정소라", type: "Consulting", potential: "High", score: 88 }
];

scanBtn.onclick = () => {
    const niche = targetNicheInput.value.trim();
    if (!niche) return alert('타겟 업종을 입력해 주세요!');

    scanBtn.disabled = true;
    scanBtn.innerText = "Scanning... 📡";
    statusReport.classList.remove('hidden');
    resultsArea.classList.add('hidden');
    leadList.innerHTML = '';

    // 스캔 시뮬레이션
    setTimeout(() => {
        statusReport.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        scanBtn.disabled = false;
        scanBtn.innerText = "스캔 기동 📡";

        // 결과 생성
        const filteredLeads = mockBusinesses.sort(() => 0.5 - Math.random()).slice(0, 3);
        leadCount.innerText = `${filteredLeads.length} Leads Found`;

        filteredLeads.forEach(lead => {
            const item = document.createElement('div');
            item.className = 'lead-item';
            item.innerHTML = `
                <div class="lead-info">
                    <h4>${lead.name}</h4>
                    <p>${lead.ceo} 대표 | ${lead.type}</p>
                    <p>잠재성: ${lead.potential}</p>
                </div>
                <div class="lead-meta">
                    <div class="score">${lead.score}pt</div>
                    <button class="btn-snipe" onclick="openSnipe('${lead.name}', '${lead.ceo}')">Snipe 📧</button>
                </div>
            `;
            leadList.appendChild(item);
        });

        console.log(`🎯 Sniper Report: Scan for "${niche}" completed. Found ${filteredLeads.length} leads.`);
    }, 3000);
};

function openSnipe(bizName, ceoName) {
    const template = `안녕하세요 ${ceoName} 대표님, ${bizName}의 최근 소식을 접하고 연락드렸습니다.\n\n저희는 AI 자동화 솔루션을 통해 비즈니스 효율을 극대화해 드리고 있습니다. 특히 ${bizName}의 현재 성장세에 저희의 도구가 큰 도움이 될 것으로 확신합니다.\n\n잠시 후 짧은 미팅이 가능하실까요?\n\n- Kodari Universe 드림`;
    emailTemplate.value = template;
    emailModal.classList.remove('hidden');
}

function closeModal() {
    emailModal.classList.add('hidden');
}

// 창 닫기 바깥 클릭
window.onclick = (event) => {
    if (event.target == emailModal) {
        closeModal();
    }
}
