/**
 * Kazakhstan Investment Explorer - Application Logic
 * Author: Antigravity AI
 */

// -------------------------------------------------------------
// 1. City Master Data Repository
// -------------------------------------------------------------
let CITY_DATABASE = {
    almaty: {
        name: "阿拉木图 (Almaty)",
        summary: "哈萨克斯坦第一大城市与经济/金融/消费中心，贡献全国 GDP 的 20%+，消费力强劲，适合商业地产、金融服务与消费品牌扩张。",
        population: "约 236 万人 (全哈第一)",
        gdpContribution: "全国 GDP 约 20% 以上",
        mainIndustry: "金融服务 · 现代商业 · 跨境贸易 · 自然旅游",
        tags: ["金融中心", "商业中心", "消费中心", "旅游门户"],
        salary: {
            kzt: "40万 - 45万 坚戈/月",
            rmb: "约 5,700 - 6,400 RMB/月"
        },
        incomeDist: [20, 55, 25], // 普通消费 %, 中产 %, 高端 %
        realEstate: {
            newPrice: "45万 - 120万 KZT/㎡ (6,400 - 17,000 RMB/㎡)",
            oldPrice: "约 70万 KZT/㎡ (约 10,000 RMB/㎡)",
            yield: "8.5% - 11.2%",
            growth: "+12.4%"
        },
        districts: [
            { name: "Medeu (麦迪奥区)", tag: "富人豪宅区", feat: "背靠山景、顶奢豪宅集中、资产保值强、国际学校配套完整", color: "gold" },
            { name: "Bostandyk (波斯坦迪克区)", tag: "中产核心区", feat: "优质教育资源、大型商业集中、年轻高薪群体汇聚", color: "cyan" },
            { name: "Almaly (阿尔马利区)", tag: "老城商业核心", feat: "历史文化底蕴深、传统商圈成熟、步行街客流大", color: "blue" },
            { name: "Alatau (阿拉套区)", tag: "未来扩展新区", feat: "政府重点规划土地扩张、工业园与物流仓储集聚地", color: "purple" }
        ],
        malls: [
            { name: "Dostyk Plaza", tag: "中高端主力商场", desc: "位于 Bostandyk 核心，汇聚 Fast-Fashion 与轻奢品牌，客流量极大。" },
            { name: "Esentai Mall", tag: "顶奢购物中心", desc: "包揽 LV、Gucci、Ritz-Carlton 酒店，哈萨克斯坦顶层富豪消费地标。" },
            { name: "Arbat 步行街", tag: "大众潮流与年轻地标", desc: "露天商业街区，独立咖啡馆、中餐品牌与年轻人聚集地。" }
        ],
        industryTree: {
            root: "阿拉木图经济引擎",
            branches: [
                { title: "金融 (Finance)", items: ["商业银行总部", "投资机构/PE/VC", "FinTech 电子支付"] },
                { title: "贸易 (Trade)", items: ["中国轻工集散", "供应链仓储物流", "大宗商品进口"] },
                { title: "旅游 (Tourism)", items: ["Shymbulak 滑雪场", "高端商务会展", "生态探险线路"] },
                { title: "科技 (Tech)", items: ["IT 软件外包", "AI 应用研发", "跨境电商服务"] }
            ]
        },
        risks: [
            { name: "政治与政策风险", star: "★★☆☆☆", badge: "low", desc: "政治局势稳定，但需留意外籍劳务配额法规。" },
            { name: "汇率变动风险", star: "★★★☆☆", badge: "mid", desc: "坚戈对美元汇率存在一定波动风险。" },
            { name: "法律合规风险", star: "★★★☆☆", badge: "mid", desc: "劳动法保护倾向当地工人，合同需经律师严审。" },
            { name: "合作伙伴信用风险", star: "★★★★☆", badge: "high", desc: "务必进行尽职调查，切忌一次性全额付款。" },
            { name: "市场规模有限风险", star: "★★★☆☆", badge: "mid", desc: "城市人口 230 万，单一赛道容量易饱和。" }
        ]
    },

    astana: {
        name: "阿斯塔纳 (Astana)",
        summary: "哈萨克斯坦首都与行政政治中心，享有 AIFC 阿斯塔纳国际金融中心特区优惠政策，主打大型基建、政府采招与特区金融。",
        population: "约 140 万人",
        gdpContribution: "全国 GDP 约 11%",
        mainIndustry: "行政总部 · 金融特区 (AIFC) · 建筑工程 · 能源央企",
        tags: ["国家首都", "金融特区", "基建枢纽", "政治中心"],
        salary: {
            kzt: "45万 - 52万 坚戈/月",
            rmb: "约 6,400 - 7,400 RMB/月"
        },
        incomeDist: [15, 60, 25],
        realEstate: {
            newPrice: "50万 - 110万 KZT/㎡ (7,100 - 15,700 RMB/㎡)",
            oldPrice: "约 65万 KZT/㎡ (约 9,300 RMB/㎡)",
            yield: "7.8% - 10.0%",
            growth: "+10.2%"
        },
        districts: [
            { name: "Yesil (伊斯尔区)", tag: "新城政治核心", feat: "总统府、各部委大楼与 AIFC 特区所在地，高端写字楼云集", color: "gold" },
            { name: "Almaty District (Astana)", tag: "行政配套区", feat: "国家博物馆、大型会展中心与外籍领事馆区域", color: "cyan" },
            { name: "Saryarka (萨里阿卡区)", tag: "老城区核心", feat: "商业成熟、生活配套完善、高性价比住区", color: "blue" },
            { name: "Baikonur (拜科努尔区)", tag: "新开发区", feat: "政府规划工业园区、物流中转中心", color: "purple" }
        ],
        malls: [
            { name: "Khan Shatyr (汗帐商场)", tag: "世界最大帐篷建筑", desc: "英国名家设计，涵盖室内沙滩与全天候商业体验。" },
            { name: "Mega Silk Way", tag: "世博会体量商场", desc: "毗邻世博园区与 AIFC，涵盖大型零售与国际品牌。" },
            { name: "Abu Dhabi Plaza", tag: "中亚第一高楼商业区", desc: "集超甲级写字楼、奢华酒店与高端购物中心于一体。" }
        ],
        industryTree: {
            root: "阿斯塔纳行政与金融引擎",
            branches: [
                { title: "AIFC 金融特区", items: ["普通法系法院", "税收优惠企业", "资产管理 & 证券"] },
                { title: "基建与工程", items: ["政府 PPP 项目", "城市更新工程", "绿色能源建筑"] },
                { title: "数字政府与 IT", items: ["Astana Hub 科技园", "智慧城市解决方案", "GovTech"] },
                { title: "总部经济", items: ["石油矿产央企总部", "跨国公司中亚分公司", "外交使领馆服务"] }
            ]
        },
        risks: [
            { name: "政治与政策风险", star: "★★☆☆☆", badge: "low", desc: "政府机构所在地，政策透明度高。" },
            { name: "气候极寒风险", star: "★★★★☆", badge: "high", desc: "冬季长达6个月极端寒冷，影响工程施工期。" },
            { name: "法律合规风险", star: "★★☆☆☆", badge: "low", desc: "AIFC 采用英国普通法，国际投资者维权成本较低。" },
            { name: "合作伙伴信用风险", star: "★★★☆☆", badge: "mid", desc: "国企背景项目多，审批流程较长。" },
            { name: "市场规模有限风险", star: "★★★☆☆", badge: "mid", desc: "人口规模不及阿拉木图，大众消费力略弱。" }
        ]
    },

    horgos: {
        name: "霍尔果斯 (Horgos)",
        summary: "中哈边境最大陆路自由贸易口岸与跨境合作中心，享受免签 30 天与保税物流优惠，是跨境电商与中转仓储首选。",
        population: "约 8 万人 (常住+流动商户)",
        gdpContribution: "跨境贸易枢纽",
        mainIndustry: "跨境电商 · 保税仓储 · 清关物流 · 边境加工",
        tags: ["免签自贸区", "陆路口岸", "中转物流", "跨境电商"],
        salary: {
            kzt: "30万 - 38万 坚戈/月",
            rmb: "约 4,300 - 5,400 RMB/月"
        },
        incomeDist: [40, 50, 10],
        realEstate: {
            newPrice: "25万 - 45万 KZT/㎡ (3,500 - 6,400 RMB/㎡)",
            oldPrice: "约 20万 KZT/㎡ (约 2,800 RMB/㎡)",
            yield: "12.0% - 15.0%",
            growth: "+18.5%"
        },
        districts: [
            { name: "ICBC 合作中心区", tag: "中哈边境自贸区", feat: "凭入馆证免签出入境，中哈商户面对面自由交易", color: "gold" },
            { name: "无水港 (Dry Port)", tag: "铁路换轨枢纽", feat: "中欧班列准轨转宽轨核心节点，日吞吐量巨大", color: "cyan" },
            { name: "保税物流园区", tag: "跨境仓储中心", feat: "享受出口退税、保税加工与快速清关通道", color: "blue" },
            { name: "边境配套服务区", tag: "商旅与商务区", feat: "酒店、餐饮及中国企业驻前线办事处", color: "purple" }
        ],
        malls: [
            { name: "中哈免税购物中心", tag: "跨境免税店", desc: "主营欧洲化妆品、哈国巧克力、中国电子产品。" },
            { name: "国际物流分拨中心", tag: "仓储物流地标", desc: "中欧班列货物拼箱与转运大型集散基地。" },
            { name: "边境贸易展示馆", tag: "B2B 展销中心", desc: "中国制造机械设备与轻工消费品常年展销。" }
        ],
        industryTree: {
            root: "霍尔果斯口岸经济引擎",
            branches: [
                { title: "跨境物流", items: ["中欧班列换轨", "公路卡班快运", "冷链物流仓储"] },
                { title: "边境贸易", items: ["免税商品零售", "大宗农产品进口", "二手车出口"] },
                { title: "保税加工", items: ["粮油深加工", "纺织面料分拣", "电子零配件组装"] },
                { title: "商务服务", items: ["报关清关代办", "跨境结算中介", "仓储租赁服务"] }
            ]
        },
        risks: [
            { name: "地缘与口岸拥堵风险", star: "★★★☆☆", badge: "mid", desc: "旺季口岸换轨与清关偶有排队拥堵。" },
            { name: "海关政策变动风险", star: "★★★★☆", badge: "high", desc: "两国海关归类与关税税率调整影响利润。" },
            { name: "法律合规风险", star: "★★☆☆☆", badge: "low", desc: "自贸区政策清晰，但须严格遵守双边报关。" },
            { name: "合作伙伴信用风险", star: "★★★☆☆", badge: "mid", desc: "边贸货代公司质量参差不齐。" },
            { name: "生活配套风险", star: "★★★☆☆", badge: "mid", desc: "城市配套较小，缺乏高端医疗与教育。" }
        ]
    },

    shymkent: {
        name: "奇姆肯特 (Shymkent)",
        summary: "哈萨克斯坦第三大直辖市与南部人口密集区，农业与轻工业发达，劳动力成本低，是纺织与食品加工投资宝地。",
        population: "约 120 万人",
        gdpContribution: "全国 GDP 约 8%",
        mainIndustry: "农业加工 · 纺织服装 · 医药制造 · 贸易集散",
        tags: ["第三大城市", "人口红利", "轻工基地", "农业枢纽"],
        salary: {
            kzt: "28万 - 35万 坚戈/月",
            rmb: "约 4,000 - 5,000 RMB/月"
        },
        incomeDist: [50, 40, 10],
        realEstate: {
            newPrice: "30万 - 55万 KZT/㎡ (4,300 - 7,800 RMB/㎡)",
            oldPrice: "约 25万 KZT/㎡ (约 3,500 RMB/㎡)",
            yield: "9.0% - 11.5%",
            growth: "+9.0%"
        },
        districts: [
            { name: "Al-Farabi (法拉比区)", tag: "城市中心", feat: "市政机关、商业街区与教育机构集中地", color: "gold" },
            { name: "Ontustik 工业园区", tag: "轻工特区", feat: "棉花纺织、服饰加工与政府地税优惠工业园区", color: "cyan" },
            { name: "Karatau (卡拉套区)", tag: "新城宜居区", feat: "规划新建住宅区、基础设施逐步改善", color: "blue" },
            { name: "Abay (阿拜区)", tag: "农产品交易区", feat: "南哈萨克斯坦水果与肉类集中批发交易市场", color: "purple" }
        ],
        malls: [
            { name: "Shymkent Plaza", tag: "南部顶尖购物中心", desc: "市中心现代商业综合体，聚合国际餐饮与影院。" },
            { name: "Mega Planet Shymkent", tag: "主流家庭消费地标", desc: "高人气购物娱乐中心，适合连锁品牌入驻。" },
            { name: "Samal 集市", tag: "中亚传统露天大巴扎", desc: "服装、农产品与日用品大型批发集散地。" }
        ],
        industryTree: {
            root: "奇姆肯特轻工农业引擎",
            branches: [
                { title: "农业加工", items: ["食用油榨取", "面粉与面食加工", "肉类与乳制品"] },
                { title: "纺织服装", items: ["棉花种植与纺纱", "服装定做出口", "皮革加工"] },
                { title: "医药制造", items: ["SANTO 药企基地", "医疗器械组装", "草药提炼"] },
                { title: "商贸物流", items: ["辐射塔什干(乌国)", "中亚干线卡车运输", "建材批发"] }
            ]
        },
        risks: [
            { name: "政治与政策风险", star: "★★☆☆☆", badge: "low", desc: "地方政府极度鼓励制造业外资落户。" },
            { name: "技术工人缺乏风险", star: "★★★☆☆", badge: "mid", desc: "普通劳动力充足，但中高端管理人才较缺乏。" },
            { name: "消费客单价较低风险", star: "★★★☆☆", badge: "mid", desc: "客单价低于阿拉木图，高端品牌不宜过早进入。" },
            { name: "合作伙伴信用风险", star: "★★★☆☆", badge: "mid", desc: "家族式企业多，决策依赖人际关系。" },
            { name: "汇率风险", star: "★★★☆☆", badge: "mid", desc: "坚戈变动影响进口原材料成本。" }
        ]
    },

    aktau: {
        name: "阿克套 (Aktau)",
        summary: "位于里海东岸的石油重镇与哈萨克斯坦唯一深水海港，是“跨里海国际运输通道 (TITR)”的核心枢纽与新能源矿产基地。",
        population: "约 22 万人",
        gdpContribution: "油气资源高产区",
        mainIndustry: "石油天然气 · 海港物流 · 新能源 (绿氢) · 滨海旅游",
        tags: ["里海独家港口", "石油重镇", "跨里海通道", "绿氢基地"],
        salary: {
            kzt: "45万 - 60万 坚戈/月",
            rmb: "约 6,400 - 8,500 RMB/月 (高薪油气区)",
            incomeDist: [20, 50, 30]
        },
        incomeDist: [20, 50, 30],
        realEstate: {
            newPrice: "35万 - 70万 KZT/㎡ (5,000 - 10,000 RMB/㎡)",
            oldPrice: "约 28万 KZT/㎡ (约 4,000 RMB/㎡)",
            yield: "9.5% - 13.0%",
            growth: "+14.1%"
        },
        districts: [
            { name: "海滨第一排 (Seaside)", tag: "度假与高档公寓", feat: "里海无敌海景、高端酒店与高薪油气高管社区", color: "gold" },
            { name: "SEZ Morport Aktau", tag: "海港经济特区", feat: "零关税、零房产税海港加工与物流园区", color: "cyan" },
            { name: "老城区 (Micro-districts 1-15)", tag: "成熟居住区", feat: "苏联规划街区、生活极其便捷", color: "blue" },
            { name: "新城新区 (Micro-districts 30+)", tag: "城市扩建区", feat: "住宅与市政公用设施快速建设区", color: "purple" }
        ],
        malls: [
            { name: "Aktau Plaza", tag: "滨海购物中心", desc: "阿克套最新大型商业体，提供海景餐饮与影院。" },
            { name: "Astana Shopping Mall", tag: "传统市中心地标", desc: "当地高薪油气家庭主要日常购物场所。" },
            { name: "Rixos Water World", tag: "顶奢滨海度假村", desc: "里海全包式五星度假酒店，带动高品质消费。" }
        ],
        industryTree: {
            root: "阿克套里海海洋经济引擎",
            branches: [
                { title: "油气与矿产", items: ["里海油田服务", "管道工程建设", "铀矿与稀土运输"] },
                { title: "跨里海物流", items: ["Aktau 国际集装箱港", "阿塞拜疆/巴库集装箱轮渡", "TITR 欧亚通道"] },
                { title: "新能源 (绿氢)", items: ["德国Svevind绿氢项目", "大型光伏与风电", "海水淡化工程"] },
                { title: "滨海旅游", items: ["里海沙滩度假村", "芒格斯套奇特地质游", "游艇与水上运动"] }
            ]
        },
        risks: [
            { name: "单一产业依赖风险", star: "★★★★☆", badge: "high", desc: "经济随国际原油价格大起大落。" },
            { name: "淡水资源匮乏风险", star: "★★★☆☆", badge: "mid", desc: "依靠海水淡化，工业用水成本较高。" },
            { name: "物流运力瓶颈风险", star: "★★★☆☆", badge: "mid", desc: "里海轮渡船只有限，高峰期有压港现象。" },
            { name: "合作伙伴信用风险", star: "★★★☆☆", badge: "mid", desc: "油气承包商账期较长。" },
            { name: "环境与气候风险", star: "★★☆☆☆", badge: "low", desc: "夏季炎热干燥，需做好防暑防风沙。" }
        ]
    }
};

// Global Interactive States
let currentCityKey = 'almaty';
let selectedCapital = 'small';
let selectedRisk = 'low';
let radarChartInstance = null;
let incomeChartInstance = null;
let PORTFOLIO = null;
let SCORECARD = null;
let SOURCE_REGISTRY = null;
let PROJECT_PIPELINE = null;
let COUNTRY_PROFILE = null;
let COUNTRY_INTELLIGENCE = null;
let MAP_STATE = { scale: 1, x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 };

// -------------------------------------------------------------
// 2. Initialization & Charts Setup
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([hydrateAstanaResearchData(), hydrateDecisionData()]);
    initRadarChart();
    initIncomeChart();
    switchCity('almaty');
    setupFilterEvents();
    renderDecisionWorkspace();
    renderProjectPipeline();
    renderCountryDossier();
    renderCountryIntelligence();
    renderInvestmentReadiness();
    renderInternationalInvestment();
    initAdministrativeMap();
});

async function hydrateAstanaResearchData() {
    try {
        const response = await fetch('./data/cities/astana.json');
        if (!response.ok) throw new Error(`Unable to load Astana research data: ${response.status}`);

        const research = await response.json();
        const indicators = research.indicators;
        const astana = CITY_DATABASE.astana;

        astana.name = `${research.name.zh} (${research.name.en})`;
        astana.summary = research.positioning;
        astana.population = `${indicators.population.value.toLocaleString('zh-CN')} 人（${research.asOf}）`;
        astana.gdpContribution = `全国 GDP ${indicators.nationalGdpShare.value}%（${indicators.nationalGdpShare.period}）`;
        astana.research = research;
    } catch (error) {
        console.warn('Astana research data was not loaded; showing the bundled fallback.', error);
    }
}

async function hydrateDecisionData() {
    try {
        const [portfolioResponse, scorecardResponse, sourceResponse, projectResponse, countryResponse, intelligenceResponse] = await Promise.all([
            fetch('./data/cities/portfolio.json?v=handbook-20260730'),
            fetch('./data/methodology/investment-scorecard.json'),
            fetch('./data/methodology/source-registry.json'),
            fetch('./data/projects/research-pipeline.json'),
            fetch('./data/countries/kazakhstan/profile.json?v=handbook-20260730'),
            fetch('./data/countries/kazakhstan/intelligence.json?v=handbook-20260730')
        ]);
        if (!portfolioResponse.ok || !scorecardResponse.ok || !sourceResponse.ok || !projectResponse.ok || !countryResponse.ok || !intelligenceResponse.ok) {
            throw new Error('One or more decision data files could not be loaded.');
        }

        PORTFOLIO = await portfolioResponse.json();
        SCORECARD = await scorecardResponse.json();
        SOURCE_REGISTRY = await sourceResponse.json();
        PROJECT_PIPELINE = await projectResponse.json();
        COUNTRY_PROFILE = await countryResponse.json();
        COUNTRY_INTELLIGENCE = await intelligenceResponse.json();

        PORTFOLIO.cities.forEach(profile => {
            const city = CITY_DATABASE[profile.id];
            if (!city) return;

            city.research = profile;
            city.name = `${profile.name} (${profile.nameEn})`;
            city.summary = profile.summary;
            city.population = profile.population
                ? `${profile.population.value.toLocaleString('zh-CN')} 人（${profile.population.asOf}）`
                : '不适用：走廊/港口节点采用项目级口径';
            city.gdpContribution = profile.economicRole;
            city.tags = profile.tags;
        });
    } catch (error) {
        console.warn('Decision workspace data was not loaded; showing the bundled fallback.', error);
    }
}

function getResearchCity(cityId) {
    return PORTFOLIO?.cities.find(city => city.id === cityId) || null;
}

function researchStatusLabel(status) {
    const labels = {
        'official-core-data': '城市概览',
        'corridor-level-data': '跨境走廊概览',
        'port-and-region-data-pending': '港口城市概览'
    };
    return labels[status] || '城市概览';
}

function renderCountryDossier() {
    const container = document.getElementById('country-dossier');
    if (!container || !COUNTRY_PROFILE || !SOURCE_REGISTRY) return;

    const sourceLinks = sourceIds => {
        const sources = sourceIds.map(id => SOURCE_REGISTRY.sources.find(source => source.id === id)).filter(Boolean);
        if (!sources.length) return '';
        return `<div class="country-source-line"><i class="fa-solid fa-link"></i> 依据：${sources.map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.publisher}</a>`).join(' · ')}</div>`;
    };

    const facts = COUNTRY_PROFILE.facts.map(fact => `
        <article class="country-fact">
            <i class="fa-solid ${fact.icon}"></i>
            <span class="country-fact-label">${fact.label}</span>
            <strong>${fact.value}</strong>
            <p>${fact.note}</p>
            ${sourceLinks(fact.sources)}
        </article>`).join('');

    const sections = COUNTRY_PROFILE.sections.map(section => `
        <article class="country-dossier-card" id="country-${section.id}">
            <h3><i class="fa-solid ${section.icon}"></i> ${section.title}</h3>
            ${section.entries.map(entry => `
                <div class="country-entry">
                    <h4>${entry.title}</h4>
                    <p>${entry.body}</p>
                    ${sourceLinks(entry.sources)}
                </div>`).join('')}
        </article>`).join('');

    container.innerHTML = `
        <div class="country-dossier-intro">
            <div>
                <span class="eyebrow">${COUNTRY_PROFILE.hero.eyebrow}</span>
                <h3>${COUNTRY_PROFILE.hero.title}</h3>
                <p>${COUNTRY_PROFILE.hero.summary}</p>
            </div>
            <div class="country-update-note"><i class="fa-solid fa-clock-rotate-left"></i> 数据更新：${COUNTRY_PROFILE.updatedAt}<br>预测数据已单独标示</div>
        </div>
        <div class="country-fact-grid">${facts}</div>
        <div class="country-dossier-grid">${sections}</div>
    `;
}

function renderCountryIntelligence() {
    if (!COUNTRY_INTELLIGENCE || !SOURCE_REGISTRY) return;
    const sourceLinks = sourceIds => sourceIds.map(id => SOURCE_REGISTRY.sources.find(source => source.id === id)).filter(Boolean)
        .map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.publisher}</a>`).join(' · ');

    const policyCenter = document.getElementById('policy-center');
    const taxSnapshot = document.getElementById('tax-snapshot');
    const macroGrid = document.getElementById('macro-finance-grid');
    const riskGateGrid = document.getElementById('risk-gate-grid');
    const adminRoster = document.getElementById('admin-roster');
    const cadence = document.getElementById('update-cadence');
    const cityCoverage = document.getElementById('city-coverage');
    const cityTemplate = document.getElementById('city-template');
    if (!policyCenter || !taxSnapshot || !macroGrid || !riskGateGrid || !adminRoster || !cadence || !cityCoverage || !cityTemplate) return;

    policyCenter.innerHTML = COUNTRY_INTELLIGENCE.policyCards.map(card => `
        <article class="policy-card">
            <div class="policy-card-head"><i class="fa-solid ${card.icon}"></i><span class="data-status pending">${card.status}</span></div>
            <h3>${card.title}</h3><p>${card.body}</p>
            <ul>${card.checks.map(check => `<li>${check}</li>`).join('')}</ul>
            <div class="country-source-line"><i class="fa-solid fa-link"></i> 依据：${sourceLinks(card.sources)}</div>
        </article>`).join('');

    taxSnapshot.innerHTML = COUNTRY_INTELLIGENCE.taxSnapshot.map(item => `
        <article class="tax-card"><span>${item.label}</span><strong>${item.value}</strong><p>${item.note}</p>
        <div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(item.sources)}</div></article>`).join('');

    macroGrid.innerHTML = COUNTRY_INTELLIGENCE.macroCards.map(card => `
        <article class="macro-finance-card">
            <div class="macro-finance-meta"><span>${card.type}</span><span>${card.asOf}</span></div>
            <span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p>
            <div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(card.sources)}</div>
        </article>`).join('');

    riskGateGrid.innerHTML = COUNTRY_INTELLIGENCE.riskGates.map(gate => `
        <article class="risk-gate-card ${gate.level}"><h3><i class="fa-solid fa-shield-halved"></i>${gate.title}</h3><p>${gate.body}</p></article>`).join('');

    adminRoster.innerHTML = COUNTRY_INTELLIGENCE.administrativeUnits.map((unit, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${unit}</span>`).join('');
    cadence.innerHTML = COUNTRY_INTELLIGENCE.updateCadence.map(item => `
        <div><strong>${item.topic}</strong><span>${item.cadence} · ${item.owner}</span><p>${item.action}</p></div>`).join('');
    cityCoverage.innerHTML = COUNTRY_INTELLIGENCE.cityCoverage.map(city => `
        <article class="city-coverage-card" data-city="${city.id}">
            <div class="city-coverage-head"><span>${city.type}</span><button type="button" data-city-action="${city.id}" onclick="switchCity('${city.id}'); scrollToSection('city-section')">查看城市档案</button></div>
            <h3>${city.name}</h3>
            <ul>${city.coverage.map(item => `<li>${item}</li>`).join('')}</ul>
            <p><strong>下一步：</strong>${city.next}</p>
            <div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(city.sources)}</div>
        </article>`).join('');
    cityTemplate.innerHTML = COUNTRY_INTELLIGENCE.cityTemplate.map(item => `
        <article class="city-template-card"><h3>${item.title}</h3><ul>${item.items.map(detail => `<li>${detail}</li>`).join('')}</ul></article>`).join('');
}

function renderInvestmentReadiness() {
    if (!COUNTRY_INTELLIGENCE || !SOURCE_REGISTRY) return;
    const readiness = document.getElementById('decision-readiness');
    const tracks = document.getElementById('diligence-tracks');
    const governance = document.getElementById('governance-controls');
    if (!readiness || !tracks || !governance) return;

    const sourceLinks = sourceIds => sourceIds.map(id => SOURCE_REGISTRY.sources.find(source => source.id === id)).filter(Boolean)
        .map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.publisher}</a>`).join(' · ');
    const readinessData = COUNTRY_INTELLIGENCE.decisionReadiness;

    readiness.innerHTML = `
        <div class="readiness-intro"><i class="fa-solid fa-circle-info"></i><p>${readinessData.intro}</p></div>
        <div class="readiness-grid">${readinessData.stages.map(stage => `
            <article class="readiness-card ${stage.level}">
                <span class="readiness-status">${stage.status}</span>
                <h3>${stage.title}</h3><p>${stage.body}</p>
            </article>`).join('')}</div>`;

    tracks.innerHTML = COUNTRY_INTELLIGENCE.diligenceTracks.map(track => `
        <article class="diligence-track ${track.priority.toLowerCase()}">
            <div class="diligence-track-head"><span class="priority-label">${track.priority}</span><span class="data-status pending">${track.status}</span></div>
            <div class="diligence-track-body">
                <div><h3>${track.title}</h3><p>${track.body}</p></div>
                <div class="diligence-evidence"><span>需要取得的证据</span><ul>${track.evidence.map(item => `<li>${item}</li>`).join('')}</ul></div>
                <div class="diligence-output"><span>交付物</span><strong>${track.output}</strong><div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(track.sources)}</div></div>
            </div>
        </article>`).join('');

    governance.innerHTML = COUNTRY_INTELLIGENCE.governanceControls.map(control => `
        <article class="governance-card"><i class="fa-solid fa-fingerprint"></i><div><h3>${control.title}</h3><p>${control.body}</p></div></article>`).join('');
}

function renderInternationalInvestment() {
    if (!COUNTRY_INTELLIGENCE?.internationalInvestment || !SOURCE_REGISTRY) return;
    const data = COUNTRY_INTELLIGENCE.internationalInvestment;
    const intro = document.getElementById('international-intro');
    const population = document.getElementById('international-population');
    const china = document.getElementById('china-footprint');
    const cities = document.getElementById('city-footprints');
    const projects = document.getElementById('enterprise-projects');
    if (!intro || !population || !china || !cities || !projects) return;

    const sourceLinks = sourceIds => sourceIds.map(id => SOURCE_REGISTRY.sources.find(source => source.id === id)).filter(Boolean)
        .map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.publisher}</a>`).join(' · ');
    const renderMetric = item => `
        <article class="international-card">
            <span>${item.label}</span><strong>${item.value}</strong><p>${item.note}</p>
            <div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(item.sources)}</div>
        </article>`;

    intro.innerHTML = `<i class="fa-solid fa-circle-info"></i><p>${data.intro}</p>`;
    population.innerHTML = data.populationCards.map(renderMetric).join('');
    china.innerHTML = data.chinaFootprint.map(renderMetric).join('');
    cities.innerHTML = data.cityFootprints.map(city => `
        <article class="city-footprint-card">
            <div class="city-footprint-head"><span>${city.type}</span><span>${city.asOf}</span></div>
            <h3>${city.city}</h3><strong>${city.metric}</strong><span class="city-footprint-label">${city.metricLabel}</span>
            <p>${city.note}</p><div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(city.sources)}</div>
        </article>`).join('');
    projects.innerHTML = data.projects.map(project => `
        <article class="enterprise-project-card">
            <div class="enterprise-project-head"><span>${project.city}</span><span class="data-status pending">${project.stage}</span></div>
            <h3>${project.company}</h3><div class="enterprise-project-meta"><span>${project.country}</span><span>${project.sector}</span></div>
            <p>${project.disclosure}</p><div class="country-source-line"><i class="fa-solid fa-link"></i> ${sourceLinks(project.sources)}</div>
        </article>`).join('');
}

const ADMIN_REGION_NAMES = {
    'KZ-ALM': '阿拉木图州', 'KZ-AKM': '阿克莫拉州', 'KZ-AKT': '阿克托别州',
    'KZ-ATY': '阿特劳州', 'KZ-ZAP': '西哈萨克斯坦州', 'KZ-KAR': '卡拉干达州',
    'KZ-KUS': '科斯塔奈州', 'KZ-KZY': '克孜勒奥尔达州', 'KZ-MAN': '曼格斯套州',
    'KZ-PAV': '巴甫洛达尔州', 'KZ-SEV': '北哈萨克斯坦州', 'KZ-YUZ': '南哈萨克斯坦州（现突厥斯坦州）',
    'KZ-VOS': '东哈萨克斯坦州', 'KZ-ZHA': '江布尔州', 'KZ-ALA': '阿拉木图市', 'KZ-AST': '阿斯塔纳市'
};

const MAP_CITIES = {
    almaty: { longitude: 76.8897, latitude: 43.2389 },
    astana: { longitude: 71.4304, latitude: 51.1282 },
    horgos: { longitude: 80.42, latitude: 44.23 },
    shymkent: { longitude: 69.5901, latitude: 42.3155 },
    aktau: { longitude: 51.1694, latitude: 43.6511 }
};

async function initAdministrativeMap() {
    const container = document.getElementById('administrative-map');
    if (!container) return;

    try {
        const response = await fetch('./data/maps/kazakhstan-adm1.geojson');
        if (!response.ok) throw new Error(`Map data could not be loaded: ${response.status}`);
        const geojson = await response.json();
        const bounds = getGeoBounds(geojson.features);
        const project = createMapProjection(bounds, 1000, 600, 28);
        const regionPaths = geojson.features.map(feature => {
            const name = ADMIN_REGION_NAMES[feature.properties.shapeISO] || feature.properties.shapeName;
            return `<path class="admin-region" data-name="${name}" d="${geometryToPath(feature.geometry, project)}"></path>`;
        }).join('');
        const cityMarkers = Object.entries(MAP_CITIES).map(([cityKey, point]) => {
            const city = CITY_DATABASE[cityKey];
            const position = project(point.longitude, point.latitude);
            return `<g class="admin-city-marker" data-city="${cityKey}" transform="translate(${position.x.toFixed(1)}, ${position.y.toFixed(1)})" role="button" tabindex="0" aria-label="查看${city.name}投资档案">
                <circle class="admin-city-pulse"></circle><circle class="admin-city-dot"></circle>
                <text class="admin-city-label" x="12" y="5">${city.name}</text>
            </g>`;
        }).join('');

        container.innerHTML = `
            <div class="map-controls" aria-label="地图缩放控件">
                <button type="button" data-map-action="zoom-in" aria-label="放大地图">+</button>
                <button type="button" data-map-action="zoom-out" aria-label="缩小地图">−</button>
                <button type="button" data-map-action="reset" aria-label="重置地图">重置</button>
            </div>
            <div class="map-hint">滚轮缩放 · 拖动平移 · 点行政区查看 · 点城市下钻</div>
            <svg class="administrative-map-svg" viewBox="0 0 1000 600" role="img" aria-label="哈萨克斯坦一级行政区地图">
                <g id="administrative-map-viewport">${regionPaths}${cityMarkers}</g>
            </svg>`;
        container.classList.add('is-ready');
        document.querySelector('.kaz-svg-map')?.classList.add('fallback-map');
        bindAdministrativeMapEvents(container);
    } catch (error) {
        console.warn('Administrative map was not loaded; showing the fallback map.', error);
    }
}

function getGeoBounds(features) {
    const bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
    const visit = coordinates => {
        if (typeof coordinates[0] === 'number') {
            bounds.minX = Math.min(bounds.minX, coordinates[0]);
            bounds.maxX = Math.max(bounds.maxX, coordinates[0]);
            bounds.minY = Math.min(bounds.minY, coordinates[1]);
            bounds.maxY = Math.max(bounds.maxY, coordinates[1]);
            return;
        }
        coordinates.forEach(visit);
    };
    features.forEach(feature => visit(feature.geometry.coordinates));
    return bounds;
}

function createMapProjection(bounds, width, height, padding) {
    const scale = Math.min((width - padding * 2) / (bounds.maxX - bounds.minX), (height - padding * 2) / (bounds.maxY - bounds.minY));
    const usedWidth = (bounds.maxX - bounds.minX) * scale;
    const usedHeight = (bounds.maxY - bounds.minY) * scale;
    const offsetX = (width - usedWidth) / 2;
    const offsetY = (height - usedHeight) / 2;
    return (longitude, latitude) => ({
        x: offsetX + (longitude - bounds.minX) * scale,
        y: height - offsetY - (latitude - bounds.minY) * scale
    });
}

function geometryToPath(geometry, project) {
    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
    return polygons.map(polygon => polygon.map(ring => ring.map((point, index) => {
        const projected = project(point[0], point[1]);
        return `${index === 0 ? 'M' : 'L'}${projected.x.toFixed(1)},${projected.y.toFixed(1)}`;
    }).join(' ') + ' Z').join(' ')).join(' ');
}

function bindAdministrativeMapEvents(container) {
    const viewport = container.querySelector('#administrative-map-viewport');
    const svg = container.querySelector('.administrative-map-svg');
    const refresh = () => viewport.setAttribute('transform', `translate(${MAP_STATE.x} ${MAP_STATE.y}) scale(${MAP_STATE.scale})`);
    const zoom = direction => {
        MAP_STATE.scale = Math.min(4, Math.max(1, MAP_STATE.scale + direction * 0.25));
        refresh();
    };

    container.querySelectorAll('[data-map-action]').forEach(button => button.addEventListener('click', () => {
        const action = button.dataset.mapAction;
        if (action === 'reset') {
            MAP_STATE = { ...MAP_STATE, scale: 1, x: 0, y: 0, moved: false };
            refresh();
        } else {
            zoom(action === 'zoom-in' ? 1 : -1);
        }
    }));
    svg.addEventListener('wheel', event => { event.preventDefault(); zoom(event.deltaY < 0 ? 1 : -1); }, { passive: false });
    svg.addEventListener('pointerdown', event => {
        MAP_STATE.dragging = true; MAP_STATE.moved = false; MAP_STATE.lastX = event.clientX; MAP_STATE.lastY = event.clientY; svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener('pointermove', event => {
        if (!MAP_STATE.dragging) return;
        const deltaX = event.clientX - MAP_STATE.lastX;
        const deltaY = event.clientY - MAP_STATE.lastY;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 2) MAP_STATE.moved = true;
        MAP_STATE.x += deltaX; MAP_STATE.y += deltaY;
        MAP_STATE.lastX = event.clientX; MAP_STATE.lastY = event.clientY; refresh();
    });
    svg.addEventListener('pointerup', () => { MAP_STATE.dragging = false; });
    container.querySelectorAll('.admin-region').forEach(region => region.addEventListener('click', event => {
        if (MAP_STATE.moved) return;
        showRegionFocus(region.dataset.name);
    }));
    container.querySelectorAll('.admin-city-marker').forEach(marker => {
        const focus = () => focusCityFromMap(marker.dataset.city);
        marker.addEventListener('click', event => { event.stopPropagation(); focus(); });
        marker.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') focus(); });
    });
}

function showRegionFocus(regionName) {
    const label = document.getElementById('map-focus-label');
    const title = document.getElementById('current-city-name');
    const summary = document.getElementById('current-city-summary');
    const action = document.getElementById('map-focus-action');
    if (!label || !title || !summary || !action) return;
    label.innerText = '行政区浏览'; title.innerText = regionName;
    summary.innerText = '该行政区位于哈萨克斯坦现行一级行政区划范围内。可点击城市气泡查看阿拉木图、阿斯塔纳、霍尔果斯、奇姆肯特和阿克套的基本介绍。';
    action.hidden = true;
}

function focusCityFromMap(cityKey) {
    switchCity(cityKey);
    scrollToSection('city-section');
}

function renderDecisionWorkspace() {
    if (!PORTFOLIO || !SCORECARD) return;

    const summary = document.getElementById('decision-summary');
    const grid = document.getElementById('comparison-grid');
    const sourcePanel = document.getElementById('source-panel');
    if (!summary || !grid || !sourcePanel) return;

    summary.innerHTML = `
        <div class="decision-summary-main">
            <span class="eyebrow">筛选模型 ${SCORECARD.version}</span>
            <h3>先比较地点，再做项目级尽调</h3>
            <p>${SCORECARD.disclosure}</p>
        </div>
        <div class="decision-summary-legend">
            <span><i class="fa-solid fa-chart-line"></i> 机会：市场、行业匹配、物流、政策与人才</span>
            <span><i class="fa-solid fa-triangle-exclamation"></i> 风险：执行风险 + 项目输入调整</span>
        </div>
    `;

    grid.innerHTML = PORTFOLIO.cities.map(city => {
        const bestSector = city.sectors.reduce((best, sector) => sector.fit > best.fit ? sector : best);
        const population = city.population ? `${(city.population.value / 10000).toFixed(1)} 万人` : '项目级口径';
        return `
            <article class="comparison-card ${city.id === currentCityKey ? 'active' : ''}">
                <div class="comparison-card-head">
                    <span class="data-status">${researchStatusLabel(city.researchStatus)}</span>
                    <span class="comparison-type">${city.type}</span>
                </div>
                <h3>${city.name}</h3>
                <p>${city.summary}</p>
                <div class="comparison-metrics">
                    <div><span>人口/口径</span><strong>${population}</strong></div>
                    <div><span>优先方向</span><strong>${bestSector.name}</strong></div>
                </div>
                <div class="score-bars">
                    ${[['市场', city.scorecard.market], ['政策', city.scorecard.policyAccess], ['物流', city.scorecard.logistics], ['人才', city.scorecard.talent]].map(([label, score]) => `<div><span>${label}</span><b style="width:${score}%"></b><em>${score}</em></div>`).join('')}
                </div>
                <button class="btn btn-outline" onclick="switchCity('${city.id}'); scrollToSection('city-section')">查看城市档案</button>
            </article>
        `;
    }).join('');

    const sources = SOURCE_REGISTRY?.sources || [];
    sourcePanel.innerHTML = `<strong>研究证据：</strong> ${sources.slice(-7).map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.publisher} · ${source.referencePeriod}</a>`).join('')}`;
}

function renderProjectPipeline() {
    const container = document.getElementById('project-pipeline');
    if (!container || !PROJECT_PIPELINE || !PORTFOLIO) return;

    container.innerHTML = PROJECT_PIPELINE.items.map(item => {
        const city = getResearchCity(item.cityId);
        return `
            <article class="pipeline-card">
                <div class="pipeline-meta"><span>${city?.name || item.cityId}</span><span>${item.stage}</span></div>
                <h3>${item.title}</h3>
                <p class="pipeline-sector">${item.sector} · ${item.capitalBand}</p>
                <p>${item.thesis}</p>
                <div class="pipeline-evidence"><strong>投决前证据</strong><ul>${item.evidenceNeeded.map(evidence => `<li>${evidence}</li>`).join('')}</ul></div>
                <div class="pipeline-gate"><i class="fa-solid fa-flag-checkered"></i>${item.nextGate}</div>
                <button class="btn btn-outline" onclick="switchCity('${item.cityId}'); scrollToSection('city-section')">查看城市档案</button>
            </article>
        `;
    }).join('');
}

// Radar Chart - National Investment Attraction
function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['政治稳定', '外资开放', '资源优势', '市场规模', '消费能力', '中国连接'],
            datasets: [{
                label: '哈萨克斯坦宏观指标 (满分 5.0)',
                data: [4.0, 4.0, 5.0, 3.0, 4.0, 5.0],
                backgroundColor: 'rgba(56, 189, 248, 0.25)',
                borderColor: '#38bdf8',
                borderWidth: 2,
                pointBackgroundColor: '#fbbf24',
                pointBorderColor: '#fff',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: '#f8fafc',
                        font: { family: 'Inter', size: 12 }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1
                    },
                    min: 0,
                    max: 5
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Bar Chart - City Income & Spending Tiers
function initIncomeChart() {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    incomeChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['基础大众消费', '中产阶级消费', '高端奢华消费'],
            datasets: [{
                label: '人口分布占比 (%)',
                data: [20, 55, 25],
                backgroundColor: [
                    'rgba(96, 165, 250, 0.7)',
                    'rgba(56, 189, 248, 0.9)',
                    'rgba(251, 191, 36, 0.9)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.08)' },
                    ticks: { color: '#94a3b8' },
                    max: 100
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// -------------------------------------------------------------
// 3. City Switching Logic
// -------------------------------------------------------------
function switchCity(cityKey) {
    if (!CITY_DATABASE[cityKey]) return;
    currentCityKey = cityKey;
    const city = CITY_DATABASE[cityKey];
    const research = getResearchCity(cityKey);

    // 1. Update Section Headers & Map overlay
    document.getElementById('current-city-name').innerText = city.name;
    document.getElementById('current-city-summary').innerText = city.summary;
    document.getElementById('archive-city-title').innerText = city.name;
    const mapFocusLabel = document.getElementById('map-focus-label');
    const mapFocusAction = document.getElementById('map-focus-action');
    if (mapFocusLabel) mapFocusLabel.innerText = '当前聚焦节点';
    if (mapFocusAction) mapFocusAction.hidden = false;
    const dataStatus = document.getElementById('city-data-status');
    if (dataStatus) dataStatus.innerText = research ? researchStatusLabel(research.researchStatus) : '城市概览';

    // 2. Active State on SVG map & Tabs
    document.querySelectorAll('.city-node').forEach(node => node.classList.remove('active'));
    const mapNode = document.getElementById(`node-${cityKey}`);
    if (mapNode) mapNode.classList.add('active');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(cityKey));
    });

    // 3. Render City Profile Box
    const profileBox = document.getElementById('city-profile-box');
    profileBox.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:12px;">
            <p style="font-size:13px; color:var(--text-secondary);">${city.summary}</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:6px;">
                <div class="info-box"><div class="info-body"><span class="info-label">常住人口</span><span class="info-val cyan-text">${city.population}</span></div></div>
                <div class="info-box"><div class="info-body"><span class="info-label">经济贡献</span><span class="info-val gold-text">${city.gdpContribution}</span></div></div>
            </div>
            <div style="margin-top:4px;">
                <span class="info-label" style="display:block; margin-bottom:4px;">城市优势标签：</span>
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${city.tags.map(t => `<span class="badge blue">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // 4. Update Income Chart
    if (incomeChartInstance) {
        incomeChartInstance.data.datasets[0].data = city.incomeDist;
        incomeChartInstance.update();
    }

    // 5. Update Real Estate Dashboard Metrics & Districts
    const reMetricsBox = document.getElementById('re-metrics-box');
    reMetricsBox.innerHTML = research ? `
        <div class="research-gap-card">
            <i class="fa-solid fa-circle-info cyan-icon"></i>
            <div><strong>房地产指标正在按可审计口径接入</strong><p>在获得成交、挂牌、租金、空置率、供给管线和可比项目来源前，本平台不展示无法核验的均价或收益率。</p></div>
        </div>
    ` : `
        <div class="re-metric-box"><span class="re-label">新房均价</span><span class="re-val gold">${city.realEstate.newPrice}</span></div>
        <div class="re-metric-box"><span class="re-label">二手房均价</span><span class="re-val cyan">${city.realEstate.oldPrice}</span></div>
        <div class="re-metric-box"><span class="re-label">长租收益率</span><span class="re-val green">${city.realEstate.yield}</span></div>
        <div class="re-metric-box"><span class="re-label">土地升值年化</span><span class="re-val purple">${city.realEstate.growth}</span></div>
    `;

    const distContainer = document.getElementById('districts-container');
    distContainer.innerHTML = city.districts.map(d => `
        <div class="district-card ${d.color}">
            <div class="district-name">${d.name}</div>
            <div class="district-tag">${d.tag}</div>
            <div class="district-features">${d.feat}</div>
        </div>
    `).join('');

    // 6. Update Commercial Malls
    const mallContainer = document.getElementById('mall-container');
    mallContainer.innerHTML = city.malls.map(m => `
        <div class="mall-card">
            <div class="mall-header">
                <span class="mall-title">${m.name}</span>
                <span class="mall-tag">${m.tag}</span>
            </div>
            <div class="mall-detail">${m.desc}</div>
        </div>
    `).join('');

    // 7. Update Industry Tree
    const treeBox = document.getElementById('industry-tree-box');
    treeBox.innerHTML = research ? `
        <div class="tree-root">
            <div class="root-node"><i class="fa-solid fa-compass"></i> ${research.name}：优先研究方向</div>
        </div>
        <div class="tree-branches" style="margin-top:20px;">
            ${research.sectors.map(sector => `
                <div class="branch-item">
                    <div class="branch-title">${sector.name} <span class="badge blue">匹配 ${sector.fit}/100</span></div>
                    <p class="industry-thesis">${sector.thesis}</p>
                </div>
            `).join('')}
        </div>
    ` : `
        <div class="tree-root">
            <div class="root-node"><i class="fa-solid fa-tree"></i> ${city.industryTree.root}</div>
        </div>
        <div class="tree-branches" style="margin-top:20px;">
            ${city.industryTree.branches.map(b => `
                <div class="branch-item">
                    <div class="branch-title">${b.title}</div>
                    <ul class="branch-leaves">
                        ${b.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;

    // 8. Update Risks Dashboard
    const riskGridBox = document.getElementById('risk-grid-box');
    riskGridBox.innerHTML = research ? research.risks.map((risk, index) => `
        <div class="risk-box">
            <div class="risk-title">关键尽调风险 ${index + 1}</div>
            <div class="stars">项目级核验 <span class="risk-badge mid">待验证</span></div>
            <p class="risk-desc">${risk}</p>
        </div>
    `).join('') : city.risks.map(r => `
        <div class="risk-box">
            <div class="risk-title">${r.name}</div>
            <div class="stars">${r.star} <span class="risk-badge ${r.badge}">评估等级</span></div>
            <p class="risk-desc">${r.desc}</p>
        </div>
    `).join('');

    // Refresh investment recommendation
    renderRecommendation();
    renderDecisionWorkspace();
}

// -------------------------------------------------------------
// 4. Smart Investment Opportunity Filter
// -------------------------------------------------------------
function setupFilterEvents() {
    document.querySelectorAll('#capital-options .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#capital-options .filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedCapital = e.target.getAttribute('data-val');
            renderRecommendation();
        });
    });

    document.querySelectorAll('#risk-options .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#risk-options .filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedRisk = e.target.getAttribute('data-val');
            renderRecommendation();
        });
    });

    renderRecommendation();
}

function renderRecommendation() {
    const box = document.getElementById('recommendation-box');
    const capitalLabels = { small: '10万–100万 RMB', medium: '100万–1000万 RMB', large: '1000万 RMB 以上' };
    const riskLabels = { low: '低风险偏好', mid: '中风险偏好', high: '高风险偏好' };
    const capitalTasks = {
        small: ['先选择一个明确产品和首批付费客户，验证注册、用工、开户与获客成本。', '优先收集轻资产服务、贸易或渠道业务的合同、账期和单位经济证据。'],
        medium: ['先锁定目标城市、园区或资产，再取得可比租金/价格、接入报价和客户锚定证据。', '将土地、许可、建设、物流和汇率成本纳入分期投入与退出安排。'],
        large: ['先完成行业准入、国企/政府交易对手、ESG/HSE、融资与退出的独立尽调。', '在任何重资产承诺前，完成三情景现金流、法律意见和条件先例清单。']
    };
    const riskTasks = {
        low: '优先核验法律、税务、现金回流和保守情景下的偿债与退出能力。',
        mid: '除基础合规外，增加客户合同、竞争格局、运营伙伴和汇率压力测试。',
        high: '先确认风险资本边界，并对牌照、供应链、支付链和极端情景设置否决条件。'
    };
    const tasks = [...capitalTasks[selectedCapital], riskTasks[selectedRisk]];

    box.innerHTML = `
        <h4 style="font-size:15px; color:var(--accent-gold); margin-bottom:8px;"><i class="fa-solid fa-lightbulb"></i> ${capitalLabels[selectedCapital]} · ${riskLabels[selectedRisk]}：优先研究任务</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:6px; font-size:13px; color:#fff; margin-bottom:12px;">
            ${tasks.map(task => `<li><i class="fa-solid fa-circle-check cyan-text"></i> ${task}</li>`).join('')}
        </ul>
        <p style="font-size:12px; color:var(--text-secondary); background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:6px;">
            <strong><i class="fa-solid fa-user-shield"></i> 使用边界：</strong> 未确定行业、客户、地点和项目结构前，本筛选器不产生投资推荐或收益判断。
        </p>
    `;
}

// -------------------------------------------------------------
// 5. Interactive Project Evaluator Algorithm
// -------------------------------------------------------------
function calculateProjectScore() {
    const type = document.getElementById('eval-type').value;
    const amount = parseFloat(document.getElementById('eval-amount').value) || 100;
    const city = document.getElementById('eval-city').value;
    const roi = parseFloat(document.getElementById('eval-roi').value) || 10;
    const mode = document.getElementById('eval-mode').value;

    let opportunityScore = 60;
    let riskScore = 40;
    let tips = [];

    // ROI Evaluation
    if (roi > 30) {
        opportunityScore += 25;
        riskScore += 25;
        tips.push("<strong>高回报警示：</strong> 预期年化 ROI > 30% 远超中亚平均水平，需谨防旁氏或高风险投机陷阱。");
    } else if (roi >= 12 && roi <= 25) {
        opportunityScore += 20;
        riskScore += 5;
        tips.push("<strong>健康回报率：</strong> 预估 ROI 在 12%-25% 处于中亚投资健康黄金区间。");
    } else {
        opportunityScore += 5;
        tips.push("<strong>收益偏低：</strong> ROI 低于 12% 扣除坚戈汇率波动后实际净收益较为有限。");
    }

    // Capital Amount Evaluation
    if (amount < 100) {
        tips.push("<strong>小资金灵活性：</strong> 试错成本低，建议采取轻资产模式试水。");
    } else if (amount >= 1000) {
        riskScore += 15;
        opportunityScore += 15;
        tips.push("<strong>重资金风险控制：</strong> 建议分期投入，首期资金不过 30%，并在 AIFC 金融特区设立控股架构。");
    }

    // Mode Evaluation
    if (mode === 'solo') {
        riskScore += 10;
        tips.push("<strong>独资经营提示：</strong> 100% 外资掌控力强，但需自建政商关系与劳务合规团队。");
    } else if (mode === 'jv_local') {
        opportunityScore += 10;
        tips.push("<strong>合资 (JV) 提醒：</strong> 本地资源丰富，但务必在公司章程中明确一票否决权与股权退出机制。");
    } else {
        tips.push("<strong>代理加盟：</strong> 风险较低，关注品牌在当地的商标注册合法性。");
    }

    // Cap Scores
    opportunityScore = Math.min(Math.max(opportunityScore, 30), 98);
    riskScore = Math.min(Math.max(riskScore, 15), 95);

    let rankText = "推荐实施";
    let rankColor = "cyan-text";
    if (riskScore > 65) {
        rankText = "高风险·谨慎投资";
        rankColor = "red-text";
    } else if (opportunityScore > 80 && riskScore < 45) {
        rankText = "极力推荐·黄金项目";
        rankColor = "green-text";
    }

    // Render UI
    document.getElementById('score-opportunity').innerText = opportunityScore;
    document.getElementById('score-risk').innerText = riskScore;
    const recElem = document.getElementById('score-recommendation');
    recElem.innerText = rankText;
    recElem.className = `dial-val ${rankColor}`;

    const detailsElem = document.getElementById('eval-details');
    detailsElem.innerHTML = `
        <h4><i class="fa-solid fa-list-check"></i> 智能尽调建议与避坑提醒</h4>
        <ul class="checklist">
            ${tips.map(t => `<li>${t}</li>`).join('')}
            <li><strong>外汇出入境：</strong> 需在开户行报备投资项目备案，避免后期利润汇回时受控。</li>
            <li><strong>劳动配额：</strong> 哈国对外籍员工配额管理严格，需合理配置中哈员工比例 (通常 1:9)。</li>
        </ul>
    `;
}

function calculateProjectScoreV2() {
    const type = document.getElementById('eval-type').value;
    const amount = parseFloat(document.getElementById('eval-amount').value) || 100;
    const cityId = document.getElementById('eval-city').value;
    const roi = parseFloat(document.getElementById('eval-roi').value) || 10;
    const mode = document.getElementById('eval-mode').value;
    const city = getResearchCity(cityId);
    const sectorId = { trade: 'logistics', mining: 'industrial' }[type] || type;
    const sector = city?.sectors.find(item => item.id === sectorId);

    if (!city || !sector || !SCORECARD) {
        alert('研究数据尚未完成加载，请刷新页面后重试。');
        return;
    }

    const weights = SCORECARD.opportunityWeights;
    const scorecard = city.scorecard;
    let opportunityScore = Math.round(
        scorecard.market * weights.market +
        sector.fit * weights.sectorFit +
        scorecard.logistics * weights.logistics +
        scorecard.policyAccess * weights.policyAccess +
        scorecard.talent * weights.talent
    );
    let riskScore = scorecard.executionRisk;
    const tips = [
        `<strong>地点与行业匹配：</strong>${city.name}的“${sector.name}”匹配度为 ${sector.fit}/100。${sector.thesis}`,
        `<strong>基础风险：</strong>地点执行风险基线为 ${scorecard.executionRisk}/100；需以项目合同、准入与现金流资料验证。`
    ];

    if (roi > 30) {
        riskScore += SCORECARD.riskAdjustments.roiAbove30;
        tips.push('<strong>高回报压力测试：</strong>目标 ROI 超过 30%，需将收入、价格、利用率和退出假设逐项下调测试。');
    } else if (roi > 20) {
        riskScore += SCORECARD.riskAdjustments.roiAbove20;
        tips.push('<strong>回报假设：</strong>目标 ROI 超过 20%，请提供可比交易、合同或订单支持。');
    }
    if (amount >= 1000) {
        riskScore += SCORECARD.riskAdjustments.capitalAbove1000;
        tips.push('<strong>大额资本：</strong>建议设置分期投入、先决条件、资金监管和退出条款。');
    }
    if (mode === 'solo') {
        riskScore += SCORECARD.riskAdjustments.soloOwnership;
        tips.push('<strong>独资执行：</strong>需自建本地合规、招聘、供应链和政府事务能力。');
    } else if (mode === 'jv_local') {
        riskScore += SCORECARD.riskAdjustments.localJointVenture;
        tips.push('<strong>合资治理：</strong>股东协议应覆盖控制权、保留事项、关联交易、违约和退出机制。');
    } else {
        tips.push('<strong>代理/加盟：</strong>核验商标权、区域排他性、最低采购义务和终止安排。');
    }

    opportunityScore = Math.min(Math.max(opportunityScore, 0), 100);
    riskScore = Math.min(Math.max(Math.round(riskScore), 0), 100);
    let rankText = '进入项目级尽调';
    let rankColor = 'cyan-text';
    if (riskScore >= 70) {
        rankText = '高风险·先补证据';
        rankColor = 'red-text';
    } else if (opportunityScore >= 80 && riskScore <= 45) {
        rankText = '优先研究';
        rankColor = 'green-text';
    }

    document.getElementById('score-opportunity').innerText = opportunityScore;
    document.getElementById('score-risk').innerText = riskScore;
    const recElem = document.getElementById('score-recommendation');
    recElem.innerText = rankText;
    recElem.className = `dial-val ${rankColor}`;
    document.getElementById('eval-details').innerHTML = `
        <h4><i class="fa-solid fa-list-check"></i> 可解释初筛结论</h4>
        <ul class="checklist">
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
            <li><strong>模型边界：</strong>${SCORECARD.disclosure}</li>
        </ul>
    `;
}

function exportDueDiligenceReport() {
    window.print();
}

// Global Scroll Helper
function scrollToSection(id) {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
}
