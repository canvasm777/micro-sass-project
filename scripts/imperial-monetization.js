/**
 * KODARI EMPIRE - Global Monetization & PPP Lock
 * Phase 21: Wealth Foundation
 */

const PPP_CONFIG = {
    'KR': { currency: '₩', symbol: 'KRW', pppFactor: 1300, format: 'ko-KR' },
    'US': { currency: '$', symbol: 'USD', pppFactor: 1, format: 'en-US' },
    'JP': { currency: '¥', symbol: 'JPY', pppFactor: 150, format: 'ja-JP' },
    'DE': { currency: '€', symbol: 'EUR', pppFactor: 0.92, format: 'de-DE' },
    'DEFAULT': { currency: '$', symbol: 'USD', pppFactor: 1, format: 'en-US' }
};

const PRODUCT_PRICES = {
    'content-chef': 29.9,
    'sns-spark': 19.9
};

function lockGlobalMonetization() {
    console.log("%c[SYSTEM] 제국 글로벌 경제망 스캔 중...", "color: #d4af37; font-weight: bold;");
    
    // 이 시뮬레이션에서는 브라우저 언어 기반으로 지역을 추정합니다.
    const lang = navigator.language || 'en-US';
    let region = 'DEFAULT';
    
    if (lang.startsWith('ko')) region = 'KR';
    else if (lang.startsWith('ja')) region = 'JP';
    else if (lang.startsWith('de')) region = 'DE';
    else if (lang.startsWith('en-US')) region = 'US';

    const config = PPP_CONFIG[region];
    applyRegionalPricing(config);
}

function applyRegionalPricing(config) {
    const priceElements = document.querySelectorAll('.price-val');
    
    priceElements.forEach(el => {
        const basePrice = el.dataset.basePrice || (el.innerText.match(/\d+\.\d+/)?.[0]) || 20;
        if (!el.dataset.basePrice) el.dataset.basePrice = basePrice;

        let finalPrice = (parseFloat(basePrice) * config.pppFactor);
        
        // 원화의 경우 천 단위 절삭/반올림 처리
        if (config.symbol === 'KRW') {
            finalPrice = Math.round(finalPrice / 100) * 100;
        }

        const formattedPrice = new Intl.NumberFormat(config.format, {
            style: 'currency',
            currency: config.symbol,
            minimumFractionDigits: config.symbol === 'KRW' ? 0 : 2
        }).format(finalPrice);

        el.innerHTML = `${formattedPrice}<span>/month</span>`;
        console.log(`%c[ECONOMY] 지역 최적화 가격 선언: ${formattedPrice} (${config.symbol})`, "color: #d4af37;");
    });
}

window.addEventListener('DOMContentLoaded', lockGlobalMonetization);
