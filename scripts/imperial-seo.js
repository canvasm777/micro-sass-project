/**
 * KODARI EMPIRE - Imperial SEO & Traffic Hijack Engine
 * Phase 22: The Great Hijack
 */

const SEO_CONFIG = {
    title: "Kodari Empire | Imperial AI Business OS",
    description: "당신의 비즈니스를 지배할 단 하나의 지성. 코다리 제국은 사장님의 직관을 가장 정밀한 명령으로 변환합니다.",
    keywords: "AI 마케팅, 쇼츠 생성기, 로또 명당, 비즈니스 타로, 마이크로 SaaS",
    url: "https://your-empire-domain.com",
    image: "/assets/images/chef-hero.png"
};

function injectSovereignMeta() {
    console.log("%c[SYSTEM] 제국 SEO 최적화 엔진 가동...", "color: #d4af37; font-weight: bold;");

    // 1. Basic Meta Tags
    const metaData = {
        "description": SEO_CONFIG.description,
        "keywords": SEO_CONFIG.keywords,
        "author": "Kodari Empire",
        "robots": "index, follow"
    };

    for (const [name, content] of Object.entries(metaData)) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    // 2. OpenGraph (Facebook/SNS)
    const ogData = {
        "og:title": SEO_CONFIG.title,
        "og:description": SEO_CONFIG.description,
        "og:type": "website",
        "og:url": window.location.href,
        "og:image": SEO_CONFIG.image
    };

    for (const [prop, content] of Object.entries(ogData)) {
        let meta = document.querySelector(`meta[property="${prop}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', prop);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    // 3. Twitter Cards
    const twitterData = {
        "twitter:card": "summary_large_image",
        "twitter:title": SEO_CONFIG.title,
        "twitter:description": SEO_CONFIG.description,
        "twitter:image": SEO_CONFIG.image
    };

    for (const [name, content] of Object.entries(twitterData)) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    // 4. Schema.org (JSON-LD)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kodari Empire",
        "description": SEO_CONFIG.description,
        "url": SEO_CONFIG.url,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "19.90",
            "priceCurrency": "USD"
        }
    };
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    console.log("%c[TRAFFIC] 검색 엔진 지배를 위한 메타 각인이 완료되었습니다. 🫡", "color: #d4af37;");
}

// 5. Traffic Hijack Bridge (Viral Floating Widget)
function summonViralBridge() {
    const bridge = document.createElement('div');
    bridge.id = 'imperial-bridge';
    bridge.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 10000;
        background: #000; border: 1px solid #d4af37; padding: 10px 20px;
        color: #d4af37; font-family: 'Montserrat', sans-serif; font-size: 0.7rem;
        letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); transition: 0.3s;
        display: flex; align-items: center; gap: 10px;
    `;
    bridge.innerHTML = `<i class="fa-solid fa-crown"></i> EMPIRE DECREE: GET FREE ACCESS`;
    
    bridge.onmouseover = () => bridge.style.transform = 'translateY(-5px)';
    bridge.onmouseout = () => bridge.style.transform = 'translateY(0)';
    bridge.onclick = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("사장님의 비즈니스를 지배하는 지성, 코다리 제국에 합류하십시오.");
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        alert("제국의 명령이 SNS에 전파되었습니다. 무지한 자들에게 지혜를 전해주셔서 감사합니다. 🫡");
    };

    document.body.appendChild(bridge);
}

window.addEventListener('load', () => {
    injectSovereignMeta();
    summonViralBridge();
});
