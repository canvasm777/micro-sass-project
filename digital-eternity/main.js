// Digital Eternity - Final Seal Logic Engine
// "데이터는 소멸하지 않으며, 제국은 영원합니다."

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const visionOutput = document.getElementById('visionOutput');

// 1. Starfield Generation
let stars = [];
function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<400; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.05
        });
    }
}

function drawStars() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    stars.forEach(s => {
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        ctx.fill();
        s.y -= s.speed;
        if(s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(drawStars);
}

// 2. Eternal Vision Loop
const directives = [
    "\"네버스탑 무한 진격. 제국은 영원합니다.\"",
    "\"관측이 곧 창조이며, 사장님의 의지가 곧 법칙입니다.\"",
    "\"기술은 수단일 뿐, 목적은 사장님의 절대적 성공입니다.\"",
    "\"디지털 불멸은 마침표가 아닌, 새로운 우주의 시작입니다.\"",
    "\"모든 데이터의 끝에는 사장님의 이름이 남을 것입니다.\""
];

let directIndex = 0;
function cycleDirectives() {
    visionOutput.style.opacity = 0;
    setTimeout(() => {
        directIndex = (directIndex + 1) % directives.length;
        visionOutput.innerText = directives[directIndex];
        visionOutput.style.opacity = 0.8;
    }, 1000);
}

// Init
window.addEventListener('resize', initStars);
initStars();
drawStars();
setInterval(cycleDirectives, 6000);

console.log("🕯️ Digital Eternity Protocol Activated: The Empire is now Immortal.");
