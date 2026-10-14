// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。
// 本站覆盖九个领域：AI/科技、酒店、餐饮、电商、人力资源、市场营销、企业财税、法律合规、咨询。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "ai-tech", label: "AI/科技", feedLabel: "AI/科技", section: "AI/科技", guide: "AI 与科技领域：基础模型发布与能力升级（OpenAI/GPT、Gemini、Claude、Llama、文心/通义/混元/DeepSeek），AI 应用与 Agent 的重大产品迭代，算力与芯片（英伟达/AMD/国产 GPU、云厂商算力定价、推理成本下降），以及 AI 公司的融资并购、人事组织调整、模型评测榜单与 AI 监管政策。纯论文、教程或泛科技产品不因技术含量自动归这一类。" },
  { key: "hotel", label: "酒店", feedLabel: "酒店行业", section: "酒店行业", guide: "酒店行业：头部集团（华住/锦江/首旅如家/万豪/洲际等）的 RevPAR、ADR、Occ 等运营数据与区域/商旅休闲对比，AI 在酒店的落地（动态定价与收益管理、AI 客服、人脸识别入住），OTA 与本地生活渠道、会员体系与营销，以及下沉加盟、中高端品牌线、存量翻牌等扩张模式。" },
  { key: "restaurant", label: "餐饮", feedLabel: "餐饮行业", section: "餐饮行业", guide: "餐饮行业：连锁品牌部署 AI 经营系统/Agent（智能巡检、经营归因、营销方案生成），平台级 AI 工具（差评处理、客流分析、备货预估），茶饮咖啡与正餐的 AI 供应链调度、食安视觉巡检与会员分层，烹饪机器人等新业态，以及同店销售（SSSG）、翻台率、客单价、开店关店数等核心经营指标。" },
  { key: "ecommerce", label: "电商", feedLabel: "电商行业", section: "电商行业", guide: "电商行业：淘天/京东/拼多多/抖音等平台的规则与收费调整（仅退款/运费险/低价战略、商家扶持），AI 导购、数字人直播与 AIGC 批量素材的落地效果，美团闪购/京东到家等即时零售与 Temu/SHEIN/TikTok Shop 出海，以及大促周期、头部主播动向与平台流量算法偏移。" },
  { key: "hr", label: "人力资源", feedLabel: "人力资源", section: "人力资源", guide: "人力资源管理：互联网/制造业头部企业的组织变动（裁员/扩招/薪酬/期权回购），AI+HR 技术（简历筛选、AI 面试、离职预测、HR SaaS 大版本），灵活用工与外卖骑手/网约车司机的社保合规新规，以及企业出海的当地劳动法挑战与薪酬属地化。" },
  { key: "marketing", label: "市场营销", feedLabel: "市场营销", section: "市场营销", guide: "市场营销：品牌媒介预算向抖音/小红书/视频号的迁移与搜索电商冲击，AIGC 营销全流程案例与数字人投流效果，消费趋势报告与国潮/情绪价值/银发/宠物经济等细分赛道，以及出圈 Campaign、联名代言与危机公关的复盘。" },
  { key: "finance", label: "企业财税", feedLabel: "企业财税", section: "企业财税", guide: "企业财税管理：数电票（全面数字化电子发票）的推行进度与对财务流程的影响，企业所得税/增值税等税收优惠政策（研发加计扣除、小微企业减免），跨境电商欧洲 VAT/美国销售税/支柱二全球最低税，以及业财税一体化 SaaS 与费控报销趋势。" },
  { key: "legal", label: "法律合规", feedLabel: "法律合规", section: "法律合规", guide: "法律法规与合规政策：反垄断与竞争执法（二选一、低价倾销、并购审查），数据安全法/个人信息保护法的行业细则与数据出境评估，竞业限制/商业秘密/商标专利案例，以及网信办（算法备案）、市监局、商务部等监管部门的涉企政策与联合执法。" },
  { key: "consulting", label: "咨询", feedLabel: "咨询行业", section: "咨询行业", guide: "咨询行业：MBB（麦肯锡/BCG/贝恩）、四大咨询、罗兰贝格、埃森哲等机构的重磅白皮书与全球趋势报告核心观点，咨询公司自研 AI 工具与替代初级顾问的降本实践，大中华区合伙人晋升/团队动态与新业务线，以及客户需求侧（投融资、民企传承、国企改革）的信号。" },
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布。本站覆盖九个领域，没有统一的一类发布，设成 null，日报报头不显示发布数。
 * 如果之后想让报头按 AI 模型数显示，改成 { category: "ai-tech", tag: "模型发布", unit: "个新模型" }。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = null;

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "api", "llm", "gpu", "agi", "ceo", "ipo", "saas", "revpar", "adr", "occ", "gmv", "sssg", "vat", "ota", "poi", "esg", "mbb", "aigc", "crm", "erp", "hr", "kpi", "dtc", "sku", "dd"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["release", "data_report", "industry_report", "business_move", "policy_regulation", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一（最后一项“其他”是兜底）。 */
export const CATEGORY_TAGS = [
  "产品/服务发布", "财报/运营数据", "行业报告/趋势", "公司动态", "政策/监管", "观点/访谈", "教程/方法", "其他",
] as const;

/** 可选的主题标签，按领域分组（structure.md 提示词里按组列出，帮助模型区分同名词）。 */
export const TOPIC_TAGS = [
  // AI/科技
  "模型发布", "AI Agent", "算力/芯片", "多模态", "AI 应用", "开源生态", "AI 安全",
  // 酒店
  "酒店运营", "收益管理", "OTA/渠道", "酒店AI", "会员/加盟",
  // 餐饮
  "餐饮AI", "茶饮/咖啡", "连锁/加盟", "外卖/团购", "供应链/食安",
  // 电商
  "平台规则", "直播电商", "即时零售", "跨境电商", "AI电商",
  // 人力资源
  "组织/人事", "薪酬/期权", "灵活用工", "出海用工", "HR技术",
  // 市场营销
  "媒介/投放", "AIGC营销", "品牌/公关", "消费趋势", "私域/会员",
  // 企业财税
  "数电票/税务", "税收优惠", "跨境税务", "财务数字化",
  // 法律合规
  "反垄断", "数据合规", "劳动/知产", "行业监管",
  // 咨询
  "MBB/四大", "咨询AI", "咨询团队", "客户/市场",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["OpenAI", "Anthropic", "Google", "Meta", "DeepSeek", "千问 Qwen", "百度文心", "腾讯混元", "NVIDIA", "AMD", "World Labs", "华住集团", "锦江酒店", "首旅如家", "万豪国际", "洲际酒店集团", "瑞幸咖啡", "库迪咖啡", "蜜雪冰城", "海底捞", "美团", "淘天集团", "京东", "拼多多", "抖音", "字节跳动", "SHEIN", "北森", "用友", "腾讯", "比亚迪", "飞书", "小红书", "阿里妈妈", "金蝶", "分贝通", "市场监管总局", "国家网信办", "麦肯锡", "BCG", "贝恩", "罗兰贝格", "埃森哲", "德勤"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  // 内容形态
  发布: "产品/服务发布", 上新: "产品/服务发布", 更新: "产品/服务发布", 产品: "产品/服务发布", 产品发布: "产品/服务发布", 新品: "产品/服务发布",
  财报: "财报/运营数据", 数据: "财报/运营数据", 业绩: "财报/运营数据", 经营数据: "财报/运营数据", 财报数据: "财报/运营数据", 运营数据: "财报/运营数据", 同店: "财报/运营数据", 营收: "财报/运营数据",
  报告: "行业报告/趋势", 白皮书: "行业报告/趋势", 趋势: "行业报告/趋势", 研究报告: "行业报告/趋势", 榜单: "行业报告/趋势", 排名: "行业报告/趋势",
  公司动态: "公司动态", 动态: "公司动态", 融资: "公司动态", 收购: "公司动态", 并购: "公司动态", 投资: "公司动态", 人事: "公司动态", 组织: "公司动态", 合作: "公司动态", 开店: "公司动态", 关店: "公司动态", 裁员: "公司动态",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 合规: "政策/监管", 处罚: "政策/监管", 执法: "政策/监管", 税务: "政策/监管", 税: "政策/监管",
  观点: "观点/访谈", 访谈: "观点/访谈", 大佬观点: "观点/访谈", 评论: "观点/访谈", 复盘: "观点/访谈", 判断: "观点/访谈",
  教程: "教程/方法", 方法: "教程/方法", 攻略: "教程/方法", 技巧: "教程/方法", 实践: "教程/方法", 案例: "教程/方法", 解读: "教程/方法", 评测: "教程/方法",
  // 领域方向
  模型: "模型发布", 大模型: "模型发布", agent: "AI Agent", 智能体: "AI Agent",
  芯片: "算力/芯片", 算力: "算力/芯片", gpu: "算力/芯片",
  多模态: "多模态", 视觉: "多模态", 语音: "多模态",
  ai应用: "AI 应用", 应用: "AI 应用",
  开源: "开源生态", "open-source": "开源生态",
  安全: "AI 安全", 对齐: "AI 安全",
  酒店: "酒店运营", 民宿: "酒店运营",
  收益: "收益管理", revpar: "收益管理",
  ota: "OTA/渠道", 渠道: "OTA/渠道", 携程: "OTA/渠道", 飞猪: "OTA/渠道",
  酒店ai: "酒店AI", ai酒店: "酒店AI",
  会员: "会员/加盟", 加盟: "会员/加盟",
  餐饮ai: "餐饮AI", ai餐饮: "餐饮AI",
  茶饮: "茶饮/咖啡", 咖啡: "茶饮/咖啡", 奶茶: "茶饮/咖啡",
  连锁: "连锁/加盟", 加盟店: "连锁/加盟",
  外卖: "外卖/团购", 团购: "外卖/团购", 饿了么: "外卖/团购",
  供应链: "供应链/食安", 食安: "供应链/食安",
  平台: "平台规则", 规则: "平台规则", 仅退款: "平台规则", 运费险: "平台规则",
  直播: "直播电商", 主播: "直播电商", 数字人直播: "直播电商",
  即时零售: "即时零售", 闪购: "即时零售", 小时达: "即时零售",
  出海: "跨境电商", 跨境: "跨境电商", temu: "跨境电商", shein: "跨境电商", tiktokshop: "跨境电商",
  aiecommerce: "AI电商", 电商ai: "AI电商",
  人事变动: "组织/人事", 组织变动: "组织/人事", 高管: "组织/人事",
  薪酬: "薪酬/期权", 期权: "薪酬/期权", 涨薪: "薪酬/期权", 降薪: "薪酬/期权",
  灵活用工: "灵活用工", 骑手: "灵活用工", 网约车: "灵活用工", 社保: "灵活用工",
  出海用工: "出海用工", 海外用工: "出海用工",
  hrsaas: "HR技术", hr: "HR技术", 招聘: "HR技术", 面试: "HR技术", 北森: "HR技术", 用友: "HR技术",
  投放: "媒介/投放", 广告: "媒介/投放", 媒介: "媒介/投放", 预算: "媒介/投放", 营销预算: "媒介/投放",
  aigc: "AIGC营销", 内容营销: "AIGC营销",
  品牌: "品牌/公关", 公关: "品牌/公关", 联名: "品牌/公关", 代言: "品牌/公关", 危机公关: "品牌/公关",
  消费: "消费趋势", 消费者: "消费趋势", 国潮: "消费趋势", 银发经济: "消费趋势", 宠物经济: "消费趋势", 情绪价值: "消费趋势",
  私域: "私域/会员", 会员运营: "私域/会员",
  数电票: "数电票/税务", 电子发票: "数电票/税务", 发票: "数电票/税务", 金税: "数电票/税务",
  税收: "税收优惠", 减税: "税收优惠", 加计扣除: "税收优惠", 优惠政策: "税收优惠",
  vat: "跨境税务", 销售税: "跨境税务", 支柱二: "跨境税务", 全球最低税: "跨境税务",
  财务数字化: "财务数字化", 费控: "财务数字化", 报销: "财务数字化", 业财税: "财务数字化",
  反垄断: "反垄断", 二选一: "反垄断", 垄断: "反垄断", 低价倾销: "反垄断", 并购审查: "反垄断",
  数据合规: "数据合规", 数据出境: "数据合规", 个保法: "数据合规", 数安法: "数据合规", 个人信息保护法: "数据合规",
  竞业: "劳动/知产", 商业秘密: "劳动/知产", 商标: "劳动/知产", 专利: "劳动/知产", 著作权: "劳动/知产", 劳动法: "劳动/知产",
  行业监管: "行业监管", 算法备案: "行业监管", 广告法: "行业监管", 网信办: "行业监管", 市监局: "行业监管", 商务部: "行业监管",
  mbb: "MBB/四大", 麦肯锡: "MBB/四大", bcg: "MBB/四大", 贝恩: "MBB/四大", 四大: "MBB/四大", 埃森哲: "MBB/四大", 罗兰贝格: "MBB/四大",
  咨询ai: "咨询AI", ai咨询: "咨询AI",
  合伙人: "咨询团队", 晋升: "咨询团队", 咨询团队: "咨询团队",
  客户: "客户/市场", 需求: "客户/市场", 招标: "客户/市场", 国企改革: "客户/市场", 民企传承: "客户/市场", 尽调: "客户/市场",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；otherNames 是公司自己的其他称呼（官方账号名、子品牌），
 * 把事实的主体对到发布方时也认它们。别名在实体之间要唯一，否则主体对不到任何实体。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  // AI/科技
  openai: { name: "OpenAI", displayTag: "OpenAI", aliases: ["OpenAI", "ChatGPT", "GPT", "Sora", "Codex"], otherNames: ["OpenAI Developers", "OpenAI Newsroom"] },
  anthropic: { name: "Anthropic", displayTag: "Anthropic", aliases: ["Anthropic", "Claude"], otherNames: ["Claude Code"] },
  google: { name: "Google", displayTag: "Google", aliases: ["Google", "Gemini", "DeepMind", "谷歌"], otherNames: ["Google DeepMind", "Google Research", "Google AI", "Google Cloud"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Llama"], otherNames: ["Meta AI", "AI at Meta"] },
  deepseek: { name: "DeepSeek", displayTag: "DeepSeek", aliases: ["DeepSeek", "深度求索"] },
  qwen: { name: "千问 Qwen", displayTag: null, aliases: ["Qwen", "通义", "千问"], otherNames: ["通义千问", "通义实验室", "阿里云", "Alibaba Cloud", "Qwen Team"] },
  ernie: { name: "百度文心", displayTag: null, aliases: ["文心", "百度", "Baidu", "ERNIE"], otherNames: ["文心一言", "百度智能云"] },
  hunyuan: { name: "腾讯混元", displayTag: null, aliases: ["混元", "Hunyuan"] },
  nvidia: { name: "NVIDIA", displayTag: "NVIDIA", aliases: ["NVIDIA", "英伟达"] },
  amd: { name: "AMD", displayTag: "AMD", aliases: ["AMD", "Advanced Micro Devices"] },
  "world-labs": { name: "World Labs", displayTag: null, aliases: ["World Labs", "WorldLabs"] },
  // 酒店
  huazhu: { name: "华住集团", displayTag: "华住", aliases: ["华住", "Huazhu"], otherNames: ["华住会", "汉庭", "全季", "桔子酒店", "美居"] },
  jinjiang: { name: "锦江酒店", displayTag: "锦江", aliases: ["锦江", "锦江酒店", "Jinjiang"], otherNames: ["维也纳酒店", "七天连锁", "丽笙"] },
  btg: { name: "首旅如家", displayTag: null, aliases: ["首旅如家", "首旅", "BTG"], otherNames: ["如家酒店", "如家", "建国饭店"] },
  marriott: { name: "万豪国际", displayTag: null, aliases: ["万豪", "Marriott"], otherNames: ["万豪旅享家", "喜来登", "万丽", "万怡", "W 酒店"] },
  ihg: { name: "洲际酒店集团", displayTag: null, aliases: ["洲际", "IHG", "洲际酒店"], otherNames: ["假日酒店", "皇冠假日", "智选假日"] },
  // 餐饮
  luckin: { name: "瑞幸咖啡", displayTag: "瑞幸", aliases: ["瑞幸", "Luckin"], otherNames: ["瑞幸咖啡"] },
  cotti: { name: "库迪咖啡", displayTag: null, aliases: ["库迪", "Cotti", "COTTI"], otherNames: ["库迪咖啡"] },
  mixue: { name: "蜜雪冰城", displayTag: "蜜雪", aliases: ["蜜雪冰城", "蜜雪", "Mixue"], otherNames: ["幸运咖"] },
  haidilao: { name: "海底捞", displayTag: "海底捞", aliases: ["海底捞", "Haidilao"], otherNames: ["海底捞火锅"] },
  meituan: { name: "美团", displayTag: "美团", aliases: ["美团", "Meituan"], otherNames: ["美团外卖", "美团闪购", "大众点评", "美团到店"] },
  // 电商
  taobao: { name: "淘天集团", displayTag: null, aliases: ["淘天", "淘宝", "天猫", "Taobao", "Tmall"], otherNames: ["阿里巴巴", "Alibaba", "淘宝直播", "天猫超市", "淘宝买菜"] },
  jd: { name: "京东", displayTag: "京东", aliases: ["京东", "JD"], otherNames: ["京东到家", "京东物流", "京东健康", "京东七鲜"] },
  pdd: { name: "拼多多", displayTag: "拼多多", aliases: ["拼多多", "拼多", "PDD", "Pinduoduo"], otherNames: ["Temu", "多多买菜"] },
  douyin: { name: "抖音", displayTag: "抖音", aliases: ["抖音", "抖音电商", "Douyin"], otherNames: ["抖音商城", "巨量引擎", "TikTok Shop", "抖音本地生活"] },
  bytedance: { name: "字节跳动", displayTag: null, aliases: ["字节跳动", "字节", "ByteDance"], otherNames: ["抖音集团"] },
  shein: { name: "SHEIN", displayTag: "SHEIN", aliases: ["SHEIN", "希音"] },
  // 人力资源
  beisen: { name: "北森", displayTag: null, aliases: ["北森", "Beisen"] },
  yonyou: { name: "用友", displayTag: null, aliases: ["用友", "Yonyou", "用友网络"], otherNames: ["用友大易", "用友薪福社"] },
  tencent: { name: "腾讯", displayTag: "腾讯", aliases: ["腾讯", "Tencent"], otherNames: ["腾讯会议", "企业微信", "微信", "WeChat", "腾讯广告"] },
  byd: { name: "比亚迪", displayTag: null, aliases: ["比亚迪", "BYD"] },
  lark: { name: "飞书", displayTag: null, aliases: ["飞书", "Lark", "飞书People"], otherNames: ["飞书人事", "飞书招聘"] },
  // 市场营销
  xiaohongshu: { name: "小红书", displayTag: "小红书", aliases: ["小红书", "Xiaohongshu", "REDnote"], otherNames: ["RED"] },
  alimama: { name: "阿里妈妈", displayTag: null, aliases: ["阿里妈妈", "Alimama"] },
  // 企业财税
  kingdee: { name: "金蝶", displayTag: null, aliases: ["金蝶", "Kingdee"], otherNames: ["金蝶云", "金蝶精斗云"] },
  fenda: { name: "分贝通", displayTag: null, aliases: ["分贝通"] },
  // 法律合规
  samr: { name: "市场监管总局", displayTag: null, aliases: ["市场监管总局", "市监局", "国家市场监督管理总局", "SAMR"] },
  cac: { name: "国家网信办", displayTag: null, aliases: ["网信办", "国家网信办", "中央网信办", "国家互联网信息办公室", "CAC"] },
  // 咨询
  mckinsey: { name: "麦肯锡", displayTag: "麦肯锡", aliases: ["麦肯锡", "McKinsey"], otherNames: ["McKinsey & Company"] },
  bcg: { name: "BCG", displayTag: "BCG", aliases: ["BCG", "波士顿咨询"], otherNames: ["Boston Consulting Group"] },
  bain: { name: "贝恩", displayTag: "贝恩", aliases: ["贝恩", "Bain"], otherNames: ["Bain & Company"] },
  rolandberger: { name: "罗兰贝格", displayTag: null, aliases: ["罗兰贝格", "Roland Berger"] },
  accenture: { name: "埃森哲", displayTag: null, aliases: ["埃森哲", "Accenture"] },
  deloitte: { name: "德勤", displayTag: null, aliases: ["德勤", "Deloitte"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "openai", name: "OpenAI", patterns: [/openai|chatgpt|\bgpt-?[o\d]|\bsora\b|\bcodex\b/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|\bclaude\b/i] },
  { id: "google", name: "Google / Gemini", patterns: [/google|deepmind|\bgemini\b/i] },
  { id: "meta", name: "Meta / Llama", patterns: [/\bmeta\b/i, /\bllama\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|深度求索/i] },
  { id: "qwen", name: "千问 Qwen", patterns: [/\bqwen\b|通义|千问/i] },
  { id: "ernie", name: "百度文心", patterns: [/百度|baidu|文心|\bernies?/i] },
  { id: "hunyuan", name: "腾讯混元", patterns: [/混元|hunyuan/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|英伟达/i] },
  { id: "amd", name: "AMD", patterns: [/\bamd\b|advanced micro devices/i] },
  { id: "huazhu", name: "华住集团", patterns: [/华住|huazhu|汉庭|全季/i] },
  { id: "jinjiang", name: "锦江酒店", patterns: [/锦江|jinjiang|维也纳酒店/i] },
  { id: "btg", name: "首旅如家", patterns: [/首旅|如家|btg/i] },
  { id: "marriott", name: "万豪国际", patterns: [/万豪|marriott/i] },
  { id: "ihg", name: "洲际酒店集团", patterns: [/洲际|\bihg\b|假日酒店/i] },
  { id: "luckin", name: "瑞幸咖啡", patterns: [/瑞幸|luckin/i] },
  { id: "cotti", name: "库迪咖啡", patterns: [/库迪|cotti/i] },
  { id: "mixue", name: "蜜雪冰城", patterns: [/蜜雪|mixue/i] },
  { id: "haidilao", name: "海底捞", patterns: [/海底捞|haidilao/i] },
  { id: "meituan", name: "美团", patterns: [/美团|meituan|大众点评/i] },
  { id: "taobao", name: "淘天集团", patterns: [/淘天|淘宝|天猫|taobao|tmall/i] },
  { id: "jd", name: "京东", patterns: [/京东|\bjd\.com\b|jd 物流|\bjingdong/i] },
  { id: "pdd", name: "拼多多", patterns: [/拼多多|pinduoduo|\bPDD\b|temu/i] },
  { id: "douyin", name: "抖音", patterns: [/抖音|douyin|\btiktok\b/i] },
  { id: "bytedance", name: "字节跳动", patterns: [/字节跳动|字节|bytedance/i] },
  { id: "shein", name: "SHEIN", patterns: [/shein|希音/i] },
  { id: "beisen", name: "北森", patterns: [/北森|beisen/i] },
  { id: "yonyou", name: "用友", patterns: [/用友|yonyou/i] },
  { id: "tencent", name: "腾讯", patterns: [/腾讯|tencent|企业微信|\bwechat\b/i] },
  { id: "byd", name: "比亚迪", patterns: [/比亚迪|\bbyd\b/i] },
  { id: "lark", name: "飞书", patterns: [/飞书|\blark\b/i] },
  { id: "xiaohongshu", name: "小红书", patterns: [/小红书|xiaohongshu|rednote/i] },
  { id: "alimama", name: "阿里妈妈", patterns: [/阿里妈妈|alimama/i] },
  { id: "kingdee", name: "金蝶", patterns: [/金蝶|kingdee/i] },
  { id: "fenda", name: "分贝通", patterns: [/分贝通/i] },
  { id: "samr", name: "市场监管总局", patterns: [/市场监管总局|市监局|samr/i] },
  { id: "cac", name: "国家网信办", patterns: [/网信办|国家互联网信息办公室|cac/i] },
  { id: "mckinsey", name: "麦肯锡", patterns: [/麦肯锡|mckinsey/i] },
  { id: "bcg", name: "BCG", patterns: [/\bbcg\b|波士顿咨询/i] },
  { id: "bain", name: "贝恩", patterns: [/贝恩|\bbain\b/i] },
  { id: "rolandberger", name: "罗兰贝格", patterns: [/罗兰贝格|roland berger/i] },
  { id: "accenture", name: "埃森哲", patterns: [/埃森哲|accenture/i] },
  { id: "deloitte", name: "德勤", patterns: [/德勤|deloitte/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "google", domains: ["deepmind.google", "ai.google", "blog.google"] },
  { entityId: "meta", domains: ["ai.meta.com"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "qwen", domains: ["qwen.ai"] },
  { entityId: "nvidia", domains: ["nvidia.com"] },
  { entityId: "huazhu", domains: ["huazhu.com"] },
  { entityId: "jinjiang", domains: ["jinjianghotels.com"] },
  { entityId: "marriott", domains: ["marriott.com"] },
  { entityId: "ihg", domains: ["ihg.com"] },
  { entityId: "luckin", domains: ["luckincoffee.com"] },
  { entityId: "mixue", domains: ["mxbc.com"] },
  { entityId: "haidilao", domains: ["haidilao.com"] },
  { entityId: "meituan", domains: ["meituan.com"] },
  { entityId: "taobao", domains: ["tmall.com"] },
  { entityId: "jd", domains: ["jd.com"] },
  { entityId: "pdd", domains: ["pinduoduo.com", "temu.com"] },
  { entityId: "douyin", domains: ["douyin.com"] },
  { entityId: "bytedance", domains: ["bytedance.com"] },
  { entityId: "shein", domains: ["shein.com", "shein.cn"] },
  { entityId: "beisen", domains: ["beisen.com"] },
  { entityId: "yonyou", domains: ["yonyou.com"] },
  { entityId: "tencent", domains: ["tencent.com"] },
  { entityId: "byd", domains: ["byd.com"] },
  { entityId: "lark", domains: ["feishu.cn", "larksuite.com"] },
  { entityId: "xiaohongshu", domains: ["xiaohongshu.com"] },
  { entityId: "alimama", domains: ["alimama.com"] },
  { entityId: "kingdee", domains: ["kingdee.com"] },
  { entityId: "mckinsey", domains: ["mckinsey.com"] },
  { entityId: "bcg", domains: ["bcg.com"] },
  { entityId: "bain", domains: ["bain.com"] },
  { entityId: "rolandberger", domains: ["rolandberger.com"] },
  { entityId: "accenture", domains: ["accenture.com"] },
  { entityId: "deloitte", domains: ["deloitte.com"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [];
