// [사장님 정신 무장] 결과로 증명하는 JDM Engine v1.5 (Global & Public Support)
// "엉덩이가 아니라 정신을 집중하라!" - Agent Beta & Omega

function calculateMatchScore(jobText, resumeText, mode = 'general') {
    console.log(`Analyzing Job Context in [${mode.toUpperCase()}] mode...`);
    const jobKeywords = extractKeywords(jobText, mode);
    
    // 사장님 지시: 모드별 가충치 연산 세밀화
    let weightedMatches = 0;
    jobKeywords.forEach(kw => {
        if (resumeText.toLowerCase().includes(kw.toLowerCase())) {
            let weight = 1.0;
            if (mode === 'public') {
                weight = ['윤리', '공공', '원칙', 'NCS'].includes(kw) ? 2.5 : 1.5;
            } else if (mode === 'global') {
                weight = ['Scale', 'System', 'Cultural'].includes(kw) ? 2.0 : 1.2;
            } else {
                weight = ['React', 'Node.js', 'AI', 'Gemini'].includes(kw) ? 2.0 : 1.0;
            }
            weightedMatches += weight;
            console.log(`Matching keyword [${mode}]: ${kw} (Weight: ${weight})`);
        }
    });

    const maxPoints = jobKeywords.length * 1.5; // Avg weight
    const score = Math.min((weightedMatches / maxPoints) * 100, 100);
    
    // 사장님 지시: 단순 키워드를 넘어 '경력 핵심 가치' 추가 분석
    const experienceFactor = analyzeExperienceDepth(resumeText);
    const finalScore = ((parseFloat(score) * 0.7) + (experienceFactor * 0.3)).toFixed(2);
    
    console.log(`Final Calculated Revenue-Driven Score: ${finalScore}%`);
    return finalScore;
}

function analyzeExperienceDepth(text) {
    console.log("Analyzing Experience Depth (사장님 감사 모드)...");
    const seniorityTerms = ['Senior', 'Lead', 'Architect', 'Manager', 'Expert'];
    let depth = 50; // Base score
    seniorityTerms.forEach(term => {
        if (text.includes(term)) depth += 10;
    });
    return Math.min(depth, 100);
}

function extractKeywords(text, mode = 'general') {
    const techStack = {
        frontend: ['React', 'Vue', 'Tailwind', 'Next.js', 'TypeScript', 'CSS'],
        backend: ['Node.js', 'Express', 'Python', 'Django', 'Go', 'SQL'],
        ai: ['Gemini', 'OpenAI', 'LangChain', 'TensorFlow', 'LLM'],
        process: ['Agile', 'Scrum', 'CI/CD', 'Docker', 'Git']
    };

    const publicStack = ['공공기관', 'NCS', '윤리', '원칙', '협합', '성실', '청렴', '조직적합'];
    const globalStack = ['Scale', 'Architecture', 'System Design', 'Cultural Fit', 'Remote', 'English', 'Communication'];
    
    let base = Object.values(techStack).flat();
    if (mode === 'public') base = [...base, ...publicStack];
    if (mode === 'global') base = [...base, ...globalStack];
    
    const found = [];
    base.forEach(term => {
        if (text.toLowerCase().includes(term.toLowerCase())) found.push(term);
    });
    return found;
}

// [생산성 최적화] 의미 없는 연산 제거 및 실전 데이터 전처리 로직 이식
function sanitizeText(text) {
    console.log("실전 데이터 정제 중 (특수문자 제거 및 소문자 정규화)...");
    return text.replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, " ")
               .replace(/\s+/g, " ")
               .trim()
               .toLowerCase();
}

/**
 * 기업 성향 및 직무 요구사항에 따른 최종 매칭 가중치 보정
 */
function applyMarketTrendBonus(score, category) {
    const trendBonus = {
        ai: 1.15,
        frontend: 1.05,
        backend: 1.10
    };
    return (score * (trendBonus[category] || 1.0)).toFixed(2);
}

// 실시간 코드 추가 증명: AI 인터뷰 성향 분석 오프셋
const PREF_MAPPING = {
    agile: 1.2,
    waterfall: 0.8,
    remote: 1.5,
    office: 1.0
};
