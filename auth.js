// Kodari Universe - Unified Auth System
// "보안은 사장님의 명령이다!" - Agent Sigma

(function() {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('kodari_auth') === 'true';
    const currentPath = window.location.pathname;

    // 포털(index.html)이 아닌 하위 앱에서 로그인 안 된 경우 차단
    if (!isLoggedIn && (currentPath.includes('sns-spark') || currentPath.includes('interview-ace') || currentPath.includes('quick-invoice'))) {
        alert('포털에서 로그인이 필요한 서비스입니다! 메인 화면으로 이동합니다.');
        window.location.href = '../index.html';
    }

    // 로그아웃 버튼 글로벌 주입 (푸터 근처)
    window.addEventListener('load', () => {
        const switcher = document.querySelector('.app-switcher');
        if (switcher && isLoggedIn) {
            const logoutSpan = document.createElement('span');
            logoutSpan.innerHTML = ' | <i class="fa-solid fa-right-from-bracket"></i> LOGOUT';
            logoutSpan.style.fontSize = '0.7rem';
            logoutSpan.style.cursor = 'pointer';
            logoutSpan.style.opacity = '0.4';
            logoutSpan.onclick = () => {
                localStorage.removeItem('kodari_auth');
                alert('로그아웃 되었습니다.');
                window.location.href = '../index.html';
            };
            switcher.appendChild(logoutSpan);
        }
    });
})();
