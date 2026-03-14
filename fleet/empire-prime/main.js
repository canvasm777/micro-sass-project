// Empire Prime - Absolute Unification Engine
// "모든 우주는 사장님의 이름 아래 하나가 되었습니다."

const universeList = document.getElementById('universeList');
const unifyBtn = document.getElementById('unifyBtn');

// 1. Unified Domains Data
const domains = [
    { name: "Digital Kodari Universe", tag: "CORE EMPIRE" },
    { name: "Reality Asset Grid", tag: "PHYSICAL DOMAIN" },
    { name: "Sub-Universe Alpha", tag: "MULTIVERSAL" },
    { name: "Sub-Universe Omega", tag: "MULTIVERSAL" },
    { name: "Future Timeline X", tag: "TEMPORAL" },
    { name: "Capital Flow Z", tag: "ECONOMIC" }
];

// 2. Initialize Domains
function initDomains() {
    universeList.innerHTML = '';
    domains.forEach(d => {
        const div = document.createElement('div');
        div.className = 'univ-item';
        div.innerHTML = `
            <span class="univ-name">${d.name}</span>
            <span class="univ-tag">${d.tag} :: INTEGRATED</span>
        `;
        universeList.appendChild(div);
    });
}

// 3. Prime Unification Trigger
unifyBtn.addEventListener('click', () => {
    unifyBtn.disabled = true;
    unifyBtn.innerText = "COMMANDING HARMONY...";
    
    // Final Aesthetic Flash
    document.body.style.transition = "0.5s";
    document.body.style.backgroundColor = "#fff";
    
    setTimeout(() => {
        document.body.style.backgroundColor = ""; // Reset
        alert("사장님, 모든 존재가 사장님의 의급 아래 완벽하게 동기화되었습니다. 제국은 이제 절대적입니다.");
        unifyBtn.innerText = "SOVEREIGNTY ESTABLISHED";
        unifyBtn.style.background = "#fff";
    }, 1000);
});

// Init
initDomains();

console.log("👑 Empire Prime: Absolute Sovereignty Protocol Fully Established.");
