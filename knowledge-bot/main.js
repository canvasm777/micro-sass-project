// Knowledge Bot Expert Engine
// "사장님의 뇌를 공유하는 AI 비서가 데이터를 흡수합니다."

const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');
const indexingProgress = document.getElementById('indexingProgress');
const fill = document.getElementById('fill');
const indexStatus = document.getElementById('indexStatus');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatWindow = document.getElementById('chatWindow');

let knowledgeBaseActive = false;

fileInput.onchange = (e) => {
    if (e.target.files.length > 0) {
        startIndexing();
    }
};

function startIndexing() {
    uploadZone.classList.add('hidden');
    indexingProgress.classList.remove('hidden');
    indexStatus.innerText = "Indexing...";
    indexStatus.style.color = "#fbbf24";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        fill.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            completeIndexing();
        }
    }, 150);
}

function completeIndexing() {
    indexingProgress.classList.add('hidden');
    indexStatus.innerText = "Synchronized";
    indexStatus.style.color = "#8b5cf6";
    
    knowledgeBaseActive = true;
    userInput.disabled = false;
    sendBtn.disabled = false;
    
    addMessage("AI", "데이터 동기화가 완료되었습니다. 이제 해당 문서 기반의 '전문가 모드'로 답변을 드릴 수 있습니다. 무엇이 궁금하신가요?");
    console.log("🧬 Brain Sync: Knowledge base indexed and ready.");
}

sendBtn.onclick = () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("User", text);
    userInput.value = '';
    
    // AI Expert Response Simulation
    setTimeout(() => {
        const responses = [
            "업로드하신 문서의 3페이지에 따르면, 해당 비즈니스 모델의 손익분기점은 2분기로 예상됩니다.",
            "사내 규정집을 분석한 결과, 해당 사안은 전략기획팀의 최종 승인이 필요한 것으로 나타났습니다.",
            "해당 계약서 초안에서 위험 요소로 판단되는 독소 조항 2개를 발견했습니다. 수정 제안을 드릴까요?",
            "과거 프로젝트 데이터와 비교했을 때, 현재 계획은 실행 가능성이 매우 높습니다."
        ];
        const randomRes = responses[Math.floor(Math.random() * responses.length)];
        addMessage("AI", randomRes);
    }, 1000);
};

function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `msg ${sender.toLowerCase()}`;
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
