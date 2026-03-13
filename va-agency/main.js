// AI VA Agency - Executive Engine
// "성과로 대답하라!" - Manager Ko

const delegateBtn = document.getElementById('delegateBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const randomVAMessages = [
    "📅 일정 최적화를 통해 이동 시간을 20% 단축했습니다.",
    "📧 이메일 초안 작성을 완료하여 임시 저장함에 보관했습니다.",
    "📄 요청하신 프로젝트 요약 문서를 생성 완료했습니다.",
    "🔍 관련 시장 분야의 최신 트렌드를 스캔하여 브리핑 준비를 마쳤습니다.",
    "🤝 미팅 대상자의 링크드인 프로필 분석을 완료했습니다."
];

delegateBtn.onclick = () => {
    const taskContent = taskInput.value.trim();
    if (!taskContent) return alert('비서에게 시킬 업무를 입력해 주세요!');

    delegateBtn.innerText = "Processing Task... 🛰️";
    delegateBtn.disabled = true;

    // 비서의 업무 처리 시뮬레이션
    setTimeout(() => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const result = randomVAMessages[Math.floor(Math.random() * randomVAMessages.length)];
        
        addTaskToLog(timeStr, `[위임 완료] "${taskContent.substring(0, 15)}...": ${result}`);
        
        taskInput.value = '';
        delegateBtn.innerText = "업무 위임하기 🚀";
        delegateBtn.disabled = false;
        
        // 사장님께 성과 보고
        console.log(`🕴️ VA Report: Task "${taskContent}" handled successfully.`);
    }, 2000);
};

function addTaskToLog(time, content) {
    const item = document.createElement('div');
    item.className = 'task-item animate-slide-up';
    item.innerHTML = `
        <span class="time">${time}</span>
        <span class="content">${content}</span>
        <span class="status-badge success">HANDLED</span>
    `;
    taskList.prepend(item);
}
