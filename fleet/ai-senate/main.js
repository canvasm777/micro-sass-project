// AI Senate - Governance Engine
// "제국의 모든 질서는 데이터의 합의에 의해 결정됩니다."

const senatorsGrid = document.getElementById('senatorsGrid');
const approveCountEl = document.getElementById('approveCount');
const rejectCountEl = document.getElementById('rejectCount');
const lawBox = document.getElementById('lawBox');
const proposalTitle = document.getElementById('proposalTitle');
const proposalDesc = document.getElementById('proposalDesc');

const decreeModal = document.getElementById('decreeModal');
const finalDecreeText = document.getElementById('finalDecreeText');

const departments = [
    { name: "Marketing", icon: "fa-bullhorn", bias: 0.8 },
    { name: "Revenue", icon: "fa-money-bill-trend-up", bias: 0.4 },
    { name: "Operations", icon: "fa-user-gear", bias: 0.6 },
    { name: "Lead Extraction", icon: "fa-crosshairs", bias: 0.7 },
    { name: "Localization", icon: "fa-language", bias: 0.9 },
    { name: "Intelligence", icon: "fa-brain", bias: 0.5 },
    { name: "Security", icon: "fa-shield-halved", bias: 0.3 },
    { name: "Growth", icon: "fa-rocket", bias: 0.85 }
];

const proposals = [
    { title: "글로벌 광고 집행 예산 200% 증액안", desc: "북미 시장 점유율 확대를 위한 공격적 마케팅 펀딩 제안." },
    { title: "비활성 모듈 자산 회수 및 재분배", desc: "사용 빈도가 낮은 서비스를 정리하고 핵심 서비스에 자원을 집중하는 안." },
    { title: "전 제국 서비스 구독료 15% 인상안", desc: "수익성 극대화 및 고도화 인프라 투자를 위한 요금 체계 개편." },
    { title: "AI 오토파일럿 완전 자율 권한 부여", desc: "대표님의 수동 개입 없이도 AI가 독자적으로 전략을 갱신할 수 있는 권한." }
];

// 1. Initialize Senators
function initSenators() {
    departments.forEach(dept => {
        const sen = document.createElement('div');
        sen.className = 'senator';
        sen.id = `senator-${dept.name}`;
        sen.innerHTML = `
            <i class="fa-solid ${dept.icon}"></i>
            <span class="name">${dept.name} AI</span>
            <div class="vote-ballot">?</div>
        `;
        senatorsGrid.appendChild(sen);
    });
}

// 2. Voting Simulation
async function startSession() {
    const p = proposals[Math.floor(Math.random() * proposals.length)];
    proposalTitle.innerText = `"${p.title}"`;
    proposalDesc.innerText = p.desc;

    let approve = 0;
    let reject = 0;

    // Reset ballots
    document.querySelectorAll('.senator').forEach(s => {
        s.classList.remove('approve', 'reject');
        s.querySelector('.vote-ballot').innerText = '?';
    });
    approveCountEl.innerText = '0';
    rejectCountEl.innerText = '0';

    // Sequence voting
    for (const dept of departments) {
        await new Promise(r => setTimeout(r, 800));
        const senator = document.getElementById(`senator-${dept.name}`);
        const isApprove = Math.random() < dept.bias;
        
        if (isApprove) {
            approve++;
            senator.classList.add('approve');
            senator.querySelector('.vote-ballot').innerText = 'Y';
        } else {
            reject++;
            senator.classList.add('reject');
            senator.querySelector('.vote-ballot').innerText = 'N';
        }
        approveCountEl.innerText = approve;
        rejectCountEl.innerText = reject;
    }

    // Final Result
    setTimeout(() => {
        if (approve > reject) {
            showDecree(p.title);
            addLaw(p.title);
        } else {
            addLog("VOTE", `제안 [${p.title}]이 부결되었습니다.`);
        }
        setTimeout(startSession, 10000);
    }, 1500);
}

function showDecree(text) {
    finalDecreeText.innerText = text;
    decreeModal.classList.remove('hidden');
    console.log(`⚖️ Decree Passed: ${text}`);
}

function closeModal() {
    decreeModal.classList.add('hidden');
}

function addLaw(title) {
    const date = new Date().toLocaleDateString();
    const law = document.createElement('div');
    law.className = 'law-entry';
    law.innerHTML = `
        <i class="fa-solid fa-scroll"></i>
        <div class="law-info">
            <strong>${title}</strong><br>
            <span class="law-date">Decree Passed on ${date}</span>
        </div>
    `;
    lawBox.prepend(law);
}

function addLog(tag, msg) {
    console.log(`[${tag}] ${msg}`);
}

// Start
initSenators();
setTimeout(startSession, 2000);

console.log("🏛️ AI Senate Engine: Governance mode active.");
