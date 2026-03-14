const STRATEGIES = {
    low: {
        label: "SENSORY IMPRESSION (저관여/감각)",
        sections: [
            { label: "01. VISUAL HOOK", title: "찰나의 시인성", desc: "제품이 주는 즉각적인 기분 변화나 시각적 아름다움을 한 문장으로 정의합니다. 화려한 라이프스타일 컷이 필수입니다." },
            { label: "02. MICRO STORY", title: "가벼운 공감", desc: "살까 말까 고민할 시간조차 아까운 일상의 작은 불편함을 건드립니다." },
            { label: "03. PRICE ANCHOR", title: "커피 한 잔의 가치", desc: "스타벅스 커피 2잔 값으로 얻는 확실한 행복. 가격 저항선을 무너뜨리는 직관적 혜택을 강조합니다." },
            { label: "04. CROWD PROOF", title: "대세감 형성", desc: "현재 12,400명이 선택했다는 숫자를 강조하여 '나만 손해'라는 심리를 자극합니다." }
        ]
    },
    mid: {
        label: "BALANCED VALUE (중관여/실용)",
        sections: [
            { label: "01. BENEFIT HOOK", title: "결과 중심 카피", desc: "이 제품을 사용한 후 당신의 삶이 어떻게 구체적으로 개선되는지(시간 단축, 피로 감소 등) 명확히 명시합니다." },
            { label: "02. PROBLEM & SOLUTION", title: "문제 해결의 서사", desc: "기존 제품들의 단점을 조목조목 짚고, 왜 우리 제품이 그 대안이 되는지 기술적/기능적 근거를 제시합니다." },
            { label: "03. SOCIAL TRUST", title: "사용자 무결성", desc: "전문가의 추천이나 실제 구매자의 포토 리뷰를 다량 배치하여 신뢰도를 확보합니다." },
            { label: "04. RISK REVERSAL", title: "심리적 보증", desc: "무료 반품, 1년 무상 AS 등 구매 후 발생할 수 있는 리스크를 0%로 수렴하게 합니다." }
        ]
    },
    high: {
        label: "LOGICAL AUTHORITY (고관여/권위)",
        sections: [
            { label: "01. AUTHORITY HOOK", title: "압도적 전문성", desc: "해당 분야의 최고 전문가임을 입증하는 데이터나 인증, 특허를 전면에 내세웁니다." },
            { label: "02. DEEP STORYTELLING", title: "철학의 이식", desc: "제품이 만들어진 복잡한 과정과 타협하지 않는 품질에 대한 서사를 풀어내어 가치를 정당화합니다." },
            { label: "03. ECONOMIC ROI", title: "투자 가치 증명", desc: "단순한 소비가 아닌 귀하의 자산이나 능력을 높여주는 '투자'임을 강조합니다. (Time is Money 로직)" },
            { label: "04. EXCLUSIVE ACCESS", title: "희소성 기반 제안", desc: "아무나 가질 수 없는, 선택받은 소수만이 누릴 수 있는 특별한 멤버십이나 혜택을 강조합니다." }
        ]
    }
};

function projectSalesMagic() {
    const product = document.getElementById('productName').value;
    const pain = document.getElementById('painPoint').value;
    const tier = document.getElementById('priceTier').value;

    if (!product || !pain) {
        alert("제품 정보와 고객의 고통을 입력해 주십시오. 제국은 허상을 팔지 않습니다.");
        return;
    }

    const resultPanel = document.getElementById('resultPanel');
    const badge = document.getElementById('strategyBadge');
    const content = document.getElementById('blueprintContent');

    resultPanel.style.display = 'block';
    badge.innerText = STRATEGIES[tier].label;
    content.innerHTML = '';

    STRATEGIES[tier].sections.forEach((sec, index) => {
        const div = document.createElement('div');
        div.className = 'section-blueprint';
        div.setAttribute('data-label', sec.label);
        
        // Mock generation using keywords
        let dynamicTitle = sec.title;
        let dynamicDesc = sec.desc;

        if (index === 0) dynamicTitle = `[${product}] - ${sec.title}`;
        if (index === 1) dynamicDesc = `"${pain}" 이라는 고통을 ${product}가 해결해 주는 과정을 상세히 묘사하세요. ` + sec.desc;

        div.innerHTML = `
            <h4>${dynamicTitle}</h4>
            <p>${dynamicDesc}</p>
        `;
        content.appendChild(div);
    });

    window.scrollTo({ top: resultPanel.offsetTop - 100, behavior: 'smooth' });
}

function copyFullBlueprint() {
    const text = document.getElementById('blueprintContent').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("제국의 상세페이지 청사진이 복사되었습니다. 이제 실전 제작으로 넘어가십시오.");
    });
}
